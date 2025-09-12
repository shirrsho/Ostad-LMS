import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const enrollmentService = {

  async addEnrollment(enrollmentData) {
    try {
      const response = await api.post('/enrollment/', enrollmentData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to add enrollment');
    }
  },
};

export default api;
