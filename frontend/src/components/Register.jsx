import React from 'react'
import { useAuth } from "../contexts/AuthContext";

export default function Register() {

    const { register, user, logout } = useAuth();
    
    const onSubmittt = async (e) => {
        e.preventDefault();
        console.log(e.target.password.value);
        await register({
            username: e.target.username.value,
            password: e.target.password.value,
            phone: e.target.phone.value,
            firstName: e.target.first_name.value,
            lastName: e.target.last_name.value,
        })
        console.log(user);
        
    }

    const handleLogout = () => {
        logout();
    }
  return (
    <div>
        {user ? <div><p>Login kore ache ei naam e: {user.username}</p><button onClick={handleLogout}>Logout</button></div> : <p>Please register</p>}
    <form onSubmit={onSubmittt}>
        <input type="text" name="first_name" placeholder="First Name" required />
        <input type="text" name="last_name" placeholder="Last Name" required />
        <input type="text" name="username" placeholder="Username" required />
        <input type="text" name="phone" placeholder="Phone" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Register</button>
    </form>
    </div>
  )
}
