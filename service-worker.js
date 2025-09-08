// Cambia esta versión en cada despliegue
const CACHE_VERSION = 'v2.0.2';
const CACHE_NAME = `dosis-pediatricas-${CACHE_VERSION}`;

// Archivos estáticos que cambian poco
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Archivos dinámicos que deben actualizarse siempre
const DYNAMIC_ASSETS = [
  `./medications.json?v=${CACHE_VERSION}` // cache busting
];

// Instalar y cachear
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll([...STATIC_ASSETS, ...DYNAMIC_ASSETS]))
  );
});

// Activar, limpiar cachés viejas y recargar clientes
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
     .then(() => {
       // Recargar todas las ventanas controladas
       return self.clients.matchAll({ type: 'window', includeUncontrolled: true })
         .then(clients => {
           clients.forEach(client => client.navigate(client.url));
         });
     })
  );
});

// Estrategia de fetch mixta
self.addEventListener('fetch', event => {
  const url = event.request.url;

  // Network-first agresivo para HTML y JSON dinámico
  if (event.request.mode === 'navigate' || url.endsWith('.json') || url.includes('medications.json')) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
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

