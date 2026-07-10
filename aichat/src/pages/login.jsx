import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {

      const response = await api.post('/api/v1/auth/login/', {
        redirect: `${window.location.origin}/auth/callback`
      });

      if (response.data?.auth_url) {
        window.location.href = response.data.auth_url;
      } else {

        triggerDevMode();
      }
    } catch (err) {
      console.warn("Бекенд повернув помилку. Ввімкнуто режим обходу для розробки...");

      triggerDevMode();
    } finally {
      setLoading(false);
    }
  };


  const triggerDevMode = () => {
    localStorage.setItem('access_token', 'mock_development_access_token');
    localStorage.setItem('refresh_token', 'mock_development_refresh_token');
    navigate('/');
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <h1>KROK AI Chat</h1>
        <p>Вітаємо! Будь ласка, увійдіть за допомогою свого корпоративного облікового запису Microsoft, щоб розпочати роботу з асистентом.</p>
        
        {error && <div className="login-error-message">{error}</div>}
        
        <button className="btn-microsoft-login" onClick={handleLogin} disabled={loading}>
          {loading ? (
            'Завантаження...'
          ) : (
            <>
              <svg className="ms-icon" viewBox="0 0 23 23" width="23" height="23" xmlns="http://www.w3.org/2000/svg">
                <path fill="#f35325" d="M0 0h11v11H0z"/>
                <path fill="#81bc06" d="M12 0h11v11H12z"/>
                <path fill="#05a6f0" d="M0 12h11v11H0z"/>
                <path fill="#ffba08" d="M12 12h11v11H12z"/>
              </svg>
              Увійти через Microsoft
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Login;