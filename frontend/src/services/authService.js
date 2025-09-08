import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {

    async login(credentials) {
        try {
      const response = await api.post('/login/', {
        phone: credentials.phone, // Using phone field
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
      return this.login({
        phone: userData.phone,
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
      const response = await api.get('/protected/',{
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});
      return response.data.user;
    } catch (error) {
      throw new Error('Failed to get user information');
    }
  },

};

export default api;
