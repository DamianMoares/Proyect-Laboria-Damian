import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './RegisterPage.css';
import logoNegro from '../../assets/img/Laboria_fondo_Negro.png';

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    // Candidato
    firstName: '',
    lastName: '',
    phone: '',
    location: '',
    bio: '',
    skills: '',
    experience: '',
    salaryExpectation: '',
    workModePreference: '',
    // Empresa
    companyName: '',
    industry: '',
    size: '',
    website: '',
    description: '',
    focus: ''
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
    setRole('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    const userData = {
      email: formData.email,
      password: formData.password,
      role: role,
      name: role === 'candidate' ? `${formData.firstName} ${formData.lastName}` : formData.companyName,
      profile: {}
    };

    if (role === 'candidate') {
      userData.profile = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        bio: formData.bio,
        skills: formData.skills.split(',').map(s => s.trim()),
        experience: formData.experience,
        salaryExpectation: formData.salaryExpectation,
        workModePreference: formData.workModePreference
      };
    } else {
      userData.profile = {
        companyName: formData.companyName,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        industry: formData.industry,
        size: formData.size,
        website: formData.website,
        description: formData.description,
        focus: role === 'company_hybrid' ? 'híbrido' : 
                role === 'company_employees' ? 'empleados' : 'estudiantes',
        postedJobs: [],
        postedCourses: []
      };
    }

    const result = register(userData);
    
    if (result.success) {
      navigate(role === 'candidate' ? '/perfil/candidato' : '/perfil/empresa');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-page register-page">
      <div className="container">
        <div className="auth-card">
          <header className="auth-header">
            <img src={logoNegro} alt="Laboria" className="auth-logo" />
            <h1>Registro</h1>
            <p className="auth-subtitle">Crea tu cuenta en Laboria</p>
          </header>

          {step === 1 && (
            <div className="role-selection">
              <h2>¿Qué tipo de cuenta necesitas?</h2>
              
              <div className="role-cards">
                <div 
                  className="role-card"
                  onClick={() => handleRoleSelect('candidate')}
                >
                  <div className="role-icon">👤</div>
                  <h3>Candidato</h3>
                  <p>Busco empleo y formación para mejorar mi perfil profesional</p>
                </div>

                <div 
                  className="role-card"
                  onClick={() => handleRoleSelect('company_employees')}
                >
                  <div className="role-icon">🏢</div>
                  <h3>Empresa (Empleados)</h3>
                  <p>Busco talento para cubrir vacantes en mi empresa</p>
                </div>

                <div 
                  className="role-card"
                  onClick={() => handleRoleSelect('company_students')}
                >
                  <div className="role-icon">🎓</div>
                  <h3>Empresa (Estudiantes)</h3>
                  <p>Busco estudiantes para programas de formación y becas</p>
                </div>

                <div 
                  className="role-card"
                  onClick={() => handleRoleSelect('company_hybrid')}
                >
                  <div className="role-icon">🔄</div>
                  <h3>Empresa (Híbrida)</h3>
                  <p>Busco tanto empleados como estudiantes para mi organización</p>
                </div>
              </div>

              <div className="auth-footer">
                <p>¿Ya tienes cuenta? <Link to="/login" className="auth-link">Inicia sesión</Link></p>
                <p><Link to="/" className="auth-link">Volver al inicio</Link></p>
              </div>
            </div>
          )}

          {step === 2 && (
            <form className="auth-form" onSubmit={handleSubmit}>
              {error && <div className="auth-error">{error}</div>}

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Mínimo 6 caracteres"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Repite tu contraseña"
                  required
                />
              </div>

              {role === 'candidate' ? (
                <>
                  <div className="form-group">
                    <label htmlFor="firstName">Nombre</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Tu nombre"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">Apellidos</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Tus apellidos"
                      required
                    />
                  </div>
                </>
              ) : (
                <div className="form-group">
                  <label htmlFor="companyName">Nombre de la Empresa</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Nombre de tu empresa"
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+34 600 000 000"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Ubicación</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Ciudad, País"
                  required
                />
              </div>

              {role === 'candidate' && (
                <>
                  <div className="form-group">
                    <label htmlFor="bio">Biografía</label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      placeholder="Cuéntanos sobre ti..."
                      rows="3"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="skills">Skills (separados por coma)</label>
                    <input
                      type="text"
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      placeholder="React, JavaScript, CSS..."
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="experience">Experiencia</label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Selecciona tu experiencia</option>
                      <option value="0-1 años">0-1 años</option>
                      <option value="1-3 años">1-3 años</option>
                      <option value="3-5 años">3-5 años</option>
                      <option value="5-10 años">5-10 años</option>
                      <option value="10+ años">10+ años</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="salaryExpectation">Expectativa salarial</label>
                    <input
                      type="text"
                      id="salaryExpectation"
                      name="salaryExpectation"
                      value={formData.salaryExpectation}
                      onChange={handleInputChange}
                      placeholder="30000-40000€"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="workModePreference">Preferencia de trabajo</label>
                    <select
                      id="workModePreference"
                      name="workModePreference"
                      value={formData.workModePreference}
                      onChange={handleInputChange}
                    >
                      <option value="">Selecciona preferencia</option>
                      <option value="presencial">Presencial</option>
                      <option value="remoto">Remoto</option>
                      <option value="híbrido">Híbrido</option>
                    </select>
                  </div>
                </>
              )}

              {role !== 'candidate' && (
                <>
                  <div className="form-group">
                    <label htmlFor="industry">Industria</label>
                    <input
                      type="text"
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      placeholder="Tecnología, Educación, Salud..."
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="size">Tamaño de la empresa</label>
                    <select
                      id="size"
                      name="size"
                      value={formData.size}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Selecciona tamaño</option>
                      <option value="1-10 empleados">1-10 empleados</option>
                      <option value="10-50 empleados">10-50 empleados</option>
                      <option value="50-200 empleados">50-200 empleados</option>
                      <option value="200-500 empleados">200-500 empleados</option>
                      <option value="500+ empleados">500+ empleados</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="website">Sitio web</label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://tuempresa.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Descripción</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe tu empresa..."
                      rows="3"
                      required
                    />
                  </div>
                </>
              )}

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={handleBack}>
                  Atrás
                </button>
                <button type="submit" className="btn btn-primary">
                  Registrarse
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
