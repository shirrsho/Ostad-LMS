import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      await login({
        phone: e.target.phone.value,
        password: e.target.password.value
      });
      navigate('/teachers')
      
    } catch {
      console.log("Error")
    }
  }
  return (
    <div>
      <form onSubmit={handleLogin}>
        <input type="text" name="phone" placeholder="Phone" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}