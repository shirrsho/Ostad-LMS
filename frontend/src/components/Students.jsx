import { useAuth } from "../contexts/AuthContext";
import { studentService } from "../services/studentService";
import { useEffect, useState } from "react";

const Students = () => {
    const { user } = useAuth()
    const [students, setStudents] = useState([])

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

    const onCreateStudent = async (e) => {
        e.preventDefault();
        try {
            await studentService.addStudent({
                name: e.target.name.value,
                email: e.target.email.value,
                enrollment_date: e.target.enrollment_date.value,
                roll_number: e.target.roll_number.value
            });
            alert("Student Created Successfully! 🎉")
            e.target.reset();
        } catch (error) {
            alert("Error creating student ❌")
        }
        await getAllStudents()
    }

    const getAllStudents = async () => {
        try{
            const students = await studentService.getStudents()
            setStudents(students.reverse())
        } catch {
            console.log("Error");   
        }        
    }

    useEffect(()=>{
        if(user){
            getAllStudents()
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
                👨‍🎓 Student Management
            </h1>

            <div style={formStyle}>
                <h2 style={{color: '#27ae60', marginBottom: '1rem'}}>➕ Add New Student</h2>
                <form onSubmit={onCreateStudent}>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Student Name" 
                        required 
                        style={inputStyle}
                        onFocus={(e) => e.target.style.borderColor = '#27ae60'}
                        onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                    />
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email Address" 
                        required
                        style={inputStyle}
                        onFocus={(e) => e.target.style.borderColor = '#27ae60'}
                        onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                    />
                    <input 
                        type="date" 
                        name="enrollment_date" 
                        placeholder="Enrollment Date" 
                        required
                        style={inputStyle}
                        onFocus={(e) => e.target.style.borderColor = '#27ae60'}
                        onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                    />
                    <input 
                        type="text" 
                        name="roll_number" 
                        placeholder="Roll Number" 
                        required
                        style={inputStyle}
                        onFocus={(e) => e.target.style.borderColor = '#27ae60'}
                        onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                    />
                    <button 
                        type="submit"
                        style={buttonStyle}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#229954'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#27ae60'}
                    >
                        Add Student
                    </button>
                </form>
            </div>

            <div>
                <h2 style={{color: '#2c3e50', marginBottom: '1rem'}}>📋 Students List</h2>
                {students?.length === 0 ? (
                    <div style={{...cardStyle, textAlign: 'center', color: '#7f8c8d'}}>
                        <p>No students found. Add your first student above! 📚</p>
                    </div>
                ) : (
                    students?.map((s)=>{
                        return (
                            <div key={s.id} style={cardStyle}>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <div>
                                        <h3 style={{color: '#2c3e50', margin: '0 0 0.5rem 0'}}>{s.name}</h3>
                                        <p style={{margin: '0.25rem 0', color: '#7f8c8d'}}>
                                            📧 {s.email}
                                        </p>
                                        <p style={{margin: '0.25rem 0', color: '#7f8c8d'}}>
                                            🎯 Roll: {s.roll_number}
                                        </p>
                                        <p style={{margin: '0.25rem 0', color: '#7f8c8d'}}>
                                            📅 Enrolled: {s.enrollment_date}
                                        </p>
                                    </div>
                                    <div style={{
                                        backgroundColor: '#27ae60',
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

export default Students;
