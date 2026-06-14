import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './pages/Login';
import AuthCallback from './pages/AuthCallback';

// Строгий захист: якщо токена немає в LocalStorage — ЗАБОРОНИТИ вхід і кинути на /login
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Routes>
      {/* Сторінка логіну */}
      <Route path="/login" element={<Login />} />
      
      {/* Обробник коду від Microsoft */}
      <Route path="/auth/callback" element={<AuthCallback />} />
      
      {/* Головний екран програми (захищений) */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />

      {/* Редірект з будь-яких інших адрес */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;