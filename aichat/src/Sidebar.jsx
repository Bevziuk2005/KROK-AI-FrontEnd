import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import ProfileModal from './ProfileModal';
import { chatService } from './services/api';

import chatIcon from './assets/chat_bubble.png';
import promptIcon from './assets/bookmark_filled.png';
import guidedIcon from './assets/Box.png';
import toolsIcon from './assets/Tool.png';
import tutorialsIcon from './assets/Help_circle.png';
import accountIcon from './assets/account_circle.png';
import listIcon from './assets/list.png';


const Sidebar = ({ isMenuOpen, toggleMenu, activeChatId, setActiveChatId }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const navItems = [
    { label: "Історія", icon: chatIcon },
    { label: "Бібліотека запитів", icon: promptIcon },
    { label: "Керований досвід", icon: guidedIcon },
    { label: "Інструменти", icon: toolsIcon },
    { label: "Посібники", icon: tutorialsIcon },
  ];

  const loadChats = async () => {
    setLoading(true);
    try {
      const data = await chatService.getChats();
      setChats(data);

      if (data.length > 0 && !activeChatId) {
        setActiveChatId(data[0].id);
      }
    } catch (error) {
      console.error("Не вдалося завантажити чати:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChats();
  }, []);

  const handleCreateChat = async () => {
    const title = `Новий чат №${chats.length + 1}`;
    try {
      const newChat = await chatService.createChat(title);
      setChats([newChat, ...chats]);
      setActiveChatId(newChat.id);
      setActiveIndex(0);
    } catch (error) {
      console.error("Помилка створення чату:", error);
    }
  };

  return (
    <>
      <aside className="sidebar-container">
        <div className="mobile-header">
          <img src={listIcon} alt="Menu" className="menu-icon" onClick={toggleMenu} />
          <img src={accountIcon} alt="Profile" className="avatar-icon" onClick={() => setIsProfileModalOpen(true)} style={{ cursor: 'pointer' }} />
        </div>

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

            <button className="nav-item tablet-new-chat-btn" onClick={handleCreateChat}>
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

          <div className={`chat-history-container ${activeIndex === 0 ? 'open' : 'closed'}`}>
            <div className="chat-history-header">Нещодавні чати</div>
            
            <div className="chat-history-list">
              {loading ? (
                <div style={{ color: '#a0aec0', padding: '10px', fontSize: '13px' }}>Завантаження...</div>
              ) : chats.length === 0 ? (
                <div style={{ color: '#a0aec0', padding: '10px', fontSize: '13px' }}>Чатів немає</div>
              ) : (
                chats.map((chat) => (
                  <div 
                    key={chat.id} 
                    className={`chat-history-item ${chat.id === activeChatId ? 'active' : ''}`}
                    onClick={() => setActiveChatId(chat.id)}
                    title={chat.title}
                  >
                    {chat.title}
                  </div>
                ))
              )}
            </div>
          </div>

          <button className="btn-new-chat" onClick={handleCreateChat}>Новий чат</button>
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