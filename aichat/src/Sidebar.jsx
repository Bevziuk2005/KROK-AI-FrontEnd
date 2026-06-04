import React, { useState } from 'react';

// Імпортуємо іконки
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

  const navItems = [
    { label: "Chat History", icon: chatIcon },
    { label: "Prompt Library", icon: promptIcon },
    { label: "Guided Experience", icon: guidedIcon },
    { label: "Tools", icon: toolsIcon },
    { label: "Tutorials", icon: tutorialsIcon },
  ];

  const mockChats = [
    { id: 1, title: "Agile Frameworks Exploration" },
    { id: 2, title: "Scope Change Management Guide" },
    { id: 3, title: "Risk Identification Method" },
    { id: 4, title: "Stakeholder Plan V2" },
    { id: 5, title: "New Project Intro" },
  ];

  return (
    <aside className="sidebar-container">
      {/* --- МОБІЛЬНИЙ ХЕДЕР --- */}
      <div className="mobile-header">
        <img src={listIcon} alt="Menu" className="menu-icon" onClick={toggleMenu} />
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

          <button className="nav-item tablet-new-chat-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span className="nav-label">New Chat</span>
          </button>
        </div>
        
        <button className="nav-item" style={{ backgroundColor: 'transparent' }}>
          <img src={accountIcon} alt="Profile" className="avatar-icon" />
        </button>
      </div>

      {/* --- ПРАВА ПАНЕЛЬ (Виїзне меню) --- */}
      <div className={`sidebar-actions ${isMenuOpen ? 'mobile-open' : ''}`}>
        
        <button className="close-menu-btn" onClick={toggleMenu}>✕</button>

        {/* --- НАВІГАЦІЯ ДЛЯ ТЕЛЕФОНІВ (З'являється тільки в бургер-меню на Phone) --- */}
        <div className="mobile-nav-list">
          {navItems.map((item, index) => (
            <div 
              key={index}
              className={`mobile-nav-item ${index === activeIndex ? 'active' : ''}`}
              onClick={() => {
                setActiveIndex(index);
                toggleMenu(); // Закриваємо меню після кліку
              }}
            >
              <img src={item.icon} alt={item.label} className="mobile-nav-icon" />
              <span>{item.label}</span>
            </div>
          ))}
          <div className="mobile-nav-divider"></div>
        </div>

        {/* --- ІСТОРІЯ ЧАТІВ --- */}
        <div className="chat-history-container">
          <div className="chat-history-header">Recent Chats</div>
          
          <div className="chat-history-list">
            {mockChats.map((chat) => (
              <div 
                key={chat.id} 
                className={`chat-history-item ${chat.id === activeChatId ? 'active' : ''}`}
                onClick={() => {
                  setActiveChatId(chat.id);
                  toggleMenu();
                }}
                title={chat.title}
              >
                {chat.title}
              </div>
            ))}
          </div>
        </div>

        <button className="btn-new-chat">New Chat</button>
      </div>
    </aside>
  );
};

export default Sidebar;