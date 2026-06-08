import React, { useState } from 'react'; // 1. Додано useState в імпорт
import './MainContent.css';
import HelpModal from './HelpModal';

import helpIcon from './assets/Help_circle.png';
import attachIcon from './assets/attach_file.png';
import sendIcon from './assets/Send.png';
import listIcon from './assets/list.png';

const MainContent = ({ toggleMenu }) => {

  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const quickActions = [
    {
      title: "Шаблон змін у межах проекту",
      desc: "Створити шаблон для документування змін у межах проекту, деталізуючи зміни, причини..."
    },
    {
      title: "План очікувань зацікавлених сторін",
      desc: "Сформулювати комплексний план для використання гнучких рамок для управління очікуваннями зацікавлених сторін..."
    },
    {
      title: "Рамка управління ризиками",
      desc: "Розробити комплексну рамку управління ризиками, що включає ідентифікацію ризиків, оцінку та моніторинг..."
    }
  ];

  return (
    <>
      <main className="main-content">
        
        <div className="tablet-menu-btn" onClick={toggleMenu}>
          <img src={listIcon} alt="Menu" className="menu-icon" />
        </div>

        <div className="help-btn" onClick={() => setIsHelpModalOpen(true)}>
          <img src={helpIcon} alt="Help" className="help-icon" />
          Потрібна допомога?
        </div>

        <div className="center-wrapper">
          <div className="welcome-header">
            <h1>Вітаю, Oleh!</h1>
            <p>Що у вас на думці?</p>
          </div>

          <div className="cards-grid">
            {quickActions.map((action, idx) => (
              <div key={idx} className="card">
                <h3>{action.title}</h3>
                <p>{action.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="chat-wrapper">
          <div className="chat-input-container">
            <img src={attachIcon} alt="Attach file" className="chat-action-icon" style={{ marginRight: '12px' }} />
            <input 
              type="text" 
              placeholder="Запитайте будь що..." 
              className="chat-input"
            />
            <img src={sendIcon} alt="Send message" className="chat-action-icon" style={{ marginLeft: '12px' }} />
          </div>
        </div>
      </main>

      <HelpModal 
        isOpen={isHelpModalOpen} 
        onClose={() => setIsHelpModalOpen(false)} 
      />
    </>
  );
};

export default MainContent;