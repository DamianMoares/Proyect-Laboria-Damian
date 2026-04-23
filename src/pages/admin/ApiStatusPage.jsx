import React, { useState, useEffect } from 'react';
import { checkApiConnection } from '../../context/ConexionApi';
import './ApiStatusPage.css';

const ApiStatusPage = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastChecked, setLastChecked] = useState(null);

  const handleCheck = async () => {
    setLoading(true);
    try {
      const result = await checkApiConnection();
      setStatus(result);
      setLastChecked(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error checking API status:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCheck();
  }, []);

  return (
    <div className="api-status-page">
      <div className="status-header">
        <h1>Estado de APIs</h1>
        <p className="subtitle">Verifica la conexión con las APIs externas</p>
        <button 
          className="btn-check" 
          onClick={handleCheck} 
          disabled={loading}
        >
          {loading ? 'Verificando...' : 'Verificar conexión'}
        </button>
        {lastChecked && (
          <span className="last-checked">Última verificación: {lastChecked}</span>
        )}
      </div>

      {status && (
        <div className="status-container">
          <section className="status-section">
            <h2>APIs de Empleo</h2>
            <div className="status-list">
              {status.jobs.map((api, index) => (
                <div key={index} className={`status-item ${api.connected ? 'connected' : 'disconnected'}`}>
                  <div className="status-info">
                    <span className="status-name">{api.name}</span>
                    <span className={`status-badge ${api.connected ? 'success' : 'error'}`}>
                      {api.connected ? '✓ Conectado' : '✗ Error'}
                    </span>
                  </div>
                  {api.error && <span className="status-error">{api.error}</span>}
                </div>
              ))}
            </div>
          </section>

          <section className="status-section">
            <h2>APIs de Cursos</h2>
            <div className="status-list">
              {status.courses.map((api, index) => (
                <div key={index} className={`status-item ${api.connected ? 'connected' : 'disconnected'}`}>
                  <div className="status-info">
                    <span className="status-name">{api.name}</span>
                    <span className={`status-badge ${api.connected ? 'success' : 'error'}`}>
                      {api.connected ? '✓ Conectado' : '✗ Error'}
                    </span>
                  </div>
                  {api.error && <span className="status-error">{api.error}</span>}
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {!status && !loading && (
        <div className="no-status">
          <p>Haz clic en "Verificar conexión" para comprobar el estado de las APIs.</p>
        </div>
      )}
    </div>
  );
};

export default ApiStatusPage;
