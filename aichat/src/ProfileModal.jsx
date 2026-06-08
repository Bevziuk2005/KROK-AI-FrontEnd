import React from 'react';

const ProfileModal = ({ isOpen, onClose, accountIcon }) => {
  if (!isOpen) return null;

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={onClose}>✕</button>
        <img src={accountIcon} alt="Profile" className="profile-modal-avatar" />
        <h2 className="profile-modal-name">Oleh</h2>
        
        <div className="profile-modal-actions">
          <button className="profile-modal-btn outline">Змінити аккаунт</button>
          <button className="profile-modal-btn danger">Вийти з акаунту</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;