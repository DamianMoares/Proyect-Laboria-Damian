import React from 'react';
import { Link } from 'react-router-dom';
import './JobCard.css';

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <div className="job-card-header">
        <Link to={`/empleos/${job.id}`} className="job-title">
          {job.title}
        </Link>
        <span className="company-name">{job.company}</span>
      </div>
      
      <div className="job-card-body">
        <div className="job-info">
          <span className="info-item">
            <strong>Ubicación:</strong> {job.location}
          </span>
          <span className="info-item">
            <strong>Modalidad:</strong> {job.workMode}
          </span>
          <span className="info-item">
            <strong>Jornada:</strong> {job.schedule}
          </span>
          <span className="info-item">
            <strong>Nivel:</strong> {job.experienceLevel}
          </span>
          <span className="info-item">
            <strong>Salario:</strong> {job.salary}
          </span>
          <span className="info-item">
            <strong>Contrato:</strong> {job.contractType}
          </span>
        </div>
        
        <p className="job-description">{job.description}</p>
        
        <div className="job-tags">
          <span className="tag sector">{job.sector}</span>
          <span className="tag technology">{job.technology}</span>
        </div>
      </div>
      
      <div className="job-card-footer">
        <span className="posted-date">Publicado: {job.postedDate}</span>
        <Link to={`/empleos/${job.id}`} className="btn-apply">
          Ver detalles
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
