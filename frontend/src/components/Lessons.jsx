import React, { useEffect, useState } from 'react';
import { lessonService } from "../services/lessonService";
import { courseService } from "../services/courseService";
import { useAuth } from "../contexts/AuthContext";

const Lessons = () => {
    const { user } = useAuth()
        const [lessons, setLessons] = useState([])
        const [courses, setCourses] = useState([])
    
        const pageStyle = {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem',
            backgroundColor: '#f8f9fa',
            minHeight: '80vh'
        };
    
        const cardStyle = {
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '1.5rem',
            margin: '1rem 0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            border: '1px solid #e9ecef'
        };
    
        const formStyle = {
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
        };
    
        const inputStyle = {
            width: '100%',
            padding: '0.75rem',
            margin: '0.5rem 0',
            border: '2px solid #e9ecef',
            borderRadius: '4px',
            fontSize: '1rem',
            boxSizing: 'border-box',
            transition: 'border-color 0.3s ease'
        };
    
        const buttonStyle = {
            backgroundColor: '#27ae60',
            color: 'white',
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
            marginTop: '1rem'
        };
    
        const onCreateLesson = async (e) => {
            e.preventDefault();
            try {
                await lessonService.addLesson({
                    title: e.target.title.value,
                    description: e.target.description.value,
                    course: parseInt(e.target.course.value)
                });
                alert("Lesson Created Successfully! 🎉")
                e.target.reset();
            } catch (error) {
                alert("Error creating lesson ❌")
            }
            await getAllLessons()
        }

        const getAllLessons = async () => {
            try{
                const lessons = await lessonService.getLessons()
                setLessons(lessons.reverse())
            } catch {
                console.log("Error");   
            }        
        }

        const getAllCourses = async () => {
            try{
                const courses = await courseService.getCourses()
                setCourses(courses)
            } catch {
                console.log("Error");   
            }        
        }
    
        useEffect(()=>{
            if(user){
                getAllCourses()
                getAllLessons()
            }
        },[user])
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Lesson Management</h2>
      <p>This is where you can manage lessons.</p>
      <div>
        <form onSubmit={onCreateLesson}>
                    <input 
                        type="text" 
                        name="title" 
                        placeholder="Lesson Title" 
                        required 
                        style={inputStyle}
                        onFocus={(e) => e.target.style.borderColor = '#27ae60'}
                        onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                    />
                    <input 
                        type="text" 
                        name="description" 
                        placeholder="Description" 
                        required 
                        style={inputStyle}
                        onFocus={(e) => e.target.style.borderColor = '#27ae60'}
                        onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                    />
                    <select 
                        name="course" 
                        required 
                        style={inputStyle}
                        onFocus={(e) => e.target.style.borderColor = '#27ae60'}
                        onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                    >
                        <option value="">Select Course</option>
                        {courses?.map((course) => (
                            <option key={course.id} value={course.id}>
                                {course.title}
                            </option>
                        ))}
                    </select>
                    <button 
                        type="submit"
                        style={buttonStyle}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#229954'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#27ae60'}
                    >
                        Add Lesson
                    </button>
                </form>
      </div>
      <div>
                <h2 style={{color: '#2c3e50', marginBottom: '1rem'}}>📋 Lesson List</h2>
                {courses?.length === 0 ? (
                    <div style={{...cardStyle, textAlign: 'center', color: '#7f8c8d'}}>
                        <p>No lessons found. Add your first lesson above! 📚</p>
                    </div>
                ) : (
                    courses?.map((c)=>{
                        return (
                            <div key={c.id} style={cardStyle}>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <div>
                                        <h3 style={{color: '#2c3e50', margin: '0 0 0.5rem 0'}}>{c.title}</h3>
                                        <p style={{margin: '0.25rem 0', color: '#7f8c8d'}}>
                                            📧 {c.description}
                                        </p>
                                        <p style={{margin: '0.25rem 0', color: '#7f8c8d'}}>
                                            🎯 Course ID: {c.course}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
    </div>
  );
}

export default Lessons;