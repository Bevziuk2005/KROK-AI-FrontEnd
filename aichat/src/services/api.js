import axios from 'axios';

const API_BASE_URL = 'https://krok-ai-back.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Допоміжна функція для імітації затримки сервера (щоб було видно лоадери)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/* =========================================
   ІМІТАЦІЯ БАЗИ ДАНИХ (MOCK LAYER FOR DEMO)
========================================= */
const getLocalChats = () => {
  const local = localStorage.getItem('__mock_chats');
  if (!local) {
    const initialChats = [
      { id: "123e4567-e89b-12d3-a456-426614174000", title: "Дослідження гнучких рамок", type: "general" }
    ];
    localStorage.setItem('__mock_chats', JSON.stringify(initialChats));
    return initialChats;
  }
  return JSON.parse(local);
};

const saveLocalChats = (chats) => {
  localStorage.setItem('__mock_chats', JSON.stringify(chats));
};

const getLocalMessages = (chatId) => {
  const local = localStorage.getItem(`__mock_msgs_${chatId}`);
  if (!local) {
    // ДЕМОНСТРАЦІЙНІ ПОВІДОМЛЕННЯ ДЛЯ ПРЕЗЕНТАЦІЇ ТА ТЕСТУ ФАЙЛІВ
    const initialMsgs = [
      
    ];
    localStorage.setItem(`__mock_msgs_${chatId}`, JSON.stringify(initialMsgs));
    return initialMsgs;
  }
  return JSON.parse(local);
};

const saveLocalMessages = (chatId, msgs) => {
  localStorage.setItem(`__mock_msgs_${chatId}`, JSON.stringify(msgs));
};

/* =========================================
   ОФЛАЙН МЕТОДИ (ДЛЯ ДЕМОНСТРАЦІЇ)
========================================= */
export const chatService = {
  // 1. Отримати всі чати локально
  async getChats() {
    await delay(300);
    return getLocalChats();
  },

  // 2. Створити новий чат локально
  async createChat(title) {
    await delay(200);
    const chats = getLocalChats();
    const newChat = {
      id: crypto.randomUUID(),
      title: title,
      type: 'general',
      created_at: new Date().toISOString()
    };
    chats.unshift(newChat);
    saveLocalChats(chats);
    return newChat;
  },

  // 3. Отримати демонстраційні повідомлення
  async getChatMessages(chatId) {
    await delay(300);
    return getLocalMessages(chatId);
  },

  // 4. Імітація завантаження документа через скріпку
  async uploadDocument(chatId, file) {
    await delay(1500); // Імітуємо час на аналіз файлу ШІ
    if (!file.name.endsWith('.txt')) {
      throw new Error('Дозволені тільки .txt файли');
    }
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('Максимальний розмір файлу 10 MB');
    }
    return {
      id: crypto.randomUUID(),
      title: file.name,
      status: 'completed',
      created_at: new Date().toISOString()
    };
  },

  // 5. Надіслати повідомлення та отримати розумну відповідь бота
  async sendMessage(chatId, content, attachedFile = null) {
    await delay(1500); // Затримка для ефекту "ШІ аналізує великий документ..."
    const msgs = getLocalMessages(chatId);
    
    const userMsg = {
      id: crypto.randomUUID(),
      role: 'user',
      content: content,
      created_at: new Date().toISOString(),
      attached_file_title: attachedFile ? attachedFile.title : null 
    };
    msgs.push(userMsg);

    // --- БАЗА ВІДПОВІДЕЙ ДЛЯ ДЕМОНСТРАЦІЇ ---
    let botText = "";
    const cleanContent = content.trim().toLowerCase();

    // 1. СПЕЦІАЛЬНА ЛОГІКА ДЛЯ ФАЙЛІВ (Короткий опис змісту)
    if (attachedFile) {
      botText = `### 📎 Результат аналізу документа: "${attachedFile.title}"

[Система RAG]: Успішно опрацьовано та знайдено відповідні фрагменти. Ось короткий опис змісту та структури завантаженого документа:

* **Основна тема:** Інтеграція гнучких методологій розробки (Agile) та управління ризиками в корпоративну структуру проекту КРОК AI.
* **Ключові розділи документа:**
  1. *Вступ та цілі автоматизації:* Обґрунтування впровадження інтелектуального помічника для студентів та викладачів.
  2. *Аналіз зацікавлених сторін:* Очікування керівництва, технічної команди та кінцевих користувачів.
  3. *Протокол управління змінами:* Покроковий процес узгодження нових вимог (CR-процедура).
  4. *Матриця ризиків:* Виявлені технологічні загрози (наприклад, доступність API OnRender) та стратегії їх мінімізації.
* **Головний висновок:** Документ повністю регламентує архітектурні межі проекту та визначає критерії готовності (Definition of Done) для першого релізу.

*Ви можете поставити будь-яке додаткове запитання щодо конкретних пунктів цього файлу.*`;


    } else if (cleanContent.includes("шаблон змін у межах проекту")) {
      botText = `### 📋 Шаблон запиту на зміни (Project Change Request Template)

Ось професійний шаблон для документування та погодження змін у межах проекту КРОК:

1. **Загальна інформація:**
   * **ID Запиту:** CR-00X
   * **Дата створення:** ${new Date().toLocaleDateString('uk-UA')}

2. **Опис пропонованої зміни:**
   * *Поточний стан:* Опис того, як процес або функціонал працює зараз.
   * *Пропонований стан:* Що саме пропонується змінити.

3. **Аналіз впливу (Impact Assessment):**
   * **Вплив на строки:** Чи зміщуються дедлайни спринтів?
   * **Вплив на бюджет:** Чи потребує це додаткових ресурсів?`;

    } else if (cleanContent.includes("план очікувань зацікавлених сторін")) {
      botText = `### 🎯 План управління очікуваннями зацікавлених сторін (Stakeholder Management Plan)

Стратегічний план комунікації для успішного впровадження гнучких рамок:

* **Спонсори та Керівництво (High Power / High Interest):** Формат: Щотижневі демо-презентації інкременту продукту (Sprint Demo).
* **Кінцеві користувачі (Low Power / High Interest):** Формат: Воркшопи, збір зворотного зв'язку (Feedback loops).`;

    } else if (cleanContent.includes("рамка управління ризиками")) {
      botText = `### 🛡️ Рамка управління ризиками при гнучкій розробці (Agile Risk Management Framework)

Управління ризиками в гнучких проектах складається з 3-х циклічних етапів:

* **Ідентифікація ризиків:** Виявлення технічних загроз на сесії Sprint Planning.
* **Оцінка та пріоритезація:** Розрахунок за матрицею "Ймовірність × Вплив".
* **Стратегії реагування:** Створення дослідних прототипів (Spikes) для зменшення невизначеності.`;

    } else {
      botText = `[Емуляція відповіді ШІ]: Я отримав ваше повідомлення "${content}". Зараз інтерфейс повністю готовий до обробки відповідей і підключення до сервера!`;
    }

    const botMsg = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: botText,
      created_at: new Date().toISOString()
    };
    msgs.push(botMsg);

    saveLocalMessages(chatId, msgs);
    return botMsg;
  }
};

export default api;