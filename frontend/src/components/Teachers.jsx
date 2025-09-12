import { useAuth } from "../contexts/AuthContext";
import { teacherService } from "../services/teacherService";
import { useEffect, useState } from "react";

const Teachers = () => {
    const { user, logout } = useAuth()
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
        backgroundColor: '#3498db',
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

    const onCreateTeacher = async (e) => {
        e.preventDefault();
        try {
            await teacherService.addTeacher({
                name: e.target.name.value,
                subject: e.target.subject.value,
                email: e.target.email.value
            });
            alert("Teacher Created Successfully! 🎉")
            e.target.reset();
        } catch (error) {
            alert("Error creating teacher ❌")
        }
        await getAllTeacher()
    }

    const getAllTeacher = async () => {
        try{
            const ts = await teacherService.getTeachers()
            setTeachers(ts.reverse())
        } catch {
            console.log("Error");   
        }        
    }

    useEffect(()=>{
        if(user){
            getAllTeacher()
        }
    },[user])

    return (
        <div style={pageStyle}>
            <h1 style={{
                textAlign: 'center',
                color: '#2c3e50',
                marginBottom: '2rem',
                fontSize: '2.5rem'
            }}>
                👨‍🏫 Teacher Management
            </h1>

            <div style={formStyle}>
                <h2 style={{color: '#3498db', marginBottom: '1rem'}}>➕ Add New Teacher</h2>
                <form onSubmit={onCreateTeacher}>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Teacher Name" 
                        required 
                        style={inputStyle}
                        onFocus={(e) => e.target.style.borderColor = '#3498db'}
                        onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                    />
                    <input 
                        type="text" 
                        name="subject" 
                        placeholder="Subject" 
                        required 
                        style={inputStyle}
                        onFocus={(e) => e.target.style.borderColor = '#3498db'}
                        onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                    />
                    <input 
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        required
                        style={inputStyle}
                        onFocus={(e) => e.target.style.borderColor = '#3498db'}
                        onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                    />
                    <button 
                        type="submit"
                        style={buttonStyle}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
                    >
                        Add Teacher
                    </button>
                </form>
            </div>

            <div>
                <h2 style={{color: '#2c3e50', marginBottom: '1rem'}}>📋 Teachers List</h2>
                {teachers?.length === 0 ? (
                    <div style={{...cardStyle, textAlign: 'center', color: '#7f8c8d'}}>
                        <p>No teachers found. Add your first teacher above! 📚</p>
                    </div>
                ) : (
                    teachers?.map((t)=>{
                        return (
                            <div key={t.id} style={cardStyle}>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <div>
                                        <h3 style={{color: '#2c3e50', margin: '0 0 0.5rem 0'}}>{t.id}</h3>
                                        <h3 style={{color: '#2c3e50', margin: '0 0 0.5rem 0'}}>{t.name}</h3>
                                        <p style={{margin: '0.25rem 0', color: '#7f8c8d'}}>
                                            📧 {t.email}
                                        </p>
                                        <p style={{margin: '0.25rem 0', color: '#7f8c8d'}}>
                                            📚 Subject: {t.subject}
                                        </p>
                                    </div>
                                    <div style={{
                                        backgroundColor: '#3498db',
                                        color: 'white',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '20px',
                                        fontSize: '0.9rem'
                                    }}>
                                        Active
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default Teachers;
