import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileModal = ({ isOpen, onClose, accountIcon }) => {
  const navigate = useNavigate();
  
  if (!isOpen) return null;


  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    
    onClose();
    
    navigate('/login');
  };

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={onClose}>✕</button>
        <img src={accountIcon} alt="Profile" className="profile-modal-avatar" />
        <h2 className="profile-modal-name">Oleh</h2>
        
        <div className="profile-modal-actions">
          <button className="profile-modal-btn outline">Змінити аккаунт</button>
          
          {/* Кнопка виходу */}
          <button className="profile-modal-btn danger" onClick={handleLogout}>
            Вийти з акаунту
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;