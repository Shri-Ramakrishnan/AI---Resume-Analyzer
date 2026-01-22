import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2>🚀 AI Resume Analyzer</h2>

      {token && (
        <div className="nav-links">
          <button className="btn" onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")
          }>
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>

          <Link to="/dashboard">Dashboard</Link>
          <Link to="/history">History</Link>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
