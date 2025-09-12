import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav style={{
      width: '100%',
      padding: '1rem',
      backgroundColor: '#2c3e50',
      borderBottom: '3px solid #3498db',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}>
            <Link to="/" style={{
              textDecoration: 'none',
              color: '#ecf0f1',
              fontSize: '1.5rem'
            }}>🎓 LMS System</Link>
          </div>
          
          {/* Navigation Links */}
          <div style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center'
          }}>
            {user ? (
              <>
                <Link to="/teachers" style={{
                  textDecoration: 'none',
                  color: '#ecf0f1',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  transition: 'background-color 0.3s',
                  backgroundColor: 'transparent'
                }} onMouseOver={(e) => e.target.style.backgroundColor = '#34495e'}
                   onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>
                  👨‍🏫 Teachers
                </Link>
                <Link to="/students" style={{
                  textDecoration: 'none',
                  color: '#ecf0f1',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  transition: 'background-color 0.3s',
                  backgroundColor: 'transparent'
                }} onMouseOver={(e) => e.target.style.backgroundColor = '#34495e'}
                   onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>
                  👨‍🎓 Students
                </Link>
                <Link to="/courses" style={{
                  textDecoration: 'none',
                  color: '#ecf0f1',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  transition: 'background-color 0.3s',
                  backgroundColor: 'transparent'
                }} onMouseOver={(e) => e.target.style.backgroundColor = '#34495e'}
                   onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>
                  📚 Courses
                </Link>
                <Link to="/lessons" style={{
                  textDecoration: 'none',
                  color: '#ecf0f1',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  transition: 'background-color 0.3s',
                  backgroundColor: 'transparent'
                }} onMouseOver={(e) => e.target.style.backgroundColor = '#34495e'}
                   onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>
                  📖 Lessons
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" style={{
                  textDecoration: 'none',
                  color: '#ecf0f1',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  backgroundColor: '#3498db'
                }}>
                  🔑 Login
                </Link>
                <Link to="/register" style={{
                  textDecoration: 'none',
                  color: '#ecf0f1',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  backgroundColor: '#27ae60'
                }}>
                  📝 Register
                </Link>
              </>
            )}
          </div>

          <div>
            {user ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <p style={{margin: 0, color: '#ecf0f1'}}>
                  Welcome, <span style={{fontWeight: 'bold', color: '#3498db'}}>{user.username}</span>
                </p>
                <button 
                  onClick={async () => await logout()}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#c0392b'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#e74c3c'}
                >
                  🚪 Logout
                </button>
              </div>
            ) : (
              <p style={{margin: 0, color: '#ecf0f1'}}>Please log in</p>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
