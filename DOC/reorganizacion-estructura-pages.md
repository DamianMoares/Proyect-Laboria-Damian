# Reorganización de la Estructura de Pages

## Problema Detectado

La carpeta `src/pages` estaba desorganizada con 33 archivos mezclados sin ninguna agrupación lógica, lo que dificultaba el mantenimiento y la navegación en el proyecto.

## Solución Implementada

Se ha reorganizado la estructura de carpetas en `src/pages` agrupando los archivos por funcionalidad con nombres en castellano:

### Nueva Estructura

```
src/pages/
├── autenticacion/           # Autenticación
│   ├── LoginPage.jsx
│   ├── LoginPage.css
│   ├── RegisterPage.jsx
│   └── RegisterPage.css
├── empleos/                 # Ofertas de empleo
│   ├── JobSearchPage.jsx
│   ├── JobSearchPage.css
│   ├── JobDetailPage.jsx
│   ├── JobDetailPage.css
│   ├── PostJobPage.jsx
│   └── MyJobsPage.jsx
├── cursos/                  # Cursos
│   ├── CourseSearchPage.jsx
│   ├── CourseSearchPage.css
│   ├── CourseDetailPage.jsx
│   ├── CourseDetailPage.css
│   ├── PostCoursePage.jsx
│   ├── MyCoursesPage.jsx
│   └── SavedCoursesPage.jsx
├── perfiles/                # Perfiles de usuario
│   ├── CandidateProfilePage.jsx
│   ├── CompanyProfilePage.jsx
│   └── ProfilePage.css
├── informacion/             # Páginas informativas
│   ├── AboutPage.jsx
│   ├── AboutPage.css
│   ├── FAQPage.jsx
│   └── FAQPage.css
├── panel/                   # Dashboard unificado
│   ├── DashboardPage.jsx
│   └── DashboardPage.css
├── curriculo/               # Gestión de currículum
│   ├── CurriculumPage.jsx
│   └── CurriculumPage.css
├── aplicaciones/            # Aplicaciones del candidato
│   └── MyApplicationsPage.jsx
├── inicio/                  # Página de inicio
│   ├── Home.jsx
│   └── Home.css
└── compartidos/             # Estilos compartidos
    ├── FormPage.css
    └── MyListingsPage.css
```

## Archivos Modificados

### Archivos Movidos
- `LoginPage.jsx` + `.css` → `autenticacion/`
- `RegisterPage.jsx` + `.css` → `autenticacion/`
- `JobSearchPage.jsx` + `.css` → `empleos/`
- `JobDetailPage.jsx` + `.css` → `empleos/`
- `PostJobPage.jsx` → `empleos/`
- `MyJobsPage.jsx` → `empleos/`
- `CourseSearchPage.jsx` + `.css` → `cursos/`
- `CourseDetailPage.jsx` + `.css` → `cursos/`
- `PostCoursePage.jsx` → `cursos/`
- `MyCoursesPage.jsx` → `cursos/`
- `SavedCoursesPage.jsx` → `cursos/`
- `CandidateProfilePage.jsx` → `perfiles/`
- `CompanyProfilePage.jsx` → `perfiles/`
- `ProfilePage.css` → `perfiles/`
- `AboutPage.jsx` + `.css` → `informacion/`
- `FAQPage.jsx` + `.css` → `informacion/`
- `DashboardPage.jsx` + `.css` → `panel/`
- `CurriculumPage.jsx` + `.css` → `curriculo/`
- `MyApplicationsPage.jsx` → `aplicaciones/`
- `Home.jsx` + `.css` → `inicio/`
- `FormPage.css` → `compartidos/`
- `MyListingsPage.css` → `compartidos/`

### Archivos Actualizados con Imports

**App.jsx:**
```jsx
// Antes
import Home from './pages/Home';
import JobSearchPage from './pages/JobSearchPage';
// ...

// Después
import Home from './pages/inicio/Home';
import JobSearchPage from './pages/empleos/JobSearchPage';
// ...
```

**PostJobPage.jsx:**
```jsx
// Antes
import { useAuth } from '../context/AuthContext';
import './FormPage.css';

// Después
import { useAuth } from '../../context/AuthContext';
import '../compartidos/FormPage.css';
```

**MyJobsPage.jsx:**
```jsx
// Antes
import { useAuth } from '../context/AuthContext';
import jobsData from '../data/jobs.json';
import './MyListingsPage.css';

// Después
import { useAuth } from '../../context/AuthContext';
import jobsData from '../../data/jobs.json';
import '../compartidos/MyListingsPage.css';
```

**Archivos similares actualizados:**
- PostCoursePage.jsx
- MyCoursesPage.jsx
- CandidateProfilePage.jsx
- CompanyProfilePage.jsx
- LoginPage.jsx
- RegisterPage.jsx
- JobDetailPage.jsx
- CourseDetailPage.jsx
- JobSearchPage.jsx
- CourseSearchPage.jsx
- DashboardPage.jsx
- CurriculumPage.jsx
- MyApplicationsPage.jsx
- SavedCoursesPage.jsx

## Impacto de la Mejora

### Mantenibilidad
- **Organización lógica**: Archivos agrupados por funcionalidad
- **Navegación fácil**: Localizar archivos por contexto
- **Escalabilidad**: Fácil añadir nuevas funcionalidades en carpetas específicas
- **Nombres castellanizados**: Mejor alineación con el contexto del proyecto en español

### Legibilidad
- **Estructura clara**: Carpetas con nombres descriptivos en castellano
- **Separación de concerns**: Cada grupo de funcionalidad en su carpeta
- **Estilos compartidos centralizados**: Carpeta compartidos para CSS reutilizable

### Desarrollo
- **Imports consistentes**: Rutas relativas actualizadas
- **Colaboración**: Easier para múltiples desarrolladores trabajar en paralelo
- **Refactorización**: Más seguro refactorizar carpetas específicas

## Próximos Pasos Sugeridos

1. Considerar mover estilos compartidos a una carpeta `src/styles/` global
2. Crear carpeta `components/` dentro de cada grupo para componentes específicos
3. Implementar barrel exports (index.js) en cada carpeta para imports más limpios
4. Considerar usar path aliases en Vite para imports absolutos
5. Agrupar componentes por feature en lugar de por tipo (feature-based structure)
