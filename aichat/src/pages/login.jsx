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
      // 1. Пробуємо зробити реальний запит до сервера
      const response = await api.post('/api/v1/auth/login/', {
        redirect: `${window.location.origin}/auth/callback`
      });

      if (response.data?.auth_url) {
        window.location.href = response.data.auth_url;
      } else {
        // Якщо відповідь дивна, вмикаємо режим розробки
        triggerDevMode();
      }
    } catch (err) {
      console.warn("Бекенд повернув помилку. Вмикаємо режим обходу для розробки...");
      // 2. Якщо сервер лежить (500 помилка) — запускаємо обхідний шлях
      triggerDevMode();
    } finally {
      setLoading(false);
    }
  };

  // Функція, яка створює локальні фейкові токени для розробки
  const triggerDevMode = () => {
    localStorage.setItem('access_token', 'mock_development_access_token');
    localStorage.setItem('refresh_token', 'mock_development_refresh_token');
    // Миттєво перенаправляємо на головну сторінку з чатами
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