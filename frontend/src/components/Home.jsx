import React, { useEffect, useState } from 'react';
import { courseService } from '../services/courseService';
import { enrollmentService } from '../services/enrollmentService';

const Home = () => {
const [courses, setCourses] = useState([]);
const getAllCourses = async () => {
            try{
                const courses = await courseService.getCourses()
                setCourses(courses.reverse())
            } catch {
                console.log("Error");   
            }        
        }
        useEffect(()=>{
            getAllCourses()
        },[])

        const onEnroll = async (e) => {
            e.preventDefault();
            try{
                await enrollmentService.addEnrollment({
                    student: parseInt(e.target.student.value),
                    course: parseInt(e.target.course.value),
                    enrollment_date: new Date().toISOString().split('T')[0]
                });
                alert(`Enrolled in course with Student ID: ${e.target.student.value}`);
            } catch(error) {
                alert(error) 
            }
        }

  return (
    <div style={{ 
      padding: '3rem',
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: '#f5f5f5'
    }}>
        <h2 style={{
          textAlign: 'center',
          color: '#2c3e50',
          marginBottom: '2rem',
          fontSize: '2.5rem'
        }}>Welcome to the Learning Management System</h2>
        {courses.length > 0 ? (
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              padding: '2rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <h3 style={{
                  color: '#34495e',
                  marginBottom: '1.5rem'
                }}>Available Courses:</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0
                }}>
                    {courses.map(course => (
                        <li key={course.id} style={{
                          padding: '1rem',
                          marginBottom: '1rem',
                          border: '1px solid #e0e0e0',
                          borderRadius: '4px',
                          transition: 'transform 0.2s',
                          cursor: 'pointer',
                          ':hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                          }
                        }}>
                            <strong style={{
                              color: '#3498db',
                              fontSize: '1.1rem'
                            }}>{course.title}</strong>
                            <p style={{
                              color: '#666',
                              marginTop: '0.5rem'
                            }}>{course.description}</p>
                            <div>
                                <form onSubmit={onEnroll}>
                                    <input name='course' hidden value={course.id} />
                                    <input name='student' placeholder="Student ID" />
                                    <button>Enroll</button>
                                </form>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        ) : (
            <p style={{
              textAlign: 'center',
              color: '#7f8c8d',
              fontSize: '1.2rem'
            }}>No courses available at the moment.</p>
        )}
    </div>
  );
};

export default Home;
