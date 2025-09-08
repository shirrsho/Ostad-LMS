import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  async login(credentials) {
    try {
      const response = await api.post('/login/', {
        phone: credentials.username, // Using username field as phone
        password: credentials.password
      });
      return {
        token: response.data.tokens.access,
        refresh: response.data.tokens.refresh,
        user: {
          id: response.data.user_id,
          username: response.data.username
        }
      };
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  },

  async register(userData) {
    try {
      const response = await api.post('/register/', {
        username: userData.username,
        password: userData.password,
        phone: userData.phone || userData.username, // Use phone or username
        first_name: userData.firstName,
        last_name: userData.lastName
      });
      // After registration, need to login to get tokens
      return await this.login({
        username: userData.phone || userData.username,
        password: userData.password
      });
    } catch (error) {
      const errorMessage = error.response?.data?.error || 
                          Object.values(error.response?.data || {}).flat().join(', ') ||
                          'Registration failed';
      throw new Error(errorMessage);
    }
  },

  async getCurrentUser() {
    try {
      const response = await api.get('/protected/');
      return response.data.user;
    } catch (error) {
      throw new Error('Failed to get user information');
    }
  },

  async logout() {
    try {
      // just clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('refresh');
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  async createTeacher(teacherData) {
    try {
      const token = localStorage.getItem('token');
      const response = await api.post('/teacher/', {
        name: teacherData.name,
        email: teacherData.email,
        subject: teacherData.subject
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || 
                          Object.values(error.response?.data || {}).flat().join(', ') ||
                          'Teacher creation failed';
      throw new Error(errorMessage);
    }
  },

  async getTeachers() {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/teacher/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || 
                          'Failed to fetch teachers';
      throw new Error(errorMessage);
    }
  },

  async updateTeacher(teacherId, teacherData) {
    try {
      const token = localStorage.getItem('token');
      const response = await api.put(`/teacher/${teacherId}/`, {
        name: teacherData.name,
        email: teacherData.email,
        subject: teacherData.subject
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || 
                          Object.values(error.response?.data || {}).flat().join(', ') ||
                          'Teacher update failed';
      throw new Error(errorMessage);
    }
  },

  async deleteTeacher(teacherId) {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/teacher/${teacherId}/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return true;
    } catch (error) {
      const errorMessage = error.response?.data?.error || 
                          'Teacher deletion failed';
      throw new Error(errorMessage);
    }
  },
};

export default api;
