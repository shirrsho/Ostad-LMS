import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const lessonService = {

  async addLesson(lessonData) {
    try {
      const response = await api.post('/lesson/', lessonData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to add lesson');
    }
  },

  async getLessons() {
    try {
      const response = await api.get('/lesson/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to get lessons');
    }
  },
};

export default api;
