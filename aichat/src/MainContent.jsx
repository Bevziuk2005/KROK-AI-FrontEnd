import React from 'react';


import helpIcon from './assets/Help_circle.png';
import attachIcon from './assets/attach_file.png';
import sendIcon from './assets/Send.png';
import listIcon from './assets/list.png';

const MainContent = ({ toggleMenu }) => {
  const quickActions = [
    {
      title: "Scope Change Template",
      desc: "Generate a template for documenting changes in project scope, detailing the changes, reas..."
    },
    {
      title: "Stakeholder Expectation Plan",
      desc: "Formulate a comprehensive plan for utilizing agile frameworks to manage stakeholder expect..."
    },
    {
      title: "Risk Management Framework",
      desc: "Develop a comprehensive risk management framework encompassing risk identification, ass..."
    }
  ];

  return (
    <main className="main-content">
      

      <div className="tablet-menu-btn" onClick={toggleMenu}>
        <img src={listIcon} alt="Menu" className="menu-icon" />
      </div>


      <div className="help-btn">
        <img src={helpIcon} alt="Help" className="help-icon" />
        Need help?
      </div>

      <div className="center-wrapper">
        <div className="welcome-header">
          <h1>Welcome, Oleh!</h1>
          <p>What's on your mind?</p>
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
            placeholder="Ask me..." 
            className="chat-input"
          />
          
          <img src={sendIcon} alt="Send message" className="chat-action-icon" style={{ marginLeft: '12px' }} />
          
        </div>
      </div>

    </main>
  );
};

export default MainContent;