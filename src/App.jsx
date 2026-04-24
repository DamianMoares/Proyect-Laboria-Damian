import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import TabsNavigation from './components/navigation/TabsNavigation';
import CookieConsent from './components/CookieConsent';
import Home from './pages/inicio/Home';
import JobSearchPage from './pages/empleos/JobSearchPage';
import CourseSearchPage from './pages/cursos/CourseSearchPage';
import JobDetailPage from './pages/empleos/JobDetailPage';
import CourseDetailPage from './pages/cursos/CourseDetailPage';
import AboutPage from './pages/informacion/AboutPage';
import FAQPage from './pages/informacion/FAQPage';
import LoginPage from './pages/autenticacion/LoginPage';
import RegisterPage from './pages/autenticacion/RegisterPage';
import CandidateProfilePage from './pages/perfiles/CandidateProfilePage';
import CompanyProfilePage from './pages/perfiles/CompanyProfilePage';
import DashboardPage from './pages/panel/DashboardPage';
import PostJobPage from './pages/empleos/PostJobPage';
import MyJobsPage from './pages/empleos/MyJobsPage';
import PostCoursePage from './pages/cursos/PostCoursePage';
import MyCoursesPage from './pages/cursos/MyCoursesPage';
import MyApplicationsPage from './pages/aplicaciones/MyApplicationsPage';
import SavedCoursesPage from './pages/cursos/SavedCoursesPage';
import CurriculumPage from './pages/curriculo/CurriculumPage';
import ApiStatusPage from './pages/admin/ApiStatusPage';
import logoBlanco from './assets/img/Laboria_Fondo_Negro.png';
import './App.css';

function Navbar() {
  const { user, isAuthenticated, logout, isCandidate, isAnyCompany } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/panel');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <img src={logoBlanco} alt="Laboria " className="navbar-logo-img" />
        </Link>
        <button 
          className="navbar-toggle" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        {mobileMenuOpen && (
          <div className="navbar-overlay" onClick={closeMobileMenu}></div>
        )}
        <ul className={`navbar-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <li className="navbar-item">
            <Link to="/" className="navbar-link" onClick={closeMobileMenu}>
              Inicio
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/empleos" className="navbar-link" onClick={closeMobileMenu}>
              Empleos
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/cursos" className="navbar-link" onClick={closeMobileMenu}>
              Cursos
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/acerca-de" className="navbar-link" onClick={closeMobileMenu}>
              Acerca de
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/faq" className="navbar-link" onClick={closeMobileMenu}>
              FAQ
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li className="navbar-item">
                <button onClick={() => { handleProfileClick(); closeMobileMenu(); }} className="navbar-link profile-button">
                  Mi Perfil
                </button>
              </li>
              <li className="navbar-item">
                <button onClick={() => { handleLogout(); closeMobileMenu(); }} className="navbar-link logout-button">
                  Cerrar Sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/login" className="navbar-link login-button" onClick={closeMobileMenu}>
                  Iniciar Sesión
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/registro" className="navbar-link register-button" onClick={closeMobileMenu}>
                  Registrarse
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="app">
          <Navbar />
          <TabsNavigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/empleos" element={<JobSearchPage />} />
              <Route path="/empleos/:id" element={<JobDetailPage />} />
              <Route path="/cursos" element={<CourseSearchPage />} />
              <Route path="/cursos/:id" element={<CourseDetailPage />} />
              <Route path="/acerca-de" element={<AboutPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registro" element={<RegisterPage />} />
              <Route path="/perfil/candidato" element={<CandidateProfilePage />} />
              <Route path="/perfil/empresa" element={<CompanyProfilePage />} />
              <Route path="/panel" element={<DashboardPage />} />
              <Route path="/publicar-oferta" element={<PostJobPage />} />
              <Route path="/mis-ofertas" element={<MyJobsPage />} />
              <Route path="/publicar-curso" element={<PostCoursePage />} />
              <Route path="/mis-cursos" element={<MyCoursesPage />} />
              <Route path="/mis-aplicaciones" element={<MyApplicationsPage />} />
              <Route path="/cursos-guardados" element={<SavedCoursesPage />} />
              <Route path="/curriculum" element={<CurriculumPage />} />
              <Route path="/admin/api-status" element={<ApiStatusPage />} />
            </Routes>
          </main>

          <footer className="app-footer">
            <div className="container">
              <div className="footer-content">
                <p>&copy; 2026 Laboria . Todos los derechos reservados.</p>
                <div className="footer-legal">
                  <a href="/legal/aviso-legal.html" target="_blank" rel="noopener noreferrer">Aviso Legal </a>
                  <span className="footer-separator">|</span>
                  <a href="/legal/politica-privacidad.html" target="_blank" rel="noopener noreferrer"> Política de Privacidad </a>
                  <span className="footer-separator">|</span>
                  <a href="/legal/terminos-condiciones.html" target="_blank" rel="noopener noreferrer"> Términos y Condiciones</a>
                </div>
              </div>
            </div>
          </footer>
          <CookieConsent />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
