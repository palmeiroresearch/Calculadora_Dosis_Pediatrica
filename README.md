# 💊 Calculadora de Dosis Pediátricas v2.0

Herramienta web avanzada para calcular dosis pediátricas de medicamentos comunes, con calculadora de diluciones IV y cálculo de volúmenes para suspensiones.

## 🚀 Acceso rápido
[**Abrir calculadora**](https://palmeiroresearch.github.io/Calculadora_Dosis_Pediatrica/)

---

## ✨ Características v2.0

### 🎯 Funcionalidades principales
- **Cálculo automático de dosis** basado en peso del paciente
- **Calculadora de diluciones IV** configurable (3ml, 4ml, 5ml, 10ml, etc.)
- **Cálculo de ml/cc** para suspensiones y jarabes
- **División automática de dosis** por intervalo (c/6h, c/8h, c/12h, c/24h)
- **Validaciones por edad** (contraindicaciones y restricciones)
- **Múltiples indicaciones** por medicamento (ej: Ciprofloxacina para EDA vs ITU)
- **Soporte de unidades múltiples** (mg, mcg, Unidades)
- **Base de datos completa** de 27 medicamentos
- **Funciona offline** después de la primera carga (PWA)
- **Diseño responsive** optimizado para móviles

### 🧪 Calculadora de Diluciones IV
Para medicamentos que requieren reconstitución:
- Selección de volumen de dilución (configurables desde el JSON)
- Cálculo automático de concentración final
- Volumen exacto a administrar

**Ejemplo:** Ceftriaxona 1g
- Dilución en 3ml → Concentración: 333mg/ml
- Dilución en 4ml → Concentración: 250mg/ml

### 💧 Cálculo de Suspensiones
Calcula automáticamente los ml/cc a administrar según la presentación seleccionada:
- Paracetamol 120mg/5ml
- Paracetamol 160mg/5ml
- Amoxicilina 250mg/5ml
- Y más...

---

## 💊 Medicamentos incluidos (27 total)

### Analgésicos/Antipiréticos
- Paracetamol (Acetaminofén)
- Ibuprofeno (⚠️ >6 meses)
- Dipirona (Metamizol)
- Diclofenaco

### Antibióticos Betalactámicos
- Amoxicilina
- Amoxicilina + Ácido Clavulánico
- Penicilina Cristalina (en Unidades)
- Ceftriaxona (con diluciones: 3ml, 4ml)
- Cefepime (con diluciones: 3ml, 4ml, 5ml)

### Quinolonas
- Ciprofloxacina (múltiples indicaciones: EDA vs ITU/IRA)
- Levofloxacina

### Macrólidos
- Azitromicina (dosis estándar vs cólera)
- Eritromicina (con diluciones: 10ml, 20ml)

### Otros Antibióticos
- Metronidazol
- Sulfaprim (TMP-SMX)
- Cloranfenicol (con diluciones: 5ml, 10ml)
- Vancomicina (con diluciones: 5ml, 10ml)
- Clindamicina
- Fosfomicina (con diluciones: 4ml, 5ml, 10ml)

### Antivirales
- Aciclovir (con diluciones: 5ml, 10ml)
- Oseltamivir (⏱️ <72h de síntomas)

### Broncodilatadores
- Salbutamol (incluye fórmula para nebulización)

### Corticoides
- Hidrocortisona
- Dexametasona
- Prednisona

### Emergencias
- Epinefrina (⚠️ máx 0.3ml)
- Difenhidramina

---

## 📱 Instalación como PWA

La aplicación se puede instalar en tu dispositivo:

### En Android/Chrome:
1. Abrir la calculadora en Chrome
2. Menú (⋮) → "Instalar aplicación" o "Añadir a pantalla de inicio"

### En iOS/Safari:
1. Abrir en Safari
2. Botón compartir → "Añadir a pantalla de inicio"

### En PC/Escritorio:
1. Chrome: Ícono de instalación en la barra de direcciones
2. Edge: Similar a Chrome

---

## 🛠️ Tecnologías utilizadas

- **HTML5 + CSS3** - Interfaz moderna y responsive
- **JavaScript Vanilla** - Sin dependencias externas
- **Service Worker** - Funcionalidad offline
- **PWA** - Instalable en dispositivos
- **JSON** - Base de datos de medicamentos configurable

---

## 📊 Estructura del proyecto

```
/
├── index.html              # Aplicación principal v2.0
├── medications.json        # Base de datos de medicamentos
├── manifest.json          # Configuración PWA
├── service-worker.js      # Cache y funcionalidad offline
├── icon-192.png          # Ícono PWA 192x192
├── icon-512.png          # Ícono PWA 512x512
└── README.md             # Este archivo
```

---

## 🔧 Configuración del JSON

### Agregar un nuevo medicamento:

```json
{
  "nombre_medicamento": {
    "name": "Nombre Comercial",
    "dose": "10-15 mg/kg/día",
    "minDose": 10,
    "maxDose": 15,
    "unit": "mg",
    "maxDaily": "60 mg/kg/día",
    "maxDailyValue": 60,
    "interval": "Cada 8 horas",
    "intervalHours": 8,
    "presentations": [
      {
        "type": "liquid",
        "description": "Suspensión 250mg/5ml",
        "concentration": 250,
        "concentrationUnit": "mg",
        "volume": 5,
        "dilutionOptions": null
      },
      {
        "type": "iv",
        "description": "Bulbo 1g",
        "concentration": 1000,
        "concentrationUnit": "mg",
        "volume": null,
        "dilutionOptions": [3, 4, 5]
      }
    ],
    "specialDosing": null,
    "ageRestrictions": null,
    "notes": "Notas clínicas importantes"
  }
}
```

### Tipos de presentación:
- `solid` - Tabletas, cápsulas, supositorios
- `liquid` - Suspensiones, jarabes (calcula ml/cc)
- `iv` - Ámpulas, bulbos (puede tener dilutionOptions)
- `aerosol` - Inhaladores
- `nebulizacion` - Para nebulizar
- `topical` - Cremas, ungüentos

### Configurar diluciones IV:
```json
"dilutionOptions": [3, 4, 5, 10]  // Botones: [3ml] [4ml] [5ml] [10ml]
"dilutionOptions": null           // No mostrar calculadora
```

### Agregar múltiples indicaciones:
```json
"specialDosing": {
  "hasMultipleDoses": true,
  "options": [
    {
      "indication": "EDA por Shigella",
      "minDose": 10,
      "maxDose": 15
    },
    {
      "indication": "ITU o IRA",
      "minDose": 20,
      "maxDose": 30
    }
  ]
}
```

### Agregar restricciones de edad:
```json
"ageRestrictions": {
  "minMonths": 6,
  "warning": "Contraindicado en menores de 6 meses"
}
```

---

## ⚠️ Advertencias importantes

### Uso clínico:
- ✅ Herramienta de **referencia y apoyo** para profesionales de la salud
- ✅ **Siempre verificar** dosis con fuentes oficiales actualizadas
- ✅ Considerar condiciones clínicas individuales del paciente
- ⚠️ **NO sustituye** el juicio clínico profesional
- ⚠️ Verificar interacciones medicamentosas
- ⚠️ Ajustar según función renal/hepática cuando corresponda

### Seguridad:
- Las dosis máximas son indicativas
- Siempre verificar contraindicaciones
- Considerar alergias del paciente
- Monitorear efectos adversos

---

## 👨‍⚕️ Público objetivo

- Estudiantes de Medicina (práctica preprofesional)
- Médicos Generales
- Pediatras
- Médicos de Emergencia
- Internos y Residentes

---

## 🚀 Desarrollo local

### Requisitos:
- Navegador web moderno
- Servidor web local (no funciona con file://)

### Ejecutar localmente:

**Opción 1 - Python:**
```bash
python -m http.server 8000
# Abrir: http://localhost:8000
```

**Opción 2 - Node.js:**
```bash
npx http-server -p 8000
```

**Opción 3 - VS Code:**
- Extensión "Live Server"
- Click derecho → "Open with Live Server"

---

## 📝 Changelog

### v2.0.0 (2025)
- ✨ Calculadora de diluciones IV configurable
- ✨ Cálculo automático de ml/cc para suspensiones
- ✨ División de dosis por intervalo
- ✨ Validaciones por edad
- ✨ Múltiples indicaciones por medicamento
- ✨ Soporte para Unidades (Penicilina)
- ✨ Campo de edad opcional
- 🐛 Corrección de visualización de dosis únicas
- 🐛 Mejora en manejo de campos vacíos
- 📚 Base de datos expandida a 27 medicamentos

### v1.0.0 (Versión inicial)
- Cálculo básico de dosis
- Base de datos inicial
- PWA con funcionalidad offline

---

## 📄 Licencia

Este proyecto es de código abierto para uso educativo y profesional.

---

## 👨‍💻 Desarrollado por

**Para estudiantes de medicina, médicos generales y especialistas**  
Herramienta desarrollada para práctica profesional en pediatría

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'feat: Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

---

## 📞 Soporte

Para reportar bugs o solicitar features:
- Abrir un **Issue** en GitHub
- Incluir descripción detallada del problema
- Adjuntar capturas de pantalla si es necesario

---

## ⭐ Si te resulta útil

Dale una estrella ⭐ al repositorio para ayudar a otros a encontrarlo.

---

**Última actualización:** 2025  
**Versión:** 2.0.0
