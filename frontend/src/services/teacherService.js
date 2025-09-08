import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const teacherService = {

  async addTeacher(teacherData) {
    try {
      const response = await api.post('/teacher/', teacherData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to add teacher');
    }
  },

  async getTeachers() {
    try {
      const response = await api.get('/teacher/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to get teachers');
    }
  },
};

export default api;
