// ConexionApi.jsx - Sistema de conexión a APIs externas para búsqueda de empleo y cursos
// Este archivo maneja las llamadas a APIs externas para obtener ofertas de empleo y cursos

// URLs de las APIs (se pueden configurar mediante variables de entorno)
// Soporta múltiples APIs por categoría para combinar resultados
const API_CONFIG = {
  // APIs de empleo (ejemplo: Adzuna, InfoJobs, LinkedIn, etc.)
  JOBS_APIS: [
    {
      name: 'Adzuna',
      url: import.meta.env.VITE_JOBS_API_1_URL || 'https://api.adzuna.com/v1/api/jobs/es/search/1',
      appId: import.meta.env.VITE_JOBS_API_1_APP_ID || '',
      apiKey: import.meta.env.VITE_JOBS_API_1_KEY || '',
      enabled: true,
    },
    {
      name: 'InfoJobs',
      url: import.meta.env.VITE_JOBS_API_2_URL || 'https://api.infojobs.net/api/1/offer',
      apiKey: import.meta.env.VITE_JOBS_API_2_KEY || '',
      enabled: false,
    },
    {
      name: 'LinkedIn',
      url: import.meta.env.VITE_JOBS_API_3_URL || 'https://api.linkedin.com/v2/jobs',
      apiKey: import.meta.env.VITE_JOBS_API_3_KEY || '',
      enabled: false,
    },
  ],
  
  // APIs de cursos (ejemplo: Khan Academy, Coursera, Udemy, etc.)
  COURSES_APIS: [
    {
      name: 'Khan Academy',
      url: import.meta.env.VITE_COURSES_API_1_URL || 'https://www.khanacademy.org/api/v1/topic/root',
      apiKey: import.meta.env.VITE_COURSES_API_1_KEY || '',
      enabled: true,
    },
    {
      name: 'Coursera',
      url: import.meta.env.VITE_COURSES_API_2_URL || 'https://api.coursera.org/api/courses.v1',
      apiKey: import.meta.env.VITE_COURSES_API_2_KEY || '',
      enabled: false,
    },
    {
      name: 'Udemy',
      url: import.meta.env.VITE_COURSES_API_3_URL || 'https://www.udemy.com/api-2.0/courses',
      apiKey: import.meta.env.VITE_COURSES_API_3_KEY || '',
      enabled: false,
    },
  ],
};

// Headers comunes para las peticiones
const getHeaders = (apiKey) => ({
  'Content-Type': 'application/json',
  ...(apiKey && { 'Authorization': `Bearer ${apiKey}` }),
});

// Construye URL con parámetros de autenticación para APIs que los requieren
const buildAuthUrl = (url, appId, apiKey) => {
  if (appId && apiKey) {
    return `${url}?app_id=${appId}&app_key=${apiKey}`;
  }
  return url;
};

/**
 * Manejo de errores de API
 * @param {Error} error - Error capturado
 * @param {string} context - Contexto del error
 * @throws {Error} Error con mensaje descriptivo
 */
const handleApiError = (error, context) => {
  console.error(`Error en ${context}:`, error);
  throw new Error(`Error al ${context}: ${error.message}`);
};

/**
 * Realiza una petición GET a una API externa
 * @param {string} url - URL de la API
 * @param {Object} headers - Headers de la petición
 * @param {string} context - Contexto para manejo de errores
 * @returns {Promise<Object>} Respuesta de la API
 */
const fetchFromApi = async (url, headers, context) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    handleApiError(error, context);
  }
};

/**
 * Busca ofertas de empleo en múltiples APIs externas
 * @param {Object} filters - Filtros de búsqueda
 * @param {string} filters.query - Término de búsqueda
 * @param {string} filters.location - Ubicación
 * @param {string} filters.category - Categoría
 * @param {string} filters.workMode - Modalidad de trabajo (remoto, presencial, híbrido)
 * @param {number} filters.page - Página de resultados
 * @param {number} filters.limit - Límite de resultados por página
 * @returns {Promise<Array>} Lista combinada de ofertas de empleo de todas las APIs
 */
export const searchJobs = async (filters = {}) => {
  const {
    query = '',
    location = '',
    category = '',
    workMode = '',
    page = 1,
    limit = 20,
  } = filters;

  const enabledApis = API_CONFIG.JOBS_APIS.filter(api => api.enabled && api.url);
  const allResults = [];
  const apiErrors = [];

  // Realizar peticiones a todas las APIs habilitadas en paralelo
  const apiPromises = enabledApis.map(async (api) => {
    try {
      // Construir URL base con autenticación si es necesaria
      let url = buildAuthUrl(api.url, api.appId, api.apiKey);
      
      // Construir URL con parámetros de consulta
      const params = new URLSearchParams();
      if (query) params.append('q', query);
      if (location) params.append('location', location);
      if (category) params.append('category', category);
      if (workMode) params.append('work_mode', workMode);
      params.append('page', page);
      params.append('limit', limit);

      // Agregar parámetros a la URL
      const separator = url.includes('?') ? '&' : '?';
      url = `${url}${separator}${params.toString()}`;

      const headers = getHeaders(api.apiKey);

      const data = await fetchFromApi(url, headers, `buscar ofertas en ${api.name}`);
      
      // Normalizar datos y agregar fuente
      const normalizedData = normalizeJobsData(data);
      return {
        source: api.name,
        data: normalizedData,
      };
    } catch (error) {
      console.error(`Error en API ${api.name}:`, error);
      apiErrors.push({ api: api.name, error: error.message });
      return { source: api.name, data: [] };
    }
  });

  // Esperar todas las peticiones
  const results = await Promise.all(apiPromises);

  // Combinar resultados y agregar información de fuente
  results.forEach(result => {
    result.data.forEach(job => {
      job.source = result.source;
      allResults.push(job);
    });
  });

  // Log de errores si existen
  if (apiErrors.length > 0) {
    console.warn('Errores en algunas APIs de empleo:', apiErrors);
  }

  // Aplicar límite total a resultados combinados
  return allResults.slice(0, limit);
};

/**
 * Obtiene detalles de una oferta de empleo específica
 * @param {string} jobId - ID de la oferta de empleo
 * @param {string} source - Fuente de la API (opcional, busca en todas si no se especifica)
 * @returns {Promise<Object|null>} Detalles de la oferta de empleo
 */
export const getJobDetails = async (jobId, source = null) => {
  // Si se especifica fuente, buscar solo en esa API
  if (source) {
    const api = API_CONFIG.JOBS_APIS.find(api => api.name === source && api.enabled);
    if (!api) {
      console.error(`API ${source} no encontrada o no habilitada`);
      return null;
    }

    try {
      const url = `${api.url}/${jobId}`;
      const headers = getHeaders(api.apiKey);
      const data = await fetchFromApi(url, headers, 'obtener detalles de empleo');
      const normalized = normalizeJobDetails(data);
      normalized.source = source;
      return normalized;
    } catch (error) {
      console.error(`Error al obtener detalles del empleo de ${source}:`, error);
      return null;
    }
  }

  // Si no se especifica fuente, buscar en todas las APIs habilitadas
  const enabledApis = API_CONFIG.JOBS_APIS.filter(api => api.enabled && api.url);

  for (const api of enabledApis) {
    try {
      const url = `${api.url}/${jobId}`;
      const headers = getHeaders(api.apiKey);
      const data = await fetchFromApi(url, headers, `obtener detalles de empleo en ${api.name}`);
      const normalized = normalizeJobDetails(data);
      normalized.source = api.name;
      return normalized;
    } catch (error) {
      console.error(`Error al obtener detalles del empleo de ${api.name}:`, error);
      continue;
    }
  }

  return null;
};

/**
 * Busca cursos en múltiples APIs externas
 * @param {Object} filters - Filtros de búsqueda
 * @param {string} filters.query - Término de búsqueda
 * @param {string} filters.category - Categoría
 * @param {string} filters.level - Nivel (principiante, intermedio, avanzado)
 * @param {string} filters.language - Idioma
 * @param {string} filters.location - Ubicación (ej: 'españa' para presenciales)
 * @param {string} filters.mode - Modalidad (presencial, online, ambos)
 * @param {number} filters.page - Página de resultados
 * @param {number} filters.limit - Límite de resultados por página
 * @returns {Promise<Array>} Lista combinada de cursos de todas las APIs
 */
export const searchCourses = async (filters = {}) => {
  const {
    query = '',
    category = '',
    level = '',
    language = 'es',
    location = '',
    mode = 'ambos', // 'presencial', 'online', 'ambos'
    page = 1,
    limit = 20,
  } = filters;

  const enabledApis = API_CONFIG.COURSES_APIS.filter(api => api.enabled && api.url);
  const allResults = [];
  const apiErrors = [];

  // Realizar peticiones a todas las APIs habilitadas en paralelo
  const apiPromises = enabledApis.map(async (api) => {
    try {
      // Construir URL base con autenticación si es necesaria
      let url = buildAuthUrl(api.url, api.appId, api.apiKey);
      
      // Construir URL con parámetros de consulta
      const params = new URLSearchParams();
      if (query) params.append('q', query);
      if (category) params.append('category', category);
      if (level) params.append('level', level);
      params.append('language', language);
      if (location) params.append('location', location);
      if (mode && mode !== 'ambos') params.append('mode', mode);
      params.append('page', page);
      params.append('limit', limit);

      // Agregar parámetros a la URL
      const separator = url.includes('?') ? '&' : '?';
      url = `${url}${separator}${params.toString()}`;

      const headers = getHeaders(api.apiKey);

      const data = await fetchFromApi(url, headers, `buscar cursos en ${api.name}`);
      
      // Normalizar datos y agregar fuente
      let normalizedData = normalizeCoursesData(data);
      
      // Aplicar filtros adicionales si la API no los soporta nativamente
      if (location || (mode && mode !== 'ambos')) {
        normalizedData = filterCoursesByLocationAndMode(normalizedData, location, mode);
      }
      
      return {
        source: api.name,
        data: normalizedData,
      };
    } catch (error) {
      console.error(`Error en API ${api.name}:`, error);
      apiErrors.push({ api: api.name, error: error.message });
      return { source: api.name, data: [] };
    }
  });

  // Esperar todas las peticiones
  const results = await Promise.all(apiPromises);

  // Combinar resultados y agregar información de fuente
  results.forEach(result => {
    result.data.forEach(course => {
      course.source = result.source;
      allResults.push(course);
    });
  });

  // Log de errores si existen
  if (apiErrors.length > 0) {
    console.warn('Errores en algunas APIs de cursos:', apiErrors);
  }

  // Aplicar límite total a resultados combinados
  return allResults.slice(0, limit);
};

/**
 * Obtiene detalles de un curso específico
 * @param {string} courseId - ID del curso
 * @param {string} source - Fuente de la API (opcional, busca en todas si no se especifica)
 * @returns {Promise<Object|null>} Detalles del curso
 */
export const getCourseDetails = async (courseId, source = null) => {
  // Si se especifica fuente, buscar solo en esa API
  if (source) {
    const api = API_CONFIG.COURSES_APIS.find(api => api.name === source && api.enabled);
    if (!api) {
      console.error(`API ${source} no encontrada o no habilitada`);
      return null;
    }

    try {
      const url = `${api.url}/${courseId}`;
      const headers = getHeaders(api.apiKey);
      const data = await fetchFromApi(url, headers, 'obtener detalles del curso');
      const normalized = normalizeCourseDetails(data);
      normalized.source = source;
      return normalized;
    } catch (error) {
      console.error(`Error al obtener detalles del curso de ${source}:`, error);
      return null;
    }
  }

  // Si no se especifica fuente, buscar en todas las APIs habilitadas
  const enabledApis = API_CONFIG.COURSES_APIS.filter(api => api.enabled && api.url);

  for (const api of enabledApis) {
    try {
      const url = `${api.url}/${courseId}`;
      const headers = getHeaders(api.apiKey);
      const data = await fetchFromApi(url, headers, `obtener detalles del curso en ${api.name}`);
      const normalized = normalizeCourseDetails(data);
      normalized.source = api.name;
      return normalized;
    } catch (error) {
      console.error(`Error al obtener detalles del curso de ${api.name}:`, error);
      continue;
    }
  }

  return null;
};

/**
 * Normaliza los datos de empleos de la API externa al formato interno
 * @param {Object} apiData - Datos de la API externa
 * @returns {Array} Datos normalizados
 */
const normalizeJobsData = (apiData) => {
  // Si la API devuelve un array directo
  if (Array.isArray(apiData)) {
    return apiData.map(job => normalizeJobDetails(job));
  }

  // Si la API devuelve un objeto con propiedades como 'jobs', 'results', 'data', etc.
  const jobsArray = apiData.jobs || apiData.results || apiData.data || apiData.items || [];
  
  return jobsArray.map(job => normalizeJobDetails(job));
};

/**
 * Normaliza los detalles de un empleo individual
 * @param {Object} job - Datos del empleo de la API externa
 * @returns {Object} Datos normalizados
 */
const normalizeJobDetails = (job) => {
  return {
    id: job.id || job.job_id || job._id,
    title: job.title || job.job_title || job.position || 'Sin título',
    company: job.company || job.company_name || job.employer || 'Empresa no especificada',
    location: job.location || job.city || job.country || 'Ubicación no especificada',
    workMode: job.work_mode || job.workMode || job.employment_type || 'No especificado',
    schedule: job.schedule || job.hours || 'No especificado',
    experienceLevel: job.experience_level || job.level || 'No especificado',
    salary: job.salary || job.salary_range || 'No especificado',
    contractType: job.contract_type || job.contract_type || 'No especificado',
    sector: job.sector || job.industry || job.category || 'No especificado',
    technology: job.technology || job.tech_stack || job.skills?.join(', ') || 'No especificado',
    description: job.description || job.job_description || job.summary || 'Sin descripción',
    requirements: job.requirements || job.qualifications || job.skills || [],
    benefits: job.benefits || job.perks || [],
    postedDate: job.posted_date || job.created_at || job.date || new Date().toISOString(),
    url: job.url || job.apply_url || job.application_url || '#',
    // Campos adicionales que la API podría proporcionar
    remote: job.remote || job.is_remote || false,
    logo: job.logo || job.company_logo || '',
  };
};

/**
 * Normaliza los datos de cursos de la API externa al formato interno
 * @param {Object} apiData - Datos de la API externa
 * @returns {Array} Datos normalizados
 */
const normalizeCoursesData = (apiData) => {
  // Si la API devuelve un array directo
  if (Array.isArray(apiData)) {
    return apiData.map(course => normalizeCourseDetails(course));
  }

  // Si la API devuelve un objeto con propiedades como 'courses', 'results', 'data', etc.
  const coursesArray = apiData.courses || apiData.results || apiData.data || apiData.items || [];
  
  return coursesArray.map(course => normalizeCourseDetails(course));
};

/**
 * Normaliza los detalles de un curso individual
 * @param {Object} course - Datos del curso de la API externa
 * @returns {Object} Datos normalizados
 */
const normalizeCourseDetails = (course) => {
  return {
    id: course.id || course.course_id || course._id,
    title: course.title || course.course_title || course.name || 'Sin título',
    provider: course.provider || course.instructor || course.author || 'Proveedor no especificado',
    category: course.category || course.subject || course.topic || 'Sin categoría',
    level: course.level || course.difficulty || 'No especificado',
    duration: course.duration || course.length || course.hours || 'No especificado',
    language: course.language || course.locale || 'es',
    price: course.price || course.cost || course.fee || 'No especificado',
    rating: course.rating || course.average_rating || course.score || 0,
    reviews: course.reviews || course.review_count || 0,
    students: course.students || course.enrollment_count || course.participants || 0,
    description: course.description || course.summary || course.about || 'Sin descripción',
    requirements: course.requirements || course.prerequisites || [],
    learningOutcomes: course.learning_outcomes || course.objectives || course.what_you_learn || [],
    syllabus: course.syllabus || course.curriculum || course.modules || [],
    imageUrl: course.image_url || course.thumbnail || course.cover_image || '',
    url: course.url || course.course_url || course.link || '#',
    // Campos adicionales que la API podría proporcionar
    certificate: course.certificate || course.has_certificate || false,
    lastUpdated: course.last_updated || course.updated_at || new Date().toISOString(),
    location: course.location || course.country || course.city || '',
    mode: course.mode || course.delivery_mode || course.is_online !== undefined ? (course.is_online ? 'online' : 'presencial') : 'no especificado',
  };
};

/**
 * Filtra cursos por ubicación y modalidad
 * @param {Array} courses - Lista de cursos normalizados
 * @param {string} location - Ubicación (ej: 'españa', 'madrid')
 * @param {string} mode - Modalidad ('presencial', 'online', 'ambos')
 * @returns {Array} Cursos filtrados
 */
const filterCoursesByLocationAndMode = (courses, location, mode) => {
  if (!location && (!mode || mode === 'ambos')) {
    return courses;
  }

  return courses.filter(course => {
    // Filtro por ubicación
    let locationMatch = true;
    if (location) {
      const courseLocation = (course.location || '').toLowerCase();
      const searchLocation = location.toLowerCase();
      locationMatch = courseLocation.includes(searchLocation) || 
                      courseLocation.includes('españa') || 
                      courseLocation.includes('spain');
    }

    // Filtro por modalidad
    let modeMatch = true;
    if (mode && mode !== 'ambos') {
      const courseMode = (course.mode || '').toLowerCase();
      if (mode === 'online') {
        modeMatch = courseMode === 'online' || courseMode === 'remoto' || courseMode === 'virtual';
      } else if (mode === 'presencial') {
        modeMatch = courseMode === 'presencial' || courseMode === 'in-person' || courseMode === 'offline';
      }
    }

    return locationMatch && modeMatch;
  });
};

/**
 * Verifica la conexión con las APIs externas
 * @returns {Promise<Object>} Estado de conexión de cada API individual
 */
export const checkApiConnection = async () => {
  const status = {
    jobs: [],
    courses: [],
  };

  // Verificar conexión con cada API de empleo habilitada
  for (const api of API_CONFIG.JOBS_APIS) {
    if (!api.enabled || !api.url) {
      status.jobs.push({
        name: api.name,
        connected: false,
        error: 'No habilitada o sin URL',
      });
      continue;
    }

    try {
      const response = await fetch(`${api.url}?limit=1`, {
        method: 'GET',
        headers: getHeaders(api.apiKey),
      });
      status.jobs.push({
        name: api.name,
        connected: response.ok,
        error: response.ok ? null : `HTTP ${response.status}`,
      });
    } catch (error) {
      status.jobs.push({
        name: api.name,
        connected: false,
        error: error.message,
      });
    }
  }

  // Verificar conexión con cada API de cursos habilitada
  for (const api of API_CONFIG.COURSES_APIS) {
    if (!api.enabled || !api.url) {
      status.courses.push({
        name: api.name,
        connected: false,
        error: 'No habilitada o sin URL',
      });
      continue;
    }

    try {
      const response = await fetch(`${api.url}?limit=1`, {
        method: 'GET',
        headers: getHeaders(api.apiKey),
      });
      status.courses.push({
        name: api.name,
        connected: response.ok,
        error: response.ok ? null : `HTTP ${response.status}`,
      });
    } catch (error) {
      status.courses.push({
        name: api.name,
        connected: false,
        error: error.message,
      });
    }
  }

  return status;
};

// Exportar configuración para uso en otros componentes
export { API_CONFIG };
