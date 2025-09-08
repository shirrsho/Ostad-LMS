import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and get user info
      authService.getCurrentUser()
        .then(userData => {
          setUser(userData);
        })
        .catch(() => {
          localStorage.removeItem('token');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authService.login(credentials);
      setUser(response.user);
      localStorage.setItem('token', response.token);
      localStorage.setItem('refresh', response.refresh);
      return response;
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authService.register(userData);
      setUser(response.user);
      localStorage.setItem('token', response.token);
      localStorage.setItem('refresh', response.refresh);
      return response;
    } catch (err) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  const createTeacher = async (teacherData) => {
          try {
              const response = await authService.createTeacher(teacherData);
              console.log('Teacher created:', response);
              return response;
          } catch (err) {
              console.error('Teacher creation failed:', err.message);
              throw err;
          }
      }
  
      const getTeachers = async () => {
          try {
              const response = await authService.getTeachers();
              return response;
          } catch (err) {
              console.error('Failed to fetch teachers:', err.message);
              throw err;
          }
      }
  
      const updateTeacher = async (teacherId, teacherData) => {
          try {
              const response = await authService.updateTeacher(teacherId, teacherData);
              console.log('Teacher updated:', response);
              return response;
          } catch (err) {
              console.error('Teacher update failed:', err.message);
              throw err;
          }
      }
  
      const deleteTeacher = async (teacherId) => {
          try {
              await authService.deleteTeacher(teacherId);
              console.log('Teacher deleted successfully');
              return true;
          } catch (err) {
              console.error('Teacher deletion failed:', err.message);
              throw err;
          }
      }

  const value = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
