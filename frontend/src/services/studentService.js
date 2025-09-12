import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const studentService = {
  async addStudent(studentData) {
    try {
      const response = await api.post('/student/', studentData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to add student');
    }
  },

  async getStudents() {
    try {
      const response = await api.get('/student/', {
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
