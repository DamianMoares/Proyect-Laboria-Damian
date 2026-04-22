import React, { useState, useEffect } from 'react';
import coursesData from '../../data/courses.json';
import CourseCard from '../../components/courses/CourseCard';
import './CourseSearchPage.css';

const CourseSearchPage = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');
  const [selectedCertification, setSelectedCertification] = useState('');

  useEffect(() => {
    setCourses(coursesData);
  }, []);

  const levels = [...new Set(coursesData.map(course => course.level))];
  const formats = [...new Set(coursesData.map(course => course.format))];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.technology.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLevel = selectedLevel === '' || course.level === selectedLevel;
    const matchesFormat = selectedFormat === '' || course.format === selectedFormat;
    const matchesCertification = selectedCertification === '' || 
      (selectedCertification === 'certified' && course.certification) ||
      (selectedCertification === 'non-certified' && !course.certification);

    return matchesSearch && matchesLevel && matchesFormat && matchesCertification;
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
  };

  const handleFormatChange = (e) => {
    setSelectedFormat(e.target.value);
  };

  const handleCertificationChange = (e) => {
    setSelectedCertification(e.target.value);
  };

  return (
    <div className="course-search-page">
      <div className="search-header">
        <h1>Búsqueda de Cursos</h1>
        <p className="subtitle">Mejora tus habilidades con formación profesional</p>
      </div>

      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar por curso, plataforma o tecnología..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
            aria-label="Buscar cursos"
          />
        </div>

        <div className="filters-sidebar">
          <h3>Filtros</h3>
          
          <div className="filter-group">
            <label htmlFor="level-filter">Nivel:</label>
            <select
              id="level-filter"
              value={selectedLevel}
              onChange={handleLevelChange}
              className="filter-select"
            >
              <option value="">Todos los niveles</option>
              {levels.map(level => (
                <option key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="format-filter">Formato:</label>
            <select
              id="format-filter"
              value={selectedFormat}
              onChange={handleFormatChange}
              className="filter-select"
            >
              <option value="">Todos los formatos</option>
              {formats.map(format => (
                <option key={format} value={format}>
                  {format.charAt(0).toUpperCase() + format.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="certification-filter">Certificación:</label>
            <select
              id="certification-filter"
              value={selectedCertification}
              onChange={handleCertificationChange}
              className="filter-select"
            >
              <option value="">Todos</option>
              <option value="certified">Con certificación</option>
              <option value="non-certified">Sin certificación</option>
            </select>
          </div>

          <button
            className="btn-clear-filters"
            onClick={() => {
              setSearchTerm('');
              setSelectedLevel('');
              setSelectedFormat('');
              setSelectedCertification('');
            }}
          >
            Limpiar filtros
          </button>
        </div>

        <div className="results-container">
          <div className="results-header">
            <span className="results-count">
              {filteredCourses.length} {filteredCourses.length === 1 ? 'curso encontrado' : 'cursos encontrados'}
            </span>
          </div>

          {filteredCourses.length > 0 ? (
            <div className="courses-list">
              {filteredCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No se encontraron cursos con los filtros seleccionados.</p>
              <p>Intenta ajustar tus criterios de búsqueda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseSearchPage;
