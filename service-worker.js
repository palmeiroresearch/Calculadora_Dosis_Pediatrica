const CACHE_VERSION = 'v2.0.1';
const CACHE_NAME = `dosis-pediatricas-${CACHE_VERSION}`;

const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Archivos que deben actualizarse siempre desde la red si es posible
const DYNAMIC_ASSETS = [
  './medications.json'
];

// Instalar y cachear assets estáticos
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll([...STATIC_ASSETS, ...DYNAMIC_ASSETS]))
  );
});

// Activar y limpiar cachés viejas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Estrategia de fetch mixta
self.addEventListener('fetch', event => {
  const url = event.request.url;

  // Network-first para HTML y JSON dinámico
  if (event.request.mode === 'navigate' || DYNAMIC_ASSETS.some(asset => url.endsWith(asset))) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache-first para el resto
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
