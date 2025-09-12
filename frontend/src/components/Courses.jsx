import React, { useEffect, useState } from 'react';
import { courseService } from "../services/courseService";
import { teacherService } from "../services/teacherService";
import { useAuth } from "../contexts/AuthContext";

const Courses = () => {
    const { user } = useAuth()
        const [courses, setCourses] = useState([])
        const [teachers, setTeachers] = useState([])
    
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
    
        const onCreateCourse = async (e) => {
            e.preventDefault();
            try {
                await courseService.addCourse({
                    title: e.target.title.value,
                    description: e.target.description.value,
                    teacher: parseInt(e.target.teacher.value)
                });
                alert("Course Created Successfully! 🎉")
                e.target.reset();
            } catch (error) {
                alert("Error creating course ❌")
            }
            await getAllCourses()
        }

        const getAllCourses = async () => {
            try{
                const courses = await courseService.getCourses()
                setCourses(courses.reverse())
            } catch {
                console.log("Error");   
            }        
        }

        const getAllTeachers = async () => {
            try{
                const teachers = await teacherService.getTeachers()
                setTeachers(teachers)
            } catch {
                console.log("Error");   
            }        
        }
    
        useEffect(()=>{
            if(user){
                getAllCourses()
                getAllTeachers()
            }
        },[user])
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Courses Management</h2>
      <p>This is where you can manage courses.</p>
      <div>
        <form onSubmit={onCreateCourse}>
                    <input 
                        type="text" 
                        name="title" 
                        placeholder="Course Title" 
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
                        name="teacher" 
                        required 
                        style={inputStyle}
                        onFocus={(e) => e.target.style.borderColor = '#27ae60'}
                        onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                    >
                        <option value="">Select Teacher</option>
                        {teachers?.map((teacher) => (
                            <option key={teacher.id} value={teacher.id}>
                                {teacher.name}
                            </option>
                        ))}
                    </select>
                    <button 
                        type="submit"
                        style={buttonStyle}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#229954'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#27ae60'}
                    >
                        Add Course
                    </button>
                </form>
      </div>
      <div>
                <h2 style={{color: '#2c3e50', marginBottom: '1rem'}}>📋 Course List</h2>
                {courses?.length === 0 ? (
                    <div style={{...cardStyle, textAlign: 'center', color: '#7f8c8d'}}>
                        <p>No courses found. Add your first student above! 📚</p>
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
                                            🎯 Teacher ID: {c.teacher}
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

export default Courses;