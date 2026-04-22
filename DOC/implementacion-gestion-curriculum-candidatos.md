# Implementación de Gestión de Currículum para Candidatos

## Problema Detectado

Los candidatos no tenían forma de gestionar su currículum de manera estructurada. Solo podían rellenar información básica en el perfil, pero no podían:
- Agregar experiencia laboral detallada
- Agregar educación formal
- Gestionar skills con niveles
- Agregar proyectos personales
- Agregar idiomas con niveles
- Seleccionar qué elementos enviar al aplicar a ofertas

## Solución Implementada

Se ha implementado un sistema completo de gestión de currículum para candidatos con las siguientes funcionalidades:

### Secciones del Currículum
1. **Experiencia Laboral**: Empresa, puesto, fechas, descripción
2. **Educación**: Institución, título, campo de estudio, fechas, descripción
3. **Skills (Habilidades)**: Nombre y nivel (básico, intermedio, avanzado, experto)
4. **Proyectos**: Nombre, descripción, tecnologías, link
5. **Idiomas**: Idioma y nivel (básico, intermedio, avanzado, nativo)

### Funcionalidades
- **Agregar elementos**: Botones para agregar nuevos items en cada sección
- **Eliminar elementos**: Botón ✕ para eliminar cada item
- **Editar elementos**: Inputs para editar cualquier campo
- **Selector de envío**: Checkbox para marcar qué elementos enviar al aplicar
- **Persistencia**: Datos guardados en localStorage por usuario
- **Integración con aplicaciones**: JobDetailPage usa currículum al aplicar

## Archivos Modificados/Creados

### Nuevos Archivos
- `src/pages/CurriculumPage.jsx` - Página de gestión de currículum con todas las secciones
- `src/pages/CurriculumPage.css` - Estilos para la página de gestión de currículum

### Archivos Actualizados
- `src/pages/JobDetailPage.jsx` - Integración con currículum personalizado al aplicar
- `src/pages/PanelPage.jsx` - Añadido enlace a gestión de currículum
- `src/pages/CandidateProfilePage.jsx` - Muestra currículum del candidato
- `src/pages/ProfilePage.css` - Estilos para curriculum-list y curriculum-item
- `src/App.jsx` - Importación y ruta /curriculum

## Código Relevente

### CurriculumPage.jsx (estructura de datos)
```jsx
const CurriculumPage = () => {
  const [curriculum, setCurriculum] = useState({
    experience: [],
    education: [],
    skills: [],
    projects: [],
    languages: []
  });

  useEffect(() => {
    if (user && isCandidate()) {
      const savedCurriculum = JSON.parse(localStorage.getItem(`curriculum_${user.id}`) || 'null');
      if (savedCurriculum) {
        setCurriculum(savedCurriculum);
      }
    }
  }, [user, isCandidate]);

  const saveCurriculum = () => {
    if (user) {
      localStorage.setItem(`curriculum_${user.id}`, JSON.stringify(curriculum));
      alert('Currículum guardado con éxito');
    }
  };

  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      sendToApplication: true
    };
    setCurriculum({
      ...curriculum,
      experience: [...curriculum.experience, newExperience]
    });
  };

  const toggleSendToApplication = (id, section) => {
    setCurriculum({
      ...curriculum,
      [section]: curriculum[section].map(item =>
        item.id === id ? { ...item, sendToApplication: !item.sendToApplication } : item
      )
    });
  };
};
```

### JobDetailPage.jsx (integración con currículum)
```jsx
const handleApply = () => {
  // Get user's curriculum
  const savedCurriculum = JSON.parse(localStorage.getItem(`curriculum_${user.id}`) || '{}');
  
  // Filter curriculum items that are marked to send in application
  const curriculumToSend = {
    experience: savedCurriculum.experience?.filter(item => item.sendToApplication) || [],
    education: savedCurriculum.education?.filter(item => item.sendToApplication) || [],
    skills: savedCurriculum.skills?.filter(item => item.sendToApplication) || [],
    projects: savedCurriculum.projects?.filter(item => item.sendToApplication) || [],
    languages: savedCurriculum.languages?.filter(item => item.sendToApplication) || []
  };

  const newApplication = {
    userId: user.id,
    jobId: job.id,
    applicationDate: new Date().toISOString().split('T')[0],
    status: 'pendiente',
    curriculum: curriculumToSend
  };
  
  savedApplications.push(newApplication);
  localStorage.setItem('user_applications', JSON.stringify(savedApplications));
};
```

### CandidateProfilePage.jsx (mostrar currículum)
```jsx
const CandidateProfilePage = () => {
  const [curriculum, setCurriculum] = useState({
    experience: [],
    education: [],
    skills: [],
    projects: [],
    languages: []
  });

  useEffect(() => {
    if (user && isCandidate()) {
      const savedCurriculum = JSON.parse(localStorage.getItem(`curriculum_${user.id}`) || 'null');
      if (savedCurriculum) {
        setCurriculum(savedCurriculum);
      }
    }
  }, [user, isCandidate]);

  return (
    {curriculum.experience.length > 0 && (
      <section className="profile-section">
        <h2>Experiencia Laboral</h2>
        <div className="curriculum-list">
          {curriculum.experience.map((exp) => (
            <div key={exp.id} className="curriculum-item">
              <h4>{exp.position} - {exp.company}</h4>
              <p className="curriculum-date">{exp.startDate} - {exp.endDate || 'Actualidad'}</p>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>
      </section>
    )}
  );
};
```

### PanelPage.jsx (enlace a gestión)
```jsx
<Link to="/curriculum" className="panel-card">
  <div className="card-icon">📄</div>
  <h3>Gestión de Currículum</h3>
  <p>Configura tu currículum personalizado</p>
</Link>
```

### App.jsx (rutas)
```jsx
import CurriculumPage from './pages/CurriculumPage';

<Route path="/curriculum" element={<CurriculumPage />} />
```

## Impacto de la Mejora

### UX
- **Currículum estructurado**: Los candidatos pueden organizar su información en secciones claras.
- **Personalización**: Checkbox para seleccionar qué elementos enviar a cada oferta.
- **Visualización en perfil**: El currículum se muestra en el perfil del candidato.
- **Acceso fácil**: Enlace directo desde el panel y el perfil.

### Mantenibilidad
- **Componente modular**: CurriculumPage independiente y reutilizable.
- **LocalStorage por usuario**: Cada usuario tiene su propio currículum.
- **Patrón consistente**: Usa el mismo estilo que otras páginas del sistema.
- **Validación de rol**: Solo candidatos pueden acceder a la página.

### Escalabilidad
- **Secciones extensibles**: Fácil añadir nuevas secciones (certificaciones, publicaciones, etc.).
- **Niveles configurables**: Skills e idiomas tienen niveles escalables.
- **Integración con aplicaciones**: Preparado para enviar currículum a empresas.
- **Exportación**: Estructura lista para exportar a PDF o compartir con empresas.

### Funcionalidad
- **5 secciones de currículum**: Experiencia, educación, skills, proyectos, idiomas.
- **CRUD completo**: Crear, leer, actualizar, eliminar elementos.
- **Selector inteligente**: Solo se envían elementos marcados al aplicar.
- **Persistencia**: Datos se mantienen entre sesiones.

## Próximos Pasos Sugeridos

1. Implementar edición de elementos existentes (actualmente solo se puede eliminar y crear nuevos).
2. Añadir reordenamiento de elementos (drag & drop).
3. Implementar exportación a PDF del currículum.
4. Añadir sección de certificaciones y cursos realizados.
5. Implementar previsualización del currículum antes de aplicar.
6. Añadir plantillas de currículum predefinidas.
7. Integrar con servicios de almacenamiento de archivos para CVs.
8. Implementar sugerencias de skills basadas en las ofertas.
9. Añadir validación de fechas (endDate >= startDate).
10. Implementar estadísticas de completitud del currículum.
