import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import logoNegro from '../../assets/img/Laboria_Fondo_Negro.png';

const Home = () => {
  return (
    <div className="home-page">
      <header className="hero">
        <div className="hero-content">
          <img src={logoNegro} alt="Logo Laboria" className="hero-logo" />
          
          <p className="hero-subtitle">
            Tu portal de empleo y formación profesional en España
          </p>
          <p className="hero-description">
            Encuentra tu próximo trabajo o mejora tus habilidades con los mejores cursos del mercado.
          </p>
          <div className="hero-actions">
            <Link to="/empleos" className="btn btn-primary btn-large">
              Buscar Empleo
            </Link>
            <Link to="/cursos" className="btn btn-secondary btn-large">
              Buscar Cursos
            </Link>
          </div>
        </div>
      </header>

      <section className="features">
        <div className="container">
          <h2 className="section-title">¿Por qué Laboria?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3>Empleo</h3>
              <p>
                Miles de ofertas de trabajo en España. Filtra por ubicación, modalidad, salario y más.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Formación</h3>
              <p>
                Cursos, bootcamps y certificaciones para mejorar tu perfil profesional.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Enfoque Profesional</h3>
              <p>
                Conectamos oportunidades laborales con formación relevante para tu carrera.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">1500+</span>
              <span className="stat-label">Ofertas de empleo</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">1850+</span>
              <span className="stat-label">Cursos disponibles</span>
            </div>
            {/* <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">En español</span>
            </div> */}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2 className="cta-title">¿Listo para dar el siguiente paso?</h2>
          <p className="cta-subtitle">
            Comienza tu búsqueda de empleo o encuentra el curso perfecto para ti.
          </p>
          <div className="cta-actions">
            <Link to="/empleos" className="btn btn-primary">
              Ver Ofertas de Empleo
            </Link>
            <Link to="/cursos" className="btn btn-secondary">
              Explorar Cursos
            </Link>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <div className="container">
          <p>&copy; 2024 Laboria . Todos los derechos reservados.</p>
          <div className="footer-links">
            <Link to="/acerca-de">Acerca de</Link>
            <Link to="/faq">FAQ</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
