import React, { useState } from 'react';

const HelpModal = ({ isOpen, onClose }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  if (!isOpen) return null;

  const faqs = [
    {
      q: "Як створити новий проект?",
      a: "Щоб створити проект, натисніть кнопку 'Новий чат' у правому нижньому куті екрана або скористайтеся шаблонами швидких дій."
    },
    {
      q: "Як завантажити власні файли?",
      a: "Натисніть на іконку скріпки у рядку введення повідомлення знизу екрана. Ви можете додавати PDF, DOCX та зображення."
    },
    {
      q: "Чи можу я видалити історію чату?",
      a: "Так, ви можете видалити будь-який чат. Для цього потрібно буде викликати меню налаштувань конкретного чату (ця функція в розробці)."
    },
    {
      q: "Що таке 'Бібліотека запитів'?",
      a: "Це збережені шаблони найкращих запитів до ШІ, які допоможуть вам швидко генерувати якісні відповіді без необхідності писати їх з нуля."
    }
  ];

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="help-modal-overlay" onClick={onClose}>
      <div className="help-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={onClose}>✕</button>
        
        <h2>Найпоширеніші питання</h2>
        
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${expandedIndex === index ? 'expanded' : ''}`}
              onClick={() => handleToggle(index)}
            >
              <div className="faq-question">
                <span>{faq.q}</span>
                <span className="faq-icon">{expandedIndex === index ? '−' : '+'}</span>
              </div>
              
              {/* Обгортка для плавної анімації висоти */}
              <div className="faq-answer-wrapper">
                <div className="faq-answer-inner">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpModal;