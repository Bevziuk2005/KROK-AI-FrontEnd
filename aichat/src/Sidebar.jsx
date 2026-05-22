import React, { useState } from 'react';

// Імпортуємо іконки
import chatIcon from './assets/chat_bubble.png';
import promptIcon from './assets/bookmark_filled.png';
import guidedIcon from './assets/Box.png';
import toolsIcon from './assets/Tool.png';
import tutorialsIcon from './assets/Help_circle.png';
import accountIcon from './assets/account_circle.png';
import listIcon from './assets/list.png';

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const navItems = [
    { label: "Chat History", icon: chatIcon },
    { label: "Prompt Library", icon: promptIcon },
    { label: "Guided Experience", icon: guidedIcon },
    { label: "Tools", icon: toolsIcon },
    { label: "Tutorials", icon: tutorialsIcon },
  ];

  return (
    <aside className="sidebar-container">
      {/* --- МОБІЛЬНИЙ ХЕДЕР --- */}
      <div className="mobile-header">
        <img src={listIcon} alt="Menu" className="menu-icon" />
        <img src={accountIcon} alt="Profile" className="avatar-icon" />
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

          {/* --- НОВА КНОПКА NEW CHAT (Тільки для Tablet/Phone) --- */}
          <button className="nav-item tablet-new-chat-btn">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="nav-icon"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span className="nav-label">New Chat</span>
          </button>
          
        </div>
        
        {/* Аватар знизу */}
        <button className="nav-item" style={{ backgroundColor: 'transparent' }}>
          <img src={accountIcon} alt="Profile" className="avatar-icon" />
        </button>
      </div>

      {/* --- ПРАВА ПАНЕЛЬ --- */}
      <div className="sidebar-actions">
        <button className="btn-new-chat">New Chat</button>
      </div>
    </aside>
  );
};

export default Sidebar;