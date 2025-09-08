import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { teacherService } from "../services/teacherService";
import { useEffect, useState } from "react";

const Dashboard = () => {

    const { user, isAuthLoading, logout } = useAuth()
    const [teachers, setTeachers] = useState([])

    const onCreateTeacher = async (e) => {
        e.preventDefault();
        try {
            await teacherService.addTeacher({
                name: e.target.name.value,
                subject: e.target.subject.value,
                email: e.target.email.value
            });
            alert("Teacher Created")
        } catch (error) {
            console.log("Error")
        }
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
        getAllTeacher()
    },[onCreateTeacher])

    if(!user && !isAuthLoading) return <Navigate to='/login' />

    return (
        <div>
            Dashboard of {user?.username}
            <button onClick={logout}>Logout</button>

            Add Teacher Here:
            <form onSubmit={onCreateTeacher}>
                <input type="text" name="name" placeholder="Name" required />
                <input type="text" name="subject" placeholder="Subject" required />
                <input type="email" name="email"placeholder="Email" required/>
                <button type="submit">Add Teacher</button>
            </form>

            <div>
                {teachers?.map((t)=>{
                    return <div key={t.id}>{t.name}, {t.subject}, {t.email}</div>
                })}
            </div>
        </div>
    )
}

export default Dashboard;