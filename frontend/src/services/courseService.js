import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const courseService = {

  async addCourse(courseData) {
    try {
      const response = await api.post('/course/', courseData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to add course');
    }
  },

  async getCourses() {
    try {
      const response = await api.get('/course/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to get courses');
    }
  },
};

export default api;
