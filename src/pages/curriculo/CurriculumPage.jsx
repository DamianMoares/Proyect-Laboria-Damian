import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './CurriculumPage.css';

const CurriculumPage = () => {
  const { user, isCandidate } = useAuth();
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

  const updateExperience = (id, field, value) => {
    setCurriculum({
      ...curriculum,
      experience: curriculum.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const removeExperience = (id) => {
    setCurriculum({
      ...curriculum,
      experience: curriculum.experience.filter(exp => exp.id !== id)
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

  const addEducation = () => {
    const newEducation = {
      id: Date.now(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: '',
      sendToApplication: true
    };
    setCurriculum({
      ...curriculum,
      education: [...curriculum.education, newEducation]
    });
  };

  const updateEducation = (id, field, value) => {
    setCurriculum({
      ...curriculum,
      education: curriculum.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  const removeEducation = (id) => {
    setCurriculum({
      ...curriculum,
      education: curriculum.education.filter(edu => edu.id !== id)
    });
  };

  const addSkill = () => {
    const newSkill = {
      id: Date.now(),
      name: '',
      level: 'intermedio',
      sendToApplication: true
    };
    setCurriculum({
      ...curriculum,
      skills: [...curriculum.skills, newSkill]
    });
  };

  const updateSkill = (id, field, value) => {
    setCurriculum({
      ...curriculum,
      skills: curriculum.skills.map(skill => 
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    });
  };

  const removeSkill = (id) => {
    setCurriculum({
      ...curriculum,
      skills: curriculum.skills.filter(skill => skill.id !== id)
    });
  };

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      name: '',
      description: '',
      technologies: '',
      link: '',
      sendToApplication: true
    };
    setCurriculum({
      ...curriculum,
      projects: [...curriculum.projects, newProject]
    });
  };

  const updateProject = (id, field, value) => {
    setCurriculum({
      ...curriculum,
      projects: curriculum.projects.map(proj => 
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    });
  };

  const removeProject = (id) => {
    setCurriculum({
      ...curriculum,
      projects: curriculum.projects.filter(proj => proj.id !== id)
    });
  };

  const addLanguage = () => {
    const newLanguage = {
      id: Date.now(),
      language: '',
      level: 'intermedio',
      sendToApplication: true
    };
    setCurriculum({
      ...curriculum,
      languages: [...curriculum.languages, newLanguage]
    });
  };

  const updateLanguage = (id, field, value) => {
    setCurriculum({
      ...curriculum,
      languages: curriculum.languages.map(lang => 
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    });
  };

  const removeLanguage = (id) => {
    setCurriculum({
      ...curriculum,
      languages: curriculum.languages.filter(lang => lang.id !== id)
    });
  };

  if (!user || !isCandidate()) {
    return (
      <div className="curriculum-page not-authorized">
        <div className="container">
          <h1>No autorizado</h1>
          <p>Esta página es solo para candidatos.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="curriculum-page">
      <div className="container">
        <header className="curriculum-header">
          <h1>Gestión de Currículum</h1>
          <p className="curriculum-subtitle">
            Agrega y gestiona los elementos de tu currículum. Marca los elementos que quieres enviar al aplicar a ofertas.
          </p>
          <button className="btn btn-primary" onClick={saveCurriculum}>
            Guardar Currículum
          </button>
        </header>

        <div className="curriculum-content">
          {/* Experiencia Laboral */}
          <section className="curriculum-section">
            <div className="section-header">
              <h2>Experiencia Laboral</h2>
              <button className="btn btn-secondary" onClick={addExperience}>
                + Agregar Experiencia
              </button>
            </div>
            {curriculum.experience.map((exp) => (
              <div key={exp.id} className="curriculum-item">
                <div className="item-header">
                  <input
                    type="checkbox"
                    checked={exp.sendToApplication}
                    onChange={() => toggleSendToApplication(exp.id, 'experience')}
                    className="send-checkbox"
                    title="Enviar en aplicación"
                  />
                  <button className="btn-remove" onClick={() => removeExperience(exp.id)}>
                    ✕
                  </button>
                </div>
                <div className="item-content">
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Empresa"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Puesto"
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                    />
                  </div>
                  <div className="form-row">
                    <input
                      type="date"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    />
                    <input
                      type="date"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    />
                  </div>
                  <textarea
                    placeholder="Descripción del puesto..."
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    rows="3"
                  />
                </div>
              </div>
            ))}
            {curriculum.experience.length === 0 && (
              <p className="empty-message">No hay experiencia agregada. Agrega tu primera experiencia laboral.</p>
            )}
          </section>

          {/* Educación */}
          <section className="curriculum-section">
            <div className="section-header">
              <h2>Educación</h2>
              <button className="btn btn-secondary" onClick={addEducation}>
                + Agregar Educación
              </button>
            </div>
            {curriculum.education.map((edu) => (
              <div key={edu.id} className="curriculum-item">
                <div className="item-header">
                  <input
                    type="checkbox"
                    checked={edu.sendToApplication}
                    onChange={() => toggleSendToApplication(edu.id, 'education')}
                    className="send-checkbox"
                    title="Enviar en aplicación"
                  />
                  <button className="btn-remove" onClick={() => removeEducation(edu.id)}>
                    ✕
                  </button>
                </div>
                <div className="item-content">
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Institución"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Título"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    />
                  </div>
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Campo de estudio"
                      value={edu.field}
                      onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                    />
                    <input
                      type="date"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                    />
                    <input
                      type="date"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                    />
                  </div>
                  <textarea
                    placeholder="Descripción..."
                    value={edu.description}
                    onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                    rows="2"
                  />
                </div>
              </div>
            ))}
            {curriculum.education.length === 0 && (
              <p className="empty-message">No hay educación agregada. Agrega tu educación formal.</p>
            )}
          </section>

          {/* Skills */}
          <section className="curriculum-section">
            <div className="section-header">
              <h2>Habilidades (Skills)</h2>
              <button className="btn btn-secondary" onClick={addSkill}>
                + Agregar Skill
              </button>
            </div>
            {curriculum.skills.map((skill) => (
              <div key={skill.id} className="curriculum-item skill-item">
                <div className="item-header">
                  <input
                    type="checkbox"
                    checked={skill.sendToApplication}
                    onChange={() => toggleSendToApplication(skill.id, 'skills')}
                    className="send-checkbox"
                    title="Enviar en aplicación"
                  />
                  <button className="btn-remove" onClick={() => removeSkill(skill.id)}>
                    ✕
                  </button>
                </div>
                <div className="item-content">
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Skill (ej: React, Python, JavaScript)"
                      value={skill.name}
                      onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                    />
                    <select
                      value={skill.level}
                      onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                    >
                      <option value="básico">Básico</option>
                      <option value="intermedio">Intermedio</option>
                      <option value="avanzado">Avanzado</option>
                      <option value="experto">Experto</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
            {curriculum.skills.length === 0 && (
              <p className="empty-message">No hay skills agregados. Agrega tus habilidades técnicas.</p>
            )}
          </section>

          {/* Proyectos */}
          <section className="curriculum-section">
            <div className="section-header">
              <h2>Proyectos</h2>
              <button className="btn btn-secondary" onClick={addProject}>
                + Agregar Proyecto
              </button>
            </div>
            {curriculum.projects.map((proj) => (
              <div key={proj.id} className="curriculum-item">
                <div className="item-header">
                  <input
                    type="checkbox"
                    checked={proj.sendToApplication}
                    onChange={() => toggleSendToApplication(proj.id, 'projects')}
                    className="send-checkbox"
                    title="Enviar en aplicación"
                  />
                  <button className="btn-remove" onClick={() => removeProject(proj.id)}>
                    ✕
                  </button>
                </div>
                <div className="item-content">
                  <input
                    type="text"
                    placeholder="Nombre del proyecto"
                    value={proj.name}
                    onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                  />
                  <textarea
                    placeholder="Descripción del proyecto..."
                    value={proj.description}
                    onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                    rows="2"
                  />
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Tecnologías (separadas por coma)"
                      value={proj.technologies}
                      onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)}
                    />
                    <input
                      type="url"
                      placeholder="Link al proyecto (opcional)"
                      value={proj.link}
                      onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
            {curriculum.projects.length === 0 && (
              <p className="empty-message">No hay proyectos agregados. Agrega tus proyectos personales.</p>
            )}
          </section>

          {/* Idiomas */}
          <section className="curriculum-section">
            <div className="section-header">
              <h2>Idiomas</h2>
              <button className="btn btn-secondary" onClick={addLanguage}>
                + Agregar Idioma
              </button>
            </div>
            {curriculum.languages.map((lang) => (
              <div key={lang.id} className="curriculum-item language-item">
                <div className="item-header">
                  <input
                    type="checkbox"
                    checked={lang.sendToApplication}
                    onChange={() => toggleSendToApplication(lang.id, 'languages')}
                    className="send-checkbox"
                    title="Enviar en aplicación"
                  />
                  <button className="btn-remove" onClick={() => removeLanguage(lang.id)}>
                    ✕
                  </button>
                </div>
                <div className="item-content">
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Idioma (ej: Inglés, Francés)"
                      value={lang.language}
                      onChange={(e) => updateLanguage(lang.id, 'language', e.target.value)}
                    />
                    <select
                      value={lang.level}
                      onChange={(e) => updateLanguage(lang.id, 'level', e.target.value)}
                    >
                      <option value="básico">Básico</option>
                      <option value="intermedio">Intermedio</option>
                      <option value="avanzado">Avanzado</option>
                      <option value="nativo">Nativo</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
            {curriculum.languages.length === 0 && (
              <p className="empty-message">No hay idiomas agregados. Agrega tus idiomas.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default CurriculumPage;
