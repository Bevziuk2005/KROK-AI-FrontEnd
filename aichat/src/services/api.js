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
        if (!refresh) throw new Error("Refresh token відсутній");

        const response = await axios.post(`${API_BASE_URL}/api/v1/auth/refresh/`, {
          refresh_token: refresh,
        });

        localStorage.setItem('access_token', response.data.access_token);
        
        originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
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
  ІНТЕГРАЦІЯ З БЕКЕНДОМ
========================================= */
export const chatService = {
  
  // --- АУТЕНТИФІКАЦІЯ ---
  
  async getLoginUrl() {
    const response = await api.post('/api/v1/auth/login/', {
      redirect: window.location.origin
    });
    return response.data;
  },


  async logout() {
    const refresh = localStorage.getItem('refresh_token');
    try {

      await api.post('/api/v1/auth/logout/', { refresh_token: refresh });
    } catch (err) {
      console.error("Серверна помилка при logout, очищення локальних даних...", err);
    } finally {

      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  },

  async getCurrentUser() {
    const response = await api.get('/api/v1/users/me/');
    return response.data;
  },


  // --- РОБОТА З ЧАТАМИ ---


  async getChats() {
    const response = await api.get('/api/v1/chats/?page_size=100');
    return response.data.results; // Бекенд повертає пагінацію, список лежить в results
  },


  async createChat(title) {
    const response = await api.post('/api/v1/chats/', {
      title: title,
      type: 'general'
    });
    return response.data;
  },


  async getChatMessages(chatId) {
    const response = await api.get(`/api/v1/chats/${chatId}/messages/`);
    return response.data.results; // Список повідомлень лежить в results
  },


  async sendMessage(chatId, content) {
    const response = await api.post(`/api/v1/chats/${chatId}/messages/`, {
      role: 'user',
      content: content
    });
    return response.data;
  },


  // --- РОБОТА З ФАЙЛАМИ ТА RAG ПОШУКОМ ---

  async getDocuments() {
    const response = await api.get('/api/v1/files/');
    return response.data.results;
  },


  async uploadDocument(chatId, file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', file.name);

    const response = await api.post('/api/v1/files/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async searchInDocuments(query, topK = 5) {
    const response = await api.post('/api/v1/rag/search/', {
      query: query,
      top_k: topK
    });
    return response.data.results;
  }
};

export default api;