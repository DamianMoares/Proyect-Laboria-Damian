import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import TabsNavigation from './components/navigation/TabsNavigation';
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
import logoBlanco from './assets/img/Laboria_fondo_Negro.png';
import './App.css';

function Navbar() {
  const { user, isAuthenticated, logout, isCandidate, isAnyCompany } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/panel');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logoBlanco} alt="Laboria " className="navbar-logo-img" />
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Inicio
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/empleos" className="navbar-link">
              Empleos
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/cursos" className="navbar-link">
              Cursos
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/acerca-de" className="navbar-link">
              Acerca de
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/faq" className="navbar-link">
              FAQ
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li className="navbar-item">
                <button onClick={handleProfileClick} className="navbar-link profile-button">
                  Mi Perfil
                </button>
              </li>
              <li className="navbar-item">
                <button onClick={handleLogout} className="navbar-link logout-button">
                  Cerrar Sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/login" className="navbar-link login-button">
                  Iniciar Sesión
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/registro" className="navbar-link register-button">
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
              <p>&copy; 2024 Laboria . Todos los derechos reservados.</p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
