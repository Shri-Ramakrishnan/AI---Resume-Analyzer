import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await axios.post("https://ai-resume-analyzer-backend-aqz0.onrender.com/api/auth/login", {
      email,
      password,
    });
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h1 className="auth-logo">🚀 AI Resume Analyzer</h1>
        <h2>Login</h2>

        <input className="auth-input" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input className="auth-input" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

        <button className="auth-btn" onClick={handleLogin}>Login</button>

        <p className="auth-footer">
          No account? <span onClick={() => navigate("/signup")}>Sign up</span>
        </p>
      </div>
    </div>
  );
}
