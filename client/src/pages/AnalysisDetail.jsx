import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/analysisDetail.css";

export default function AnalysisDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get("http://localhost:5000/api/analysis/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const found = res.data.find((a) => a._id === id);
        setAnalysis(found);
      })
      .catch(() => alert("Failed to load analysis"))
      .finally(() => setLoading(false));
  }, [id, navigate, token]);

  if (loading) {
    return <div className="analysis-loading">Loading analysis...</div>;
  }

  if (!analysis) {
    return <div className="analysis-error">Analysis not found</div>;
  }

  return (
    <div className="analysis-page">
      <div className="analysis-card">
        <button className="back-btn" onClick={() => navigate("/history")}>
          ← Back to History
        </button>

        <h1 className="analysis-title">📊 Analysis Details</h1>

        {/* ATS SCORE */}
        <div className="ats-section">
          <p className="ats-label">
            ATS Score: <span>{analysis.atsScore}/100</span>
          </p>
          <div className="ats-bar">
            <div
              className="ats-fill"
              style={{ width: `${analysis.atsScore}%` }}
            />
          </div>
        </div>

        <Section title="✅ Matched Skills">
          {analysis.matchedSkills.map((skill, i) => (
            <Badge key={i} text={skill} type="green" />
          ))}
        </Section>

        <Section title="❌ Missing Skills">
          {analysis.missingSkills.map((skill, i) => (
            <Badge key={i} text={skill} type="red" />
          ))}
        </Section>

        <Section title="💪 Strengths">
          <List items={analysis.strengths} />
        </Section>

        <Section title="⚠️ Weaknesses">
          <List items={analysis.weaknesses} />
        </Section>

        <Section title="🛠 Suggestions">
          <List items={analysis.suggestions} />
        </Section>

        <Section title="🎯 Role Fit Summary">
          <p className="role-fit">{analysis.roleFitSummary}</p>
        </Section>
      </div>
    </div>
  );
}

/* ===================== */
/* Helper Components */
/* ===================== */

function Section({ title, children }) {
  return (
    <div className="section">
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
}

function Badge({ text, type }) {
  return <span className={`badge ${type}`}>{text}</span>;
}

function List({ items }) {
  return (
    <ul className="list">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
