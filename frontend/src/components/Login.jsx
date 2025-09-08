import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      await login({
        phone: e.target.phone.value,
        password: e.target.password.value
      });
      navigate('/dashboard')
      
    } catch {
      console.log("Error")
    }
  }
  return (
    <div>
      {user ? <div><p>Logged in as: {user.username}</p><button onClick={async () => await logout()}>Logout</button></div> : <p>Please log in</p>}
      <form onSubmit={handleLogin}>
        <input type="text" name="phone" placeholder="Phone" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}