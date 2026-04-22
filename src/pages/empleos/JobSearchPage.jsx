import React, { useState, useEffect } from 'react';
import jobsData from '../../data/jobs.json';
import JobCard from '../../components/jobs/JobCard';
import './JobSearchPage.css';

const JobSearchPage = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState('');

  useEffect(() => {
    setJobs(jobsData);
  }, []);

  const locations = [...new Set(jobsData.map(job => job.location))];
  const schedules = [...new Set(jobsData.map(job => job.schedule))];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.technology.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = selectedLocation === '' || job.location === selectedLocation;
    const matchesSchedule = selectedSchedule === '' || job.schedule === selectedSchedule;

    return matchesSearch && matchesLocation && matchesSchedule;
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleScheduleChange = (e) => {
    setSelectedSchedule(e.target.value);
  };

  const handleApply = (jobId) => {
    alert(`Aplicando a la oferta ${jobId} (simulado - sin backend real)`);
  };

  return (
    <div className="job-search-page">
      <div className="search-header">
        <h1>Búsqueda de Empleo</h1>
        <p className="subtitle">Encuentra tu próxima oportunidad profesional</p>
      </div>

      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar por puesto, empresa o tecnología..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
            aria-label="Buscar empleos"
          />
        </div>

        <div className="filters-sidebar">
          <h3>Filtros</h3>
          
          <div className="filter-group">
            <label htmlFor="location-filter">Ubicación:</label>
            <select
              id="location-filter"
              value={selectedLocation}
              onChange={handleLocationChange}
              className="filter-select"
            >
              <option value="">Todas las ubicaciones</option>
              {locations.map(location => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="schedule-filter">Jornada:</label>
            <select
              id="schedule-filter"
              value={selectedSchedule}
              onChange={handleScheduleChange}
              className="filter-select"
            >
              <option value="">Todas las jornadas</option>
              {schedules.map(schedule => (
                <option key={schedule} value={schedule}>
                  {schedule}
                </option>
              ))}
            </select>
          </div>

          <button
            className="btn-clear-filters"
            onClick={() => {
              setSearchTerm('');
              setSelectedLocation('');
              setSelectedSchedule('');
            }}
          >
            Limpiar filtros
          </button>
        </div>

        <div className="results-container">
          <div className="results-header">
            <span className="results-count">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'oferta encontrada' : 'ofertas encontradas'}
            </span>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="jobs-list">
              {filteredJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No se encontraron ofertas con los filtros seleccionados.</p>
              <p>Intenta ajustar tus criterios de búsqueda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSearchPage;
