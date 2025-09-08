import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container">
      <div style={{ padding: '2rem 0' }}>
        <h1 style={{ color: '#333', marginBottom: '2rem' }}>
          Dashboard
        </h1>
        
        <div style={{ 
          background: 'white', 
          padding: '2rem', 
          borderRadius: '12px', 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: '#667eea', marginBottom: '1rem' }}>
            Welcome back, {user?.first_name || user?.username}!
          </h2>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            Here's what's happening in your learning journey:
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '1.5rem',
              borderRadius: '8px'
            }}>
              <h3>My Courses</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0' }}>0</p>
              <p>Enrolled courses</p>
            </div>
            
            <div style={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              padding: '1.5rem',
              borderRadius: '8px'
            }}>
              <h3>Assignments</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0' }}>0</p>
              <p>Pending submissions</p>
            </div>
            
            <div style={{
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white',
              padding: '1.5rem',
              borderRadius: '8px'
            }}>
              <h3>Progress</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0' }}>0%</p>
              <p>Overall completion</p>
            </div>
          </div>
        </div>
        
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ color: '#333', marginBottom: '1rem' }}>Recent Activity</h3>
          <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>
            No recent activity. Start by enrolling in a course!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
