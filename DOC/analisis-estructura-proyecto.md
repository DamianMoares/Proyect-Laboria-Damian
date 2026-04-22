# Análisis de Estructura del Proyecto Laboria-V2

## Problema Detectado

El proyecto Laboria-V2 se inició sin una estructura definida. No existía organización de carpetas, componentes, datos ni documentación, lo que dificultaba el desarrollo escalable y mantenible de un portal web de búsqueda de empleo y formación profesional.

## Solución Implementada

Se ha diseñado y creado una estructura completa de proyecto React + Vite con las siguientes características:

1. **Mapa de rutas definido**: Home, búsqueda de empleos, detalle de empleo, búsqueda de cursos, detalle de curso, acerca de y FAQ.
2. **Estructura de carpetas organizada**: Separación clara entre componentes, páginas, hooks, datos, utilidades e internacionalización.
3. **Datos de ejemplo generados**: JSONs con 8 ofertas de empleo y 8 cursos con campos realistas para el mercado español.
4. **Componentes base creados**: JobCard.jsx y JobSearchPage.jsx con funcionalidad de búsqueda y filtrado en cliente.
5. **Carpeta DOC/ establecida**: Para documentación de mejoras evolutivas.

## Archivos Modificados/Creados

### Archivos de datos
- `src/data/jobs.json` - 8 ofertas de empleo con campos: título, empresa, ubicación, modalidad, jornada, nivel, salario, contrato, sector, tecnología, descripción, requisitos, beneficios y fecha.
- `src/data/courses.json` - 8 cursos con campos: título, plataforma, nivel, duración, formato, precio, certificación, tecnología, descripción, skills, requisitos, instructor, rating y estudiantes.

### Componentes
- `src/components/jobs/JobCard.jsx` - Componente de tarjeta para mostrar oferta individual de empleo.

### Páginas
- `src/pages/JobSearchPage.jsx` - Página de búsqueda de empleo con barra de búsqueda, filtros por ubicación y jornada, y lista de resultados.

### Documentación
- `DOC/analisis-estructura-proyecto.md` - Este archivo.

## Código Relevante

### Estructura de carpetas propuesta
```
Laboria-V2/
├── DOC/                          # Documentación de mejoras
├── public/                       # Assets estáticos
├── src/
│   ├── assets/                   # Imágenes, fuentes, iconos
│   ├── components/               # Componentes reutilizables
│   │   ├── common/              # Componentes genéricos
│   │   ├── jobs/                # Componentes específicos de empleo
│   │   └── courses/             # Componentes específicos de cursos
│   ├── data/                     # Datos mock
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

### JobSearchPage.jsx (fragmento clave)
```jsx
const filteredJobs = jobs.filter(job => {
  const matchesSearch = 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.technology.toLowerCase().includes(searchTerm.toLowerCase());
  
  const matchesLocation = selectedLocation === '' || job.location === selectedLocation;
  const matchesSchedule = selectedSchedule === '' || job.schedule === selectedSchedule;

  return matchesSearch && matchesLocation && matchesSchedule;
});
```

### Ejemplo de dato en jobs.json
```json
{
  "id": 1,
  "title": "Desarrollador Frontend React",
  "company": "TechCorp España",
  "location": "Madrid",
  "workMode": "híbrido",
  "schedule": "full-time",
  "experienceLevel": "intermedio",
  "salary": "35000-45000€",
  "contractType": "indefinido",
  "sector": "Tecnología",
  "technology": "React",
  "description": "Buscamos un desarrollador Frontend con experiencia en React...",
  "requirements": ["2+ años de experiencia con React", "Conocimiento de HTML/CSS/JavaScript"],
  "benefits": ["Seguro médico privado", "Trabajo híbrido"],
  "postedDate": "2024-04-15"
}
```

## Impacto de la Mejora

### UX
- Estructura clara permite navegación intuitiva entre empleo y formación.
- Búsqueda y filtrado en cliente proporciona respuestas rápidas sin latencia de servidor.

### Mantenibilidad
- Separación de concerns (components, pages, hooks, data) facilita localización y modificación de código.
- Nomenclatura consistente y carpetas por dominio (jobs, courses) mejora legibilidad.

### Escalabilidad
- Estructura preparada para añadir nuevas páginas y componentes sin refactorización mayor.
- Datos en JSON independientes permiten migración futura a API real sin cambios en componentes.

### Performance
- Filtrado en cliente reduce llamadas a servidor (simulado con datos mock).
- Componentes modulares permiten optimización individual (memo, lazy loading).

## Próximos Pasos Sugeridos

1. Crear estilos CSS con paleta negro + dorado.
2. Implementar CourseSearchPage y CourseCard.
3. Crear páginas de detalle (JobDetailPage, CourseDetailPage).
4. Configurar React Router para navegación.
5. Implementar i18next para internacionalización.
6. Crear custom hooks (useJobSearch, useCourseSearch).
