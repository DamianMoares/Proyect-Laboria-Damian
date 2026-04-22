# Implementación de Sistema de API Externa

## Problema Detectado

La aplicación Laboria-V2 necesitaba la capacidad de conectarse a APIs externas para permitir que los candidatos busquen ofertas de empleo y cursos de fuentes externas, ampliando así las oportunidades disponibles más allá de los datos locales.

## Solución Implementada

Se ha creado un sistema completo de conexión a APIs externas a través del archivo `ConexionApi.jsx`, que permite integrar **múltiples APIs** de empleo y cursos simultáneamente, combinando los resultados de todas las fuentes habilitadas para ofrecer una búsqueda más completa.

### Archivo Creado

**src/context/ConexionApi.jsx**
- Sistema de conexión a **múltiples APIs** externas para empleo y cursos
- Funciones de búsqueda con filtros avanzados
- Normalización de datos de diferentes APIs
- Manejo robusto de errores por API individual
- Combinación de resultados de múltiples fuentes
- Verificación de conexión con cada API
- Etiquetado de resultados por fuente (source)

### Archivo de Configuración

**.env.example**
- Plantilla para variables de entorno con soporte para múltiples APIs
- Documentación de API keys y URLs para cada fuente
- Instrucciones de configuración y habilitación

## Funciones Implementadas

### Búsqueda de Empleo

**searchJobs(filters)**
```javascript
// Ejemplo de uso
import { searchJobs } from './context/ConexionApi';

const jobs = await searchJobs({
  query: 'React Developer',
  location: 'Madrid',
  workMode: 'remoto',
  category: 'Tecnología',
  page: 1,
  limit: 20
});
```

**Filtros disponibles:**
- `query`: Término de búsqueda
- `location`: Ubicación
- `category`: Categoría
- `workMode`: Modalidad de trabajo (remoto, presencial, híbrido)
- `page`: Página de resultados
- `limit`: Límite de resultados por página

**getJobDetails(jobId)**
```javascript
const jobDetails = await getJobDetails(123);
```

### Búsqueda de Cursos

**searchCourses(filters)**
```javascript
// Ejemplo de uso
import { searchCourses } from './context/ConexionApi';

const courses = await searchCourses({
  query: 'React',
  category: 'Desarrollo Web',
  level: 'intermedio',
  language: 'es',
  location: 'españa', // Para cursos presenciales en España
  mode: 'presencial', // 'presencial', 'online', 'ambos'
  page: 1,
  limit: 20
});
```

**Filtros disponibles:**
- `query`: Término de búsqueda
- `category`: Categoría
- `level`: Nivel (principiante, intermedio, avanzado)
- `language`: Idioma
- `location`: Ubicación (ej: 'españa' para presenciales)
- `mode`: Modalidad ('presencial', 'online', 'ambos')
- `page`: Página de resultados
- `limit`: Límite de resultados por página

**Filtros de ubicación y modalidad:**
- `location: 'españa'` + `mode: 'presencial'` - Cursos presenciales en España
- `location: ''` + `mode: 'online'` - Cursos online globales
- `location: 'españa'` + `mode: 'ambos'` - Cursos en España (presenciales y online)

**getCourseDetails(courseId)**
```javascript
const courseDetails = await getCourseDetails(456);
```

### Verificación de Conexión

**checkApiConnection()**
```javascript
const status = await checkApiConnection();
// Retorna: 
// {
//   jobs: [
//     { name: 'WeWorkRemotely', connected: true, error: null },
//     { name: 'InfoJobs', connected: false, error: 'No habilitada o sin URL' },
//     { name: 'LinkedIn', connected: false, error: 'HTTP 401' }
//   ],
//   courses: [
//     { name: 'Greenhouse', connected: true, error: null },
//     { name: 'Coursera', connected: false, error: 'No habilitada o sin URL' },
//     { name: 'Udemy', connected: false, error: 'HTTP 403' }
//   ]
// }
```

## Configuración de Variables de Entorno

### Archivo .env

El sistema soporta **múltiples APIs** por categoría. Por defecto, puedes configurar hasta 3 APIs de empleo y 3 APIs de cursos.

**APIs configuradas por defecto:**
- **Adzuna** para búsqueda de empleo
- **Khan Academy** para cursos

```bash
# APIs de Empleo (múltiples fuentes)
# API 1 - Adzuna (habilitada por defecto)
VITE_JOBS_API_1_URL=https://api.adzuna.com/v1/api/jobs/es/search/1
VITE_JOBS_API_1_APP_ID=tu_app_id_aqui
VITE_JOBS_API_1_KEY=tu_api_key_aqui

# API 2 - InfoJobs (configura URL y KEY para habilitar)
VITE_JOBS_API_2_URL=
VITE_JOBS_API_2_KEY=

# API 3 - LinkedIn (configura URL y KEY para habilitar)
VITE_JOBS_API_3_URL=
VITE_JOBS_API_3_KEY=

# APIs de Cursos (múltiples fuentes)
# API 1 - Khan Academy (habilitada por defecto)
VITE_COURSES_API_1_URL=https://www.khanacademy.org/api/v1/topic/root
VITE_COURSES_API_1_KEY=

# API 2 - Coursera (configura URL y KEY para habilitar)
VITE_COURSES_API_2_URL=
VITE_COURSES_API_2_KEY=

# API 3 - Udemy (configura URL y KEY para habilitar)
VITE_COURSES_API_3_URL=
VITE_COURSES_API_3_KEY=
```

### Pasos para Configurar

1. Copiar `.env.example` a `.env`
2. Configurar las URLs de las APIs deseadas en cada slot
3. Agregar las API keys correspondientes (si la API lo requiere)
4. Para Adzuna, configurar tanto `APP_ID` como `API_KEY`
5. Cambiar `enabled: true` en `ConexionApi.jsx` para las APIs que quieras activar
6. El archivo `.env` ya está en `.gitignore` para proteger las credenciales

### Habilitar/Deshabilitar APIs

En `src/context/ConexionApi.jsx`, cambia la propiedad `enabled` de cada API:

```javascript
JOBS_APIS: [
  {
    name: 'Adzuna',
    url: import.meta.env.VITE_JOBS_API_1_URL || 'https://api.adzuna.com/v1/api/jobs/es/search/1',
    appId: import.meta.env.VITE_JOBS_API_1_APP_ID || '',
    apiKey: import.meta.env.VITE_JOBS_API_1_KEY || '',
    enabled: true,  // Cambia a false para deshabilitar
  },
  // ...
]
```

### Obtener Credenciales

**Adzuna:**
- Regístrate en https://developer.adzuna.com/
- Obtén tu APP_ID y API_KEY
- Configura ambas variables en `.env`

**InfoJobs:**
- Regístrate en https://developer.infojobs.net/
- Obtén tu API_KEY
- Configura la variable en `.env`

**LinkedIn:**
- Regístrate en https://developer.linkedin.com/
- Obtén tu API_KEY
- Configura la variable en `.env`

**Khan Academy:**
- La API de Khan Academy es pública y no requiere autenticación
- Solo configura la URL en `.env`

**Coursera:**
- Regístrate en https://partner.coursera.org/
- Obtén tu API_KEY
- Configura la variable en `.env`

**Udemy:**
- Regístrate en https://www.udemy.com/developers/
- Obtén tu API_KEY
- Configura la variable en `.env`

## Normalización de Datos

El sistema normaliza automáticamente los datos de diferentes APIs al formato interno de Laboria-V2:

### Formato de Empleo Normalizado

```javascript
{
  id: string,
  title: string,
  company: string,
  location: string,
  workMode: string,
  schedule: string,
  experienceLevel: string,
  salary: string,
  contractType: string,
  sector: string,
  technology: string,
  description: string,
  requirements: array,
  benefits: array,
  postedDate: string,
  url: string,
  remote: boolean,
  logo: string,
  source: string  // Nombre de la API de origen (ej: 'WeWorkRemotely', 'InfoJobs')
}
```

### Formato de Curso Normalizado

```javascript
{
  id: string,
  title: string,
  provider: string,
  category: string,
  level: string,
  duration: string,
  language: string,
  price: string,
  rating: number,
  reviews: number,
  students: number,
  description: string,
  requirements: array,
  learningOutcomes: array,
  syllabus: array,
  imageUrl: string,
  url: string,
  certificate: boolean,
  lastUpdated: string,
  location: string,  // Ubicación del curso (ej: 'Madrid', 'España', '')
  mode: string,  // Modalidad ('presencial', 'online', 'no especificado')
  source: string  // Nombre de la API de origen (ej: 'Khan Academy', 'Coursera')
}
```

## Manejo de Errores

El sistema incluye manejo robusto de errores:

- **Errores de red**: Capturados y logueados
- **Errores HTTP**: Verificación de status codes
- **Datos inválidos**: Normalización con valores por defecto
- **APIs no disponibles**: Retorno de arrays vacíos en lugar de fallos
- **Errores por API individual**: Si una API falla, las otras continúan funcionando

### Comportamiento con Múltiples APIs

Cuando se configuran múltiples APIs:

1. **Búsqueda en paralelo**: El sistema realiza peticiones a todas las APIs habilitadas simultáneamente
2. **Combinación de resultados**: Los resultados de todas las APIs se combinan en un solo array
3. **Etiquetado de fuente**: Cada resultado incluye un campo `source` indicando la API de origen
4. **Manejo de errores individuales**: Si una API falla, no afecta a las demás
5. **Límite total**: El parámetro `limit` se aplica al total de resultados combinados
6. **Logging de errores**: Los errores de cada API se loguean individualmente para debugging

```javascript
// Ejemplo de respuesta con múltiples fuentes
const jobs = await searchJobs({ query: 'React' });
// jobs = [
//   { id: 1, title: 'React Developer', source: 'WeWorkRemotely', ... },
//   { id: 2, title: 'Frontend Engineer', source: 'InfoJobs', ... },
//   { id: 3, title: 'React Developer', source: 'LinkedIn', ... }
// ]
```

```javascript
try {
  const jobs = await searchJobs({ query: 'React' });
  // jobs será un array (vacío si hay error)
} catch (error) {
  console.error('Error:', error);
}
```

## Integración con Componentes

### Ejemplo de Integración en JobSearchPage

```javascript
import React, { useState, useEffect } from 'react';
import { searchJobs } from '../../context/ConexionApi';

const JobSearchPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (filters) => {
    setLoading(true);
    setError(null);
    try {
      const results = await searchJobs(filters);
      setJobs(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // JSX del componente
  );
};
```

## APIs Compatibles

El sistema está diseñado para ser compatible con diferentes APIs:

### APIs de Empleo (Sugeridas)
- LinkedIn API
- InfoJobs API
- Indeed API
- Reed API
- Glassdoor API
- Adzuna API

### APIs de Cursos (Sugeridas)
- Coursera API
- Udemy API
- edX API
- Pluralsight API
- Skillshare API
- Udacity API

## Seguridad

### Protección de API Keys
- Las API keys se almacenan en variables de entorno
- El archivo `.env` está en `.gitignore`
- Nunca se exponen las credenciales en el código
- Se usa autenticación Bearer token

### CORS
- Las APIs deben soportar CORS o configurarse proxy
- Considerar usar un proxy para desarrollo
- Configurar whitelist de dominios en producción

## Próximos Pasos Sugeridos

1. **Implementar caché**: Agregar caché local para reducir llamadas a API
2. **Agregar rate limiting**: Controlar frecuencia de peticiones
3. **Implementar paginación real**: Usar paginación de las APIs externas
4. **Agregar filtros avanzados**: Expandir opciones de filtrado
5. **Implementar búsqueda en tiempo real**: Debounce de búsquedas
6. **Agregar indicadores de carga**: Mostrar loading states durante fetch
7. **Implementar fallback**: Usar datos locales si APIs fallan
8. **Agregar logging**: Registrar métricas de uso de APIs
9. **Implementar webhooks**: Sincronización periódica con APIs
10. **Agregar autenticación OAuth2**: Para APIs que lo requieran

## Impacto de la Mejora

### Funcionalidad
- **Búsqueda externa**: Los candidatos pueden buscar en múltiples fuentes externas simultáneamente
- **Más oportunidades**: Acceso a miles de ofertas y cursos adicionales de diferentes plataformas
- **Filtros avanzados**: Búsqueda más precisa con múltiples filtros
- **Normalización**: Datos consistentes independientemente de la API
- **Combinación de resultados**: Resultados de todas las APIs en una sola lista
- **Etiquetado de fuente**: Identificación clara del origen de cada resultado

### UX
- **Búsqueda unificada**: Una sola interfaz para múltiples fuentes
- **Resultados relevantes**: Filtros específicos por tipo de contenido
- **Error handling**: Mensajes claros cuando APIs no están disponibles
- **Transparencia**: Los usuarios pueden ver de qué fuente proviene cada resultado
- **Resiliencia**: Si una API falla, las otras continúan funcionando

### Mantenibilidad
- **Código modular**: Funciones reutilizables para diferentes APIs
- **Fácil configuración**: Variables de entorno para cambiar APIs
- **Normalización centralizada**: Lógica de transformación en un solo lugar
- **Escalable**: Fácil agregar nuevas APIs (solo agregar al array)
- **Habilitación/deshabilitación**: Control individual de cada API

### Desarrollo
- **TypeScript ready**: Estructura compatible con TypeScript
- **Testing friendly**: Funciones puras fáciles de testear
- **Documentación completa**: JSDoc en todas las funciones
- **Error handling robusto**: Manejo consistente de errores por API
- **Parallel requests**: Peticiones en paralelo para mejor performance
