# Laboria 

Portal web de búsqueda de empleo y formación profesional orientado al mercado español.

## Descripción

Laboria  es un portal que combina búsqueda de ofertas laborales con búsqueda de cursos de formación. Se diferencia de otros portales al integrar ambas vertientes en una sola plataforma, permitiendo a los usuarios encontrar empleo y mejorar sus habilidades profesionalmente.

## Características

- **Búsqueda de empleo**: Filtros por ubicación, modalidad, jornada, nivel, salario, tipo de contrato y sector.
- **Búsqueda de cursos**: Filtros por tecnología, nivel, duración, formato y certificación.
- **UI/UX**: Diseño limpio con paleta negro + dorado, responsive y accesible.
- **Frontend-only**: Toda la lógica de búsqueda y filtrado se ejecuta en el cliente.

## Tecnologías

- React 18
- Vite
- React Router DOM 6
- JavaScript (sin TypeScript)

## Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview
```

## Estructura del Proyecto

```
Laboria /
├── DOC/                          # Documentación de mejoras
├── public/                       # Assets estáticos
├── src/
│   ├── assets/                   # Imágenes, fuentes, iconos
│   ├── components/               # Componentes reutilizables
│   │   ├── common/              # Componentes genéricos
│   │   ├── jobs/                # Componentes específicos de empleo
│   │   └── courses/             # Componentes específicos de cursos
│   ├── data/                     # Datos mock
│   │   ├── jobs.json
│   │   └── courses.json
│   ├── hooks/                    # Custom hooks
│   ├── i18n/                     # Configuración i18next
│   ├── pages/                    # Páginas principales
│   ├── utils/                    # Utilidades
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── README.md
```

## Rutas

- `/` - Home (landing page)
- `/empleos` - Búsqueda de empleos
- `/cursos` - Búsqueda de cursos
- `/acerca-de` - Acerca de (en construcción)
- `/faq` - FAQ (en construcción)

## Estilos

El proyecto utiliza una paleta de colores consistente:

- **Negro base**: `#0a0a0a`
- **Dorado acento**: `#d4af37`
- **Dorado claro**: `#f4d03f`
- **Gris medio**: `#2a2a2a`

## Datos de Ejemplo

El proyecto incluye datos mock en formato JSON:

- `src/data/jobs.json` - 8 ofertas de empleo
- `src/data/courses.json` - 8 cursos de formación

## Próximos Pasos

- Implementar páginas de detalle (JobDetailPage, CourseDetailPage)
- Configurar i18next para internacionalización
- Crear custom hooks (useJobSearch, useCourseSearch)
- Añadir paginación
- Implementar favoritos con localStorage
- Añadir modo oscuro/claro

## Licencia

© 2024 Laboria . Todos los derechos reservados.
# Proyect-Laboria-Damian
