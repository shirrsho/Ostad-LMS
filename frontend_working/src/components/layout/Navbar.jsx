import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Layout.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <h2>LMS Platform</h2>
        </Link>

        <div className="navbar-menu">
          {isAuthenticated ? (
            <div className="navbar-user">
              <span className="user-greeting">
                Welcome, {user?.username}!
              </span>
              <div className="navbar-actions">
                <Link to="/dashboard" className="navbar-link">
                  Dashboard
                </Link>
                <Link to="/courses" className="navbar-link">
                  Courses
                </Link>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="navbar-auth">
              <Link to="/login" className="navbar-link">
                Login
              </Link>
              <Link to="/register" className="navbar-button">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
