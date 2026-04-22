import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }

    const result = login(email, password);
    
    if (result.success) {
      // Redirect based on role
      if (result.user.role === 'candidate') {
        navigate('/perfil/candidato');
      } else {
        navigate('/perfil/empresa');
      }
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-page login-page">
      <div className="container">
        <div className="auth-card">
          <header className="auth-header">
            <img src={logoNegro} alt="Laboria-V2" className="auth-logo" />
            <h1>Iniciar Sesión</h1>
            <p className="auth-subtitle">Accede a tu cuenta de Laboria-V2</p>
          </header>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <div className="auth-error">{error}</div>}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              Iniciar Sesión
            </button>
          </form>

          <div className="auth-footer">
            <p>¿No tienes cuenta? <Link to="/registro" className="auth-link">Regístrate</Link></p>
            <p><Link to="/" className="auth-link">Volver al inicio</Link></p>
          </div>

          <div className="demo-accounts">
            <h3>Cuentas de demo</h3>
            <div className="demo-account">
              <strong>Candidato:</strong> candidato@test.com / password123
            </div>
            <div className="demo-account">
              <strong>Empresa (empleados):</strong> empresa@test.com / password123
            </div>
            <div className="demo-account">
              <strong>Empresa (estudiantes):</strong> empresa-estudiantes@test.com / password123
            </div>
            <div className="demo-account">
              <strong>Empresa (híbrida):</strong> empresa-hibrida@test.com / password123
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
