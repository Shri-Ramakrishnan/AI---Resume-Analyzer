import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function History() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get("https://ai-resume-analyzer-backend-aqz0.onrender.com/api/analysis/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setHistory(res.data))
      .catch(() => alert("Failed to load history"));
  }, []);

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>📜 Analysis History</h1>

      {history.length === 0 && <p>No analysis yet</p>}

      {history.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginTop: "15px",
            cursor: "pointer",
          }}
          onClick={() => navigate(`/analysis/${item._id}`)}
        >
          <p><b>Resume:</b> {item.resume.fileName}</p>
          <p><b>ATS Score:</b> {item.atsScore}</p>
          <p style={{ fontSize: "12px", color: "#666" }}>
            {new Date(item.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
