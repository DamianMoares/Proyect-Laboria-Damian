# Implementación de Funcionalidades Completas por Rol

## Problema Detectado

Aunque se había implementado el sistema de autenticación con múltiples roles, cada rol carecía de funcionalidades específicas:
- **Candidatos**: No podían aplicar a ofertas ni guardar cursos.
- **Empresas (empleados)**: No podían publicar ni gestionar ofertas de empleo.
- **Empresas (estudiantes)**: No podían publicar ni gestionar cursos.
- **Empresas (híbridas)**: No tenían acceso a ninguna funcionalidad de gestión.
- **Todos los roles**: No tenían un dashboard centralizado para acceder a sus funcionalidades.

## Solución Implementada

Se ha implementado el sistema completo de funcionalidades para cada rol, siguiendo el patrón de las páginas existentes:

### Para Candidatos
- **Dashboard**: Acceso a búsqueda de empleo/cursos, aplicaciones y cursos guardados.
- **Aplicar a ofertas**: Funcionalidad en JobDetailPage con persistencia en localStorage.
- **Guardar cursos**: Funcionalidad en CourseDetailPage con persistencia en localStorage.
- **Mis Aplicaciones**: Página para ver y retirar aplicaciones a ofertas.
- **Cursos Guardados**: Página para ver y eliminar cursos guardados.

### Para Empresas (Empleados)
- **Dashboard**: Acceso a publicación y gestión de ofertas.
- **Publicar Oferta**: Formulario completo para crear ofertas de empleo.
- **Mis Ofertas**: Página para ver y eliminar ofertas publicadas.

### Para Empresas (Estudiantes)
- **Dashboard**: Acceso a publicación y gestión de cursos.
- **Publicar Curso**: Formulario completo para crear cursos.
- **Mis Cursos**: Página para ver y eliminar cursos publicados.

### Para Empresas (Híbridas)
- **Dashboard**: Acceso a todas las funcionalidades (ofertas y cursos).
- **Publicar Oferta/Curso**: Acceso a ambos formularios de publicación.
- **Mis Ofertas/Cursos**: Acceso a ambas páginas de gestión.

### General
- **Dashboard Unificado**: Página que adapta contenido según rol del usuario.
- **Navbar Dinámico**: Botón "Mi Perfil" redirige al dashboard.
- **Persistencia**: Datos guardados en localStorage.

## Archivos Modificados/Creados

### Nuevas Páginas
- `src/pages/DashboardPage.jsx` + `.css` - Dashboard unificado por rol con tarjetas de acceso.
- `src/pages/PostJobPage.jsx` - Formulario para publicar ofertas de empleo.
- `src/pages/MyJobsPage.jsx` - Gestión de ofertas publicadas por la empresa.
- `src/pages/PostCoursePage.jsx` - Formulario para publicar cursos.
- `src/pages/MyCoursesPage.jsx` - Gestión de cursos publicados por la empresa.
- `src/pages/MyApplicationsPage.jsx` - Vista de aplicaciones del candidato.
- `src/pages/SavedCoursesPage.jsx` - Vista de cursos guardados del candidato.

### Archivos Compartidos
- `src/pages/FormPage.css` - Estilos compartidos para formularios de publicación.
- `src/pages/MyListingsPage.css` - Estilos compartidos para páginas de gestión.

### Páginas Actualizadas
- `src/pages/JobDetailPage.jsx` - Integración con AuthContext, funcionalidad de aplicar real.
- `src/pages/JobDetailPage.css` - Estilos para botón aplicado.
- `src/pages/CourseDetailPage.jsx` - Integración con AuthContext, funcionalidad de guardar real.
- `src/pages/CourseDetailPage.css` - Estilos para botón guardar.

### Configuración
- `src/App.jsx` - Importaciones de nuevas páginas, rutas actualizadas, navbar redirige a dashboard.

## Código Relevente

### DashboardPage.jsx (adaptación por rol)
```jsx
const DashboardPage = () => {
  const { isCandidate, isCompanyEmployees, isCompanyStudents, isCompanyHybrid } = useAuth();

  return (
    <div className="dashboard-page">
      {isCandidate() && (
        <div className="dashboard-section">
          <Link to="/empleos" className="dashboard-card">Buscar Empleo</Link>
          <Link to="/cursos" className="dashboard-card">Buscar Cursos</Link>
          <Link to="/mis-aplicaciones" className="dashboard-card">Mis Aplicaciones</Link>
          <Link to="/cursos-guardados" className="dashboard-card">Cursos Guardados</Link>
        </div>
      )}
      {isCompanyHybrid() && (
        <div className="dashboard-section">
          <Link to="/publicar-oferta" className="dashboard-card">Publicar Oferta</Link>
          <Link to="/mis-ofertas" className="dashboard-card">Mis Ofertas</Link>
          <Link to="/publicar-curso" className="dashboard-card">Publicar Curso</Link>
          <Link to="/mis-cursos" className="dashboard-card">Mis Cursos</Link>
        </div>
      )}
    </div>
  );
};
```

### JobDetailPage.jsx (funcionalidad de aplicar)
```jsx
const JobDetailPage = () => {
  const { user, isAuthenticated, isCandidate } = useAuth();
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    if (user && isCandidate()) {
      const savedApplications = JSON.parse(localStorage.getItem('user_applications') || '[]');
      const alreadyApplied = savedApplications.some(
        app => app.userId === user.id && app.jobId === parseInt(id)
      );
      setHasApplied(alreadyApplied);
    }
  }, [id, user, isCandidate]);

  const handleApply = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const savedApplications = JSON.parse(localStorage.getItem('user_applications') || '[]');
    const newApplication = {
      userId: user.id,
      jobId: job.id,
      applicationDate: new Date().toISOString().split('T')[0],
      status: 'pendiente'
    };
    
    savedApplications.push(newApplication);
    localStorage.setItem('user_applications', JSON.stringify(savedApplications));
    setHasApplied(true);
  };

  return (
    {hasApplied ? (
      <button className="btn-apply-sidebar applied" disabled>
        ✓ Ya has aplicado
      </button>
    ) : (
      <button className="btn-apply-sidebar" onClick={handleApply}>
        Aplicar a esta oferta
      </button>
    )}
  );
};
```

### CourseDetailPage.jsx (funcionalidad de guardar)
```jsx
const CourseDetailPage = () => {
  const { user, isAuthenticated, isCandidate } = useAuth();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (user && isCandidate()) {
      const savedCourses = JSON.parse(localStorage.getItem('user_saved_courses') || '[]');
      const alreadySaved = savedCourses.some(
        saved => saved.userId === user.id && saved.courseId === parseInt(id)
      );
      setIsSaved(alreadySaved);
    }
  }, [id, user, isCandidate]);

  const handleSave = () => {
    const savedCourses = JSON.parse(localStorage.getItem('user_saved_courses') || '[]');
    
    if (isSaved) {
      const updatedSavedCourses = savedCourses.filter(
        saved => !(saved.userId === user.id && saved.courseId === course.id)
      );
      localStorage.setItem('user_saved_courses', JSON.stringify(updatedSavedCourses));
      setIsSaved(false);
    } else {
      const newSavedCourse = {
        userId: user.id,
        courseId: course.id,
        savedDate: new Date().toISOString().split('T')[0]
      };
      savedCourses.push(newSavedCourse);
      localStorage.setItem('user_saved_courses', JSON.stringify(savedCourses));
      setIsSaved(true);
    }
  };

  return (
    {isCandidate() && (
      <button 
        className={`btn-save-sidebar ${isSaved ? 'saved' : ''}`}
        onClick={handleSave}
      >
        {isSaved ? '★ Guardado' : '☆ Guardar Curso'}
      </button>
    )}
  );
};
```

### PostJobPage.jsx (publicación de ofertas)
```jsx
const PostJobPage = () => {
  const { isCompanyEmployees, isCompanyHybrid } = useAuth();

  if (!user || (!isCompanyEmployees() && !isCompanyHybrid())) {
    return <div className="not-authorized">No autorizado</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newJob = {
      id: Date.now(),
      ...formData,
      company: user.profile.companyName,
      requirements: formData.requirements.split('\n').filter(r => r.trim()),
      benefits: formData.benefits.split('\n').filter(b => b.trim()),
      postedDate: new Date().toISOString().split('T')[0]
    };

    const postedJobs = JSON.parse(localStorage.getItem('posted_jobs') || '[]');
    postedJobs.push(newJob);
    localStorage.setItem('posted_jobs', JSON.stringify(postedJobs));
    
    navigate('/mis-ofertas');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Título del puesto" required />
      <select name="workMode">
        <option value="presencial">Presencial</option>
        <option value="remoto">Remoto</option>
        <option value="híbrido">Híbrido</option>
      </select>
      <textarea name="description" placeholder="Descripción..." required />
      <button type="submit">Publicar Oferta</button>
    </form>
  );
};
```

### MyJobsPage.jsx (gestión de ofertas)
```jsx
const MyJobsPage = () => {
  const { isCompanyEmployees, isCompanyHybrid } = useAuth();
  const [postedJobs, setPostedJobs] = useState([]);

  useEffect(() => {
    const localStorageJobs = JSON.parse(localStorage.getItem('posted_jobs') || '[]');
    const companyJobs = localStorageJobs.filter(job => job.company === user.profile.companyName);
    setPostedJobs([...jobsFromProfile, ...companyJobs]);
  }, [user]);

  const handleDelete = (jobId) => {
    const updatedJobs = postedJobs.filter(job => job.id !== jobId);
    setPostedJobs(updatedJobs);
    
    const localStorageJobs = JSON.parse(localStorage.getItem('posted_jobs') || '[]');
    const updatedLocalStorageJobs = localStorageJobs.filter(job => job.id !== jobId);
    localStorage.setItem('posted_jobs', JSON.stringify(updatedLocalStorageJobs));
  };

  return (
    <div className="listings-grid">
      {postedJobs.map(job => (
        <div key={job.id} className="listing-card">
          <h3>{job.title}</h3>
          <div className="listing-info">
            <span>Ubicación: {job.location}</span>
            <span>Salario: {job.salary}</span>
          </div>
          <button onClick={() => handleDelete(job.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};
```

### App.jsx (rutas actualizadas)
```jsx
<Routes>
  <Route path="/dashboard" element={<DashboardPage />} />
  <Route path="/publicar-oferta" element={<PostJobPage />} />
  <Route path="/mis-ofertas" element={<MyJobsPage />} />
  <Route path="/publicar-curso" element={<PostCoursePage />} />
  <Route path="/mis-cursos" element={<MyCoursesPage />} />
  <Route path="/mis-aplicaciones" element={<MyApplicationsPage />} />
  <Route path="/cursos-guardados" element={<SavedCoursesPage />} />
</Routes>

// Navbar actualizado para redirigir a dashboard
const handleProfileClick = () => {
  navigate('/dashboard');
};
```

## Impacto de la Mejora

### UX
- **Dashboard centralizado**: Cada rol tiene un punto de acceso a todas sus funcionalidades.
- **Acciones intuitivas**: Botones de aplicar/guardar con feedback visual inmediato.
- **Gestión completa**: Empresas pueden publicar y eliminar sus ofertas/cursos.
- **Persistencia**: Datos se mantienen entre sesiones con localStorage.

### Mantenibilidad
- **Patrones consistentes**: Formularios y páginas de gestión siguen mismo patrón.
- **CSS compartido**: FormPage.css y MyListingsPage.css reutilizados.
- **Componentes modulares**: Cada funcionalidad en su propio archivo.
- **Validación de roles**: Cada página verifica permisos del usuario.

### Escalabilidad
- **Dashboard extensible**: Fácil añadir nuevas funcionalidades por rol.
- **LocalStorage preparado**: Estructura lista para migración a API real.
- **Sistema de aplicaciones**: Preparado para añadir estados (aceptada/rechazada).
- **Multi-rol híbrido**: Empresas híbridas acceden a todas las funcionalidades.

### Funcionalidad por Rol
- **Candidato**: Buscar empleo, buscar cursos, aplicar a ofertas, guardar cursos.
- **Empresa (empleados)**: Publicar ofertas, gestionar ofertas, ver ofertas.
- **Empresa (estudiantes)**: Publicar cursos, gestionar cursos, ver cursos.
- **Empresa (híbrida)**: Todas las funcionalidades anteriores.

## Próximos Pasos Sugeridos

1. Implementar edición de ofertas/cursos publicados.
2. Añadir sistema de notificaciones para empresas (nuevas aplicaciones).
3. Implementar búsqueda y filtrado en Mis Ofertas/Mis Cursos.
4. Añadir paginación en listados de gestión.
5. Implementar ProtectedRoute component para rutas protegidas.
6. Añadir validación de formularios más robusta.
7. Integrar con backend real para persistencia de datos.
8. Añadir estadísticas reales (vistas, aplicaciones, estudiantes).
9. Implementar sistema de mensajes entre candidatos y empresas.
10. Añadir exportación de datos (CSV, PDF).
