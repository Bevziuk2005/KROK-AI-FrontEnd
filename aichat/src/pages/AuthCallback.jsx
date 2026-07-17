import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [statusMessage, setStatusMessage] = useState('Авторизація... Будь ласка, зачекайте.');
  
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');

    if (!code) {
      setStatusMessage('Помилка: Код авторизації відсутній.');
      setTimeout(() => navigate('/login'), 3000);
      return;
    }

    hasFetched.current = true;

    const exchangeCodeForTokens = async () => {
      try {
        const response = await axios.post('https://krok-ai-back.onrender.com/api/v1/auth/callback/', {
          code: code,
          redirect: `${window.location.origin}/auth/callback`
        });

        const { access_token, refresh_token } = response.data;

        if (access_token && refresh_token) {
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);
          
          setStatusMessage('Успішно авторизовано! Перенаправлення...');
          navigate('/');
        } else {
          setStatusMessage('Помилка: Бекенд не повернув токени.');
          setTimeout(() => navigate('/login'), 3000);
        }
      } catch (error) {
        console.error(error);

        const backendError = error.response?.data?.detail;
        if (backendError === 'Email domain not allowed') {
          setStatusMessage('Помилка: Доступ дозволено тільки для корпоративних пошт @krok.edu.ua.');
        } else {
          setStatusMessage('Помилка авторизації. Можливо, код застарів.');
        }
        setTimeout(() => navigate('/login'), 4000);
      }
    };

    exchangeCodeForTokens();
  }, [location, navigate]);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      height: '100vh', width: '100vw', fontFamily: 'sans-serif',
      color: '#2d3748', backgroundColor: '#f4f7fa', padding: '20px', textAlign: 'center'
    }}>
      <div style={{
        border: '4px solid #edf2f7', borderTop: '4px solid #1465B1', borderRadius: '50%',
        width: '40px', height: '40px', animation: 'spin 1s linear infinite', marginBottom: '20px'
      }} />
      <style>{`
        @keyframes spin { 
          0% { transform: rotate(0deg); } 
          100% { transform: rotate(360deg); } 
        }
      `}</style>
      
      <p style={{ fontSize: '16px', fontWeight: '500' }}>{statusMessage}</p>
    </div>
  );
};

export default AuthCallback;