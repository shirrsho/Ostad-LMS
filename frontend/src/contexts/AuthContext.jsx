import { createContext, useEffect } from 'react';
import { authService } from '../services/authService';
import { useContext } from 'react';
import { useState } from 'react';

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
    const [isAuthLoading, setIsAuthLoading] = useState(true)

    const initUser = async () => {
        setIsAuthLoading(true)
        if (localStorage.getItem('token')) {
            const user = await authService.getCurrentUser();
            console.log(user);
            setUser(user);
        }
        setIsAuthLoading(false)
    }

    useEffect(() => {
        initUser();
    }, []);

    const register = async (userData) => {
        try {
            const response = await authService.register(userData);
            console.log(response);

      localStorage.setItem('token', response.token);
      localStorage.setItem('refresh', response.refresh);
      setUser(response.user);
            return response;
        } catch (err) {
            setError(err.message || 'Registration failed');
            throw err;
        }
    }

    const login = async (credentials) => {
        try {
            const response = await authService.login(credentials);
            console.log(response);

      localStorage.setItem('token', response.token);
      localStorage.setItem('refresh', response.refresh);
      setUser(response.user);
            return response;
        } catch (err) {
            setError(err.message || 'Login failed');
            throw err;
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{
            register,
            user,
            logout,
            login,
            isAuthLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
}