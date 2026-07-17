import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { chatService } from '../services/api';
import './Login.css';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await chatService.getLoginUrl();
      if (data?.auth_url) {
        window.location.href = data.auth_url;
      }
    } catch (err) {
      console.error(err);
      setError('Помилка з\'єднання з сервером. Зверніться до адміністратора (Помилка 500).');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <h1>KROK AI Chat</h1>
        <p>Вітаємо! Будь ласка, увійдіть за допомогою свого корпоративного облікового запису Microsoft.</p>
        
        {error && <div className="login-error-message">{error}</div>}
        
        <button className="btn-microsoft-login" onClick={handleLogin} disabled={loading}>
          {loading ? 'З\'єднання...' : 'Увійти через Microsoft'}
        </button>
      </div>
    </div>
  );
};

export default Login;