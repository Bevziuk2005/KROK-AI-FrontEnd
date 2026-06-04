import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import './Dashboard.css';

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <MainContent toggleMenu={toggleMenu} />
      {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </div>
  );
};

export default Dashboard;