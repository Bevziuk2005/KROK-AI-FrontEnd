import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import './Dashboard.css';

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [activeChatId, setActiveChatId] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="dashboard-layout">

      <Sidebar 
        isMenuOpen={isMenuOpen} 
        toggleMenu={toggleMenu} 
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
      />
      
      <MainContent 
        toggleMenu={toggleMenu} 
        activeChatId={activeChatId}
      />
      
      {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </div>
  );
};

export default Dashboard;