import React, { useState } from 'react';
import api from '../services/api';
import './Login.css';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      // Запит до бекенду для отримання URL авторизації Microsoft
      const response = await api.post('/api/v1/auth/login/', {
        // Передаємо адресу, куди Microsoft має повернути користувача після успішного входу
        redirect: `${window.location.origin}/auth/callback`
      });

      if (response.data?.auth_url) {
        // Редірект на сторінку Microsoft
        window.location.href = response.data.auth_url;
      } else {
        setError('Не вдалося отримати посилання для входу.');
      }
    } catch (err) {
      console.error(err);
      setError('Сталася помилка при зєднанні з сервером.');
    } finally {
      setLoading(false);
    }
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
              {/* Проста іконка вікна Microsoft за допомогою SVG */}
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