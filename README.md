# Laboria - Portal de Empleo y Formación Profesional

Portal web frontend-only que agrega ofertas de empleo y cursos de formación profesional en España desde múltiples APIs públicas y feeds RSS.

## 📋 Descripción

Laboria es un metabuscador que integra ofertas laborales y cursos educativos de diversas fuentes externas en una plataforma unificada. El proyecto se destaca por:

- **Metabuscador de Empleo**: Agrega ofertas de 7+ APIs (RemoteOK, Remotive, Junta Castilla y León, SerpApi, Jobicy, Himalayas, Arbeitnow) y feeds RSS
- **Metabuscador de Cursos**: Integra cursos de YouTube Data API, Google Custom Search, Bing Search API, Coursera, edX, SEPE, MIT OpenCourseWare y TED-Ed
- **Normalización de Datos**: Convierte datos de diferentes fuentes a un formato unificado
- **Panel de Administración**: Verifica estado de APIs y ejecuta tests del sistema
- **Sistema de Testing**: Tests automatizados con Vitest y React Testing Library
- **Arquitectura Frontend-Only**: Sin backend propio, toda la lógica en el cliente

## ✨ Características

### Búsqueda de Empleo
- Filtros por ubicación, modalidad, categoría, nivel, salario, tipo de contrato
- Búsqueda en tiempo real con debounce (500ms)
- Normalización de datos de múltiples APIs
- Sistema de fallback con datos locales
- Paginación de resultados

### Búsqueda de Cursos
- Filtros por categoría, nivel, modalidad, idioma, duración, precio
- Integración con APIs de búsqueda (YouTube, Google, Bing)
- Feeds RSS de plataformas educativas
- Normalización de datos de múltiples fuentes
- Sistema de fallback con datos locales

### Panel de Administración
- Verificación de estado de APIs en tiempo real
- Ejecución de tests del sistema
- Visualización de resultados de tests (18 tests)
- Indicadores de carga animados
- Pestañas separadas para APIs y Tests

### Testing
- 18 tests automatizados (Home, JobSearchPage, CourseSearchPage)
- Stack: Vitest + React Testing Library
- Panel de administración para ejecutar tests
- Mock de APIs para testing aislado

## 🛠 Stack Tecnológico

- **Frontend**: React 18.3.1
- **Bundler**: Vite 5.2.11
- **Enrutamiento**: React Router DOM 6.22.3
- **Testing**: Vitest 1.4.0 + React Testing Library 14.2.1
- **Estilos**: CSS Variables (paleta negro + dorado)
- **Lenguaje**: JavaScript (sin TypeScript)

## 📦 Instalación

```bash

# Instalar dependencias
npm install

# Crear archivo .env (ver sección Variables de Entorno)
cp .env.example .env

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview

# Ejecutar tests
npm test

# Ejecutar tests con UI
npm run test:ui
```

## 🔐 Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```bash
# APIs de Empleo
VITE_JOBS_API_2_KEY=tu_serpapi_key

# APIs de Cursos
VITE_COURSES_YOUTUBE_KEY=tu_youtube_api_key
VITE_COURSES_GOOGLE_SEARCH_KEY=tu_google_search_key
VITE_GOOGLE_CSE_ID=tu_custom_search_engine_id
VITE_COURSES_BING_KEY=tu_bing_search_key
```

**Cómo obtener las API keys:**
- YouTube: https://console.cloud.google.com/
- Google Custom Search: https://programmablesearchengine.google.com/
- Bing Search: https://www.microsoft.com/cognitive-services/
- SerpApi: https://serpapi.com/

## 📁 Estructura del Proyecto

```
Proyecto-Laboria-Damián/
├── DOC/                          # Documentación del proyecto
│   ├── 01-introduccion-proyecto.md
│   ├── 02-arquitectura.md
│   ├── 03-apis-integradas.md
│   ├── 04-testing.md
│   └── 05-futuras-mejoras.md
├── public/                       # Assets estáticos
├── src/
│   ├── components/               # Componentes reutilizables
│   │   ├── courses/              # Componentes de cursos
│   │   ├── empleos/              # Componentes de empleo
│   │   └── ui/                   # Componentes genéricos
│   ├── context/                  # Context API y conexiones
│   │   └── ConexionApi.jsx       # Gestión de APIs
│   ├── data/                     # Datos locales y mock
│   │   ├── courses.json
│   │   ├── jobs.json
│   │   └── searchData.js
│   ├── pages/                    # Páginas principales
│   │   ├── admin/                # Panel de administración
│   │   │   └── ApiStatusPage.jsx
│   │   ├── cursos/               # Páginas de cursos
│   │   │   ├── CourseSearchPage.jsx
│   │   │   └── CourseSearchPage.test.jsx
│   │   ├── empleos/              # Páginas de empleo
│   │   │   ├── JobSearchPage.jsx
│   │   │   └── JobSearchPage.test.jsx
│   │   └── inicio/               # Página de inicio
│   │       ├── Home.jsx
│   │       └── Home.test.jsx
│   ├── test/                     # Setup de testing
│   │   └── setup.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env                          # Variables de entorno (no en git)
├── .env.example                  # Ejemplo de variables
├── .gitignore
├── package.json
├── vite.config.js                # Configuración de Vite + proxy
├── vitest.config.js              # Configuración de tests
└── README.md
```

## 🚀 Rutas

- `/` - Home (landing page con estadísticas)
- `/empleos` - Búsqueda de empleos
- `/cursos` - Búsqueda de cursos
- `/admin/api-status` - Panel de administración (APIs y Tests)

## 🎨 Estilos

Paleta de colores consistente (negro + dorado):

- **Negro base**: `#0a0a0a`
- **Dorado acento**: `#d4af37`
- **Dorado claro**: `#f4d03f`
- **Gris medio**: `#2a2a2a`
- **Verde éxito**: `#22c55e`
- **Rojo error**: `#dc2626`

## 📚 Documentación

La documentación completa del proyecto está en la carpeta `DOC/`:

- **01-introduccion-proyecto.md**: Descripción general, objetivos, stack, instalación
- **02-arquitectura.md**: Arquitectura del proyecto, patrones de diseño, flujo de datos
- **03-apis-integradas.md**: Documentación detallada de todas las APIs y feeds RSS
- **04-testing.md**: Stack de testing, configuración, tests implementados
- **05-futuras-mejoras.md**: Roadmap de mejoras prioritarias y futuras

## 🔧 Configuración de Proxy

El proyecto usa proxy Vite para evitar CORS:

```javascript
// vite.config.js
server: {
  proxy: {
    '/api/jcyl': 'https://www.jcyl.es',
    '/api/serpapi': 'https://serpapi.com',
    '/api/jobicy': 'https://jobicy.com',
    '/api/himalayas': 'https://himalayas.app',
    '/api/remotive': 'https://remotive.com',
    '/api/arbeitnow': 'https://www.arbeitnow.com',
  }
}
```

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests con interfaz visual
npm run test:ui

# Ejecutar tests en modo watch
npm test -- --watch

# Ejecutar tests con coverage
npm test -- --coverage
```

**Tests implementados:**
- Home Page: 6 tests
- JobSearchPage: 6 tests
- CourseSearchPage: 6 tests
- Total: 18 tests

## 📊 APIs Integradas

### Empleo (7 APIs + 3 RSS)
- RemoteOK, Remotive, Junta Castilla y León, SerpApi, Jobicy, Himalayas, Arbeitnow
- RSS: InfoJobs, LinkedIn Jobs, Glassdoor Blog

### Cursos (3 APIs + 5 RSS)
- YouTube Data API, Google Custom Search, Bing Search API
- RSS: Coursera Blog, edX Blog, SEPE Formación, MIT OpenCourseWare, TED-Ed

Ver `DOC/03-apis-integradas.md` para documentación detallada.

## 🚧 Estado del Proyecto

### ✅ Completado
- Metabuscador de empleo con 7+ APIs
- Metabuscador de cursos con 3 APIs + 5 RSS feeds
- Normalización de datos de múltiples fuentes
- Panel de administración con estado de APIs
- Sistema de testing con 18 tests
- Sistema de fallback con datos locales
- Configuración de proxy para CORS
- Documentación completa en DOC/

### 🔄 En Progreso
- Integración real de tests en panel admin (actualmente simulado)

### 📋 Futuras Mejoras
Ver `DOC/05-futuras-mejoras.md` para roadmap completo de 22 mejoras priorizadas.

## 🤝 Contribución

Este es un proyecto personal/educativo. Las contribuciones son bienvenidas a través de pull requests.

## 📄 Licencia

© 2024 Laboria. Todos los derechos reservados.
