import React, { useState } from 'react';
import './Sidebar.css';
import ProfileModal from './ProfileModal';

import chatIcon from './assets/chat_bubble.png';
import promptIcon from './assets/bookmark_filled.png';
import guidedIcon from './assets/Box.png';
import toolsIcon from './assets/Tool.png';
import tutorialsIcon from './assets/Help_circle.png';
import accountIcon from './assets/account_circle.png';
import listIcon from './assets/list.png';

const Sidebar = ({ isMenuOpen, toggleMenu }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeChatId, setActiveChatId] = useState(1);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const navItems = [
    { label: "Історія", icon: chatIcon },
    { label: "Бібліотека запитів", icon: promptIcon },
    { label: "Керований досвід", icon: guidedIcon },
    { label: "Інструменти", icon: toolsIcon },
    { label: "Посібники", icon: tutorialsIcon },
  ];

  const mockChats = [
    { id: 1, title: "Дослідження гнучких рамок" },
    { id: 2, title: "Гід з управління змінами у межах проекту" },
    { id: 3, title: "Метод ідентифікації ризиків" },
    { id: 4, title: "План зацікавлених сторін V2" },
    { id: 5, title: "Вступ до нового проекту" },
  ];

  return (
    <>
      <aside className="sidebar-container">
        <div className="mobile-header">
          <img src={listIcon} alt="Menu" className="menu-icon" onClick={toggleMenu} />
          <img src={accountIcon} alt="Profile" className="avatar-icon" onClick={() => setIsProfileModalOpen(true)} style={{ cursor: 'pointer' }} />
        </div>

        {/* --- НАВІГАЦІЯ ДЛЯ ПК ТА ПЛАНШЕТІВ --- */}
        <div className="sidebar-nav">
          <div className="nav-menu">
            {navItems.map((item, index) => (
              <button 
                key={index} 
                className={`nav-item ${index === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
              >
                <img src={item.icon} alt={item.label} className="nav-icon" />
                <span className="nav-label">{item.label}</span>
              </button>
            ))}

            <button className="nav-item tablet-new-chat-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span className="nav-label">Новий чат</span>
            </button>
          </div>
          
          <button className="nav-item" style={{ backgroundColor: 'transparent' }} onClick={() => setIsProfileModalOpen(true)}>
            <img src={accountIcon} alt="Profile" className="avatar-icon" />
          </button>
        </div>

        <div className={`sidebar-actions ${isMenuOpen ? 'mobile-open' : ''}`}>
          
          <button className="close-menu-btn" onClick={toggleMenu}>✕</button>

          <div className="mobile-nav-list">
            {navItems.map((item, index) => (
              <div 
                key={index}
                className={`mobile-nav-item ${index === activeIndex ? 'active' : ''}`}
                onClick={() => {
                  setActiveIndex(index);
                  toggleMenu();
                }}
              >
                <img src={item.icon} alt={item.label} className="mobile-nav-icon" />
                <span>{item.label}</span>
              </div>
            ))}
            <div className="mobile-nav-divider"></div>
          </div>

          {/* --- ІСТОРІЯ ЧАТІВ --- */}
          <div className={`chat-history-container ${activeIndex === 0 ? 'open' : 'closed'}`}>
            <div className="chat-history-header">Нещодавні чати</div>
            
            <div className="chat-history-list">
              {mockChats.map((chat) => (
                <div 
                  key={chat.id} 
                  className={`chat-history-item ${chat.id === activeChatId ? 'active' : ''}`}
                  onClick={() => {
                    setActiveChatId(chat.id);
                  }}
                  title={chat.title}
                >
                  {chat.title}
                </div>
              ))}
            </div>
          </div>

          <button className="btn-new-chat">Новий чат</button>
        </div>
      </aside>
      
      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
        accountIcon={accountIcon}
      />
    </>
  );
};

export default Sidebar;