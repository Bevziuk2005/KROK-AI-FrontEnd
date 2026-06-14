import React, { useState, useEffect, useRef } from 'react';
import './MainContent.css';
import HelpModal from './HelpModal';
import { chatService } from './services/api';

import helpIcon from './assets/Help_circle.png';
import attachIcon from './assets/attach_file.png';
import sendIcon from './assets/Send.png';
import listIcon from './assets/list.png';

const MainContent = ({ toggleMenu, activeChatId }) => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // --- СТАНИ ДЛЯ ФАЙЛІВ ---
  const [attachedFile, setAttachedFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [isUploadingFile, setIsUploadingFile] = useState(false);

  const messagesEndRef = useRef(null);

  const fileInputRef = useRef(null);

  const quickActions = [
    { title: "Шаблон змін у межах проекту", desc: "Створити шаблон для документування змін у межах проекту..." },
    { title: "План очікувань зацікавлених сторін", desc: "Сформирувати комплексний план для використання гнучких рамок..." },
    { title: "Рамка управління ризиками", desc: "Розробити комплексну рамку управління ризиками..." }
  ];

  useEffect(() => {
    const loadMessages = async () => {
      if (!activeChatId) return;
      setLoadingMessages(true);
      try {
        const data = await chatService.getChatMessages(activeChatId);
        setMessages(data);

        setAttachedFile(null);
        setFileError('');
      } catch (error) {
        console.error("Не вдалося завантажити повідомлення:", error);
      } finally {
        setLoadingMessages(false);
      }
    };

    loadMessages();
  }, [activeChatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // --- ОБРОБКА ВИБОРУ ФАЙЛУ ---
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !activeChatId) return;

    setFileError('');
    setIsUploadingFile(true);

    try {

      const uploadedDoc = await chatService.uploadDocument(activeChatId, file);
      setAttachedFile(uploadedDoc);
    } catch (error) {
      setFileError(error.message || 'Помилка завантаження файлу');

      setTimeout(() => setFileError(''), 4000); 
    } finally {
      setIsUploadingFile(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    if (!activeChatId || isSending || isUploadingFile) return;
    fileInputRef.current?.click();
  };

  // --- ВІДПРАВКА ПОВІДОМЛЕННЯ ---
  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || !activeChatId || isSending || isUploadingFile) return;

    const userText = inputValue;
    const currentFile = attachedFile;

    setInputValue('');
    setAttachedFile(null);
    setIsSending(true);


    const temporaryUserMsg = {
      id: 'temp-user-' + Date.now(),
      role: 'user',
      content: userText,
      attached_file_title: currentFile ? currentFile.title : null
    };
    setMessages(prev => [...prev, temporaryUserMsg]);

    try {
      await chatService.sendMessage(activeChatId, userText, currentFile);
      const updatedMessages = await chatService.getChatMessages(activeChatId);
      setMessages(updatedMessages);
    } catch (error) {
      console.error("Помилка відправки повідомлення:", error);
    } finally {
      setIsSending(false);
    }
  };

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

        <div className="chat-container-core">
          {loadingMessages ? (
            <div className="chat-status-info">Завантаження повідомлень...</div>
          ) : messages.length === 0 ? (
            <div className="center-wrapper">
              <div className="welcome-header">
                <h1>Вітаю, Oleh!</h1>
                <p>Що у вас на думці?</p>
              </div>

              <div className="cards-grid">
                {quickActions.map((action, idx) => (
                  <div key={idx} className="card" onClick={() => setInputValue(action.title)}>
                    <h3>{action.title}</h3>
                    <p>{action.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="messages-stream">
              {messages.map((msg) => (
                <div key={msg.id} className={`message-bubble-wrapper ${msg.role}`}>
                  <div className="message-bubble">
                    <div className="message-sender-title">
                      {msg.role === 'user' ? 'Ви' : 'КРОК AI'}
                    </div>
                    

                    {msg.attached_file_title && (
                      <div className="msg-attached-file-badge">
                        📎 {msg.attached_file_title}
                      </div>
                    )}
                    
                    <div className="message-text-content">{msg.content}</div>
                  </div>
                </div>
              ))}
              {isSending && (
                <div className="message-bubble-wrapper assistant">
                  <div className="message-bubble typing">
                    <div className="message-sender-title">КРОК AI</div>
                    <div className="typing-loader"><span></span><span></span><span></span></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* --- ЧАТ-БАР З ПІДТРИМКОЮ ФАЙЛІВ --- */}
        <div className="chat-wrapper">
          

          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".txt" 
            style={{ display: 'none' }} 
          />


          {fileError && <div className="file-status-popup error">{fileError}</div>}
          {isUploadingFile && <div className="file-status-popup uploading">⚡ Обробка та генерація ембедінгів документа...</div>}
          

          {attachedFile && (
            <div className="attached-file-preview">
              <span>📎 {attachedFile.title} (Готовий до аналізу)</span>
              <button className="remove-file-btn" onClick={() => setAttachedFile(null)}>✕</button>
            </div>
          )}

          <form className="chat-input-container" onSubmit={handleSendMessage}>
            <img 
              src={attachIcon} 
              alt="Attach file" 
              className={`chat-action-icon ${(!activeChatId || isSending || isUploadingFile) ? 'disabled' : ''}`} 
              style={{ marginRight: '12px' }} 
              onClick={triggerFileInput}
            />
            
            <input 
              type="text" 
              placeholder={activeChatId ? "Запитайте про будь-що..." : "Створіть або оберіть чат для старту..."} 
              className="chat-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={!activeChatId || isSending || isUploadingFile}
            />
            
            <img 
              src={sendIcon} 
              alt="Send" 
              className={`chat-action-icon ${(!inputValue.trim() || isSending || isUploadingFile) ? 'disabled' : ''}`} 
              style={{ marginLeft: '12px' }}
              onClick={handleSendMessage}
            />
          </form>
        </div>
      </main>

      <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
    </>
  );
};

export default MainContent;