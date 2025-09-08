import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const { register, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!formData.username || formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters long';
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.phone || formData.phone.length < 10) {
      errors.phone = 'Please enter a valid phone number (at least 10 digits)';
    }

    if (!formData.password || formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.firstName || formData.firstName.length < 2) {
      errors.firstName = 'First name must be at least 2 characters long';
    }

    if (!formData.lastName || formData.lastName.length < 2) {
      errors.lastName = 'Last name must be at least 2 characters long';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    if (error) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const { confirmPassword, ...registrationData } = formData;
      await register(registrationData);
      navigate('/dashboard'); // Redirect to dashboard after successful registration
    } catch (err) {
      // Error is handled by AuthContext
      console.error('Registration error:', err);
    }
  };

  const onTeacherSubmit = async (e) => {
        e.preventDefault();
        try {
            await createTeacher({
                name: e.target.teacher_name.value,
                email: e.target.teacher_email.value,
                subject: e.target.subject.value
            });
            setTeacherCreated(true);
            setShowTeacherForm(false);
            // Fetch and show teacher list after creation
            fetchTeachers();
        } catch (error) {
            console.error('Teacher creation failed:', error);
        }
    }

    const fetchTeachers = async () => {
        try {
            const teacherList = await getTeachers();
            setTeachers(teacherList);
            setShowTeacherList(true);
        } catch (error) {
            console.error('Failed to fetch teachers:', error);
        }
    }

    const [showTeacherForm, setShowTeacherForm] = useState(false);
    const [teacherCreated, setTeacherCreated] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [showTeacherList, setShowTeacherList] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState(null);
    const [editFormData, setEditFormData] = useState({ name: '', email: '', subject: '' });

    const handleBecomeTeacher = () => {
        setShowTeacherForm(true);
    }

    const handleEditTeacher = (teacher) => {
        setEditingTeacher(teacher.id);
        setEditFormData({
            name: teacher.name,
            email: teacher.email,
            subject: teacher.subject
        });
    }

    const handleUpdateTeacher = async () => {
        try {
            await updateTeacher(editingTeacher, editFormData);
            setEditingTeacher(null);
            setEditFormData({ name: '', email: '', subject: '' });
            // Refresh the teacher list
            fetchTeachers();
        } catch (error) {
            console.error('Failed to update teacher:', error);
        }
    }

    const handleDeleteTeacher = async (teacherId) => {
        if (window.confirm('Are you sure you want to delete this teacher?')) {
            try {
                await deleteTeacher(teacherId);
                // Refresh the teacher list
                fetchTeachers();
            } catch (error) {
                console.error('Failed to delete teacher:', error);
            }
        }
    }

    const handleCancelEdit = () => {
        setEditingTeacher(null);
        setEditFormData({ name: '', email: '', subject: '' });
    }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Join our learning platform</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className={`form-input ${validationErrors.firstName ? 'error' : ''}`}
                placeholder="Enter your first name"
              />
              {validationErrors.firstName && (
                <span className="field-error">{validationErrors.firstName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className={`form-input ${validationErrors.lastName ? 'error' : ''}`}
                placeholder="Enter your last name"
              />
              {validationErrors.lastName && (
                <span className="field-error">{validationErrors.lastName}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className={`form-input ${validationErrors.username ? 'error' : ''}`}
              placeholder="Choose a username"
            />
            {validationErrors.username && (
              <span className="field-error">{validationErrors.username}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`form-input ${validationErrors.email ? 'error' : ''}`}
              placeholder="Enter your email"
            />
            {validationErrors.email && (
              <span className="field-error">{validationErrors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className={`form-input ${validationErrors.phone ? 'error' : ''}`}
              placeholder="Enter your phone number"
            />
            {validationErrors.phone && (
              <span className="field-error">{validationErrors.phone}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={`form-input ${validationErrors.password ? 'error' : ''}`}
                placeholder="Create a password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {validationErrors.password && (
              <span className="field-error">{validationErrors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-input-container">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className={`form-input ${validationErrors.confirmPassword ? 'error' : ''}`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {validationErrors.confirmPassword && (
              <span className="field-error">{validationErrors.confirmPassword}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="auth-button"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
