import axios from 'axios';

const API_BASE_URL = 'https://krok-ai-back.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refresh = localStorage.getItem('refresh_token');
        const { data } = await axios.post(`${API_BASE_URL}/api/v1/auth/refresh/`, {
          refresh_token: refresh,
        });
        localStorage.setItem('access_token', data.access_token);
        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
        return api(originalRequest);
      } catch (err) {
        localStorage.clear();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

/* =========================================
   РЕАЛЬНІ МЕТОДИ (ПІСЛЯ ПОЛАГОДЖЕННЯ БЕКЕНДУ)
========================================= */
export const chatService = {
  // 1. Отримати всі чати конкретного користувача з бази даних
  async getChats() {
    const response = await api.get('/api/v1/chats/');
    return response.data.results; 
  },

  // 2. Створити новий чат на сервері під цим користувачем
  async createChat(title) {
    const response = await api.post('/api/v1/chats/', {
      title: title,
      type: 'general'
    });
    return response.data;
  },

  // 3. Отримати повідомлення лише для цього чату з бази даних
  async getChatMessages(chatId) {
    const response = await api.get(`/api/v1/chats/${chatId}/messages/`);
    return response.data.results;
  },

  // 4. Відправити повідомлення на бекенд 
  async sendMessage(chatId, content) {
    const response = await api.post(`/api/v1/chats/${chatId}/messages/`, {
      role: 'user',
      content: content
    });
    return response.data;
  }
};

export default api;