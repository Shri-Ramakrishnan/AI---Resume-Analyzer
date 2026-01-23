import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";

export default function Dashboard() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [resumeId, setResumeId] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/");
  }, [navigate, token]);

  const uploadResume = async () => {
    if (!file) return alert("Select a resume");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await axios.post(
        "https://ai-resume-analyzer-backend-aqz0.onrender.com/api/resume/upload",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setResumeId(res.data.resumeId);
      alert("Resume uploaded successfully");
    } catch {
      alert("Resume upload failed");
    }
  };

  const analyzeResume = async () => {
    if (!resumeId || !jobDescription) return;

    setLoading(true);
    setAction("analyze");

    try {
      const res = await axios.post(
        "https://ai-resume-analyzer-backend-aqz0.onrender.com/api/analysis/analyze",
        { resumeId, jobDescription },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setAnalysis(res.data.analysis);
    } catch {
      alert("Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const improveResume = async () => {
    if (!resumeId || !jobDescription) return;

    setLoading(true);
    setAction("improve");

    try {
      const res = await axios.post(
        "https://ai-resume-analyzer-backend-aqz0.onrender.com/api/analysis/improve",
        { resumeId, jobDescription },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setAnalysis(res.data.improvedResume);
    } catch {
      alert("Improve failed");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!analysis) return;

    const pdf = new jsPDF();
    pdf.text(
      action === "improve"
        ? "Improved Resume Analysis"
        : "Resume Analysis",
      10,
      10
    );

    pdf.text(`ATS Score: ${analysis.atsScore}/100`, 10, 25);
    pdf.save("resume-analysis.pdf");
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>🚀 AI Resume Analyzer</h1>
          <p className="muted">
            Analyze & improve your resume for any job role
          </p>
        </div>
      </div>

      {/* Upload Resume */}
      <div className="card">
        <h2>📤 Upload Resume</h2>

        <div className="file-upload">
          <label htmlFor="resume-upload" className="file-btn">
            📎 Select Resume (PDF)
          </label>

          <span className="file-name">
            {file ? file.name : "No file selected"}
          </span>

          <input
            id="resume-upload"
            type="file"
            accept=".pdf"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button
          className="btn btn-secondary"
          onClick={uploadResume}
          disabled={!file}
        >
          Upload Resume
        </button>
      </div>

      {/* Job Description */}
      <div className="card primary">
        <h2>🧠 Job Description</h2>

        <textarea
          rows="5"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste job description here..."
        />

        <button
          className="btn btn-primary"
          onClick={analyzeResume}
          disabled={!resumeId || loading}
        >
          {!resumeId
            ? "Upload resume first"
            : loading && action === "analyze"
            ? "Analyzing..."
            : "Analyze Resume"}
        </button>
      </div>

      {/* Improve Resume */}
      <div className="card">
        <h2>✨ Improve Resume</h2>

        <button
          className="btn btn-secondary"
          onClick={improveResume}
          disabled={!resumeId || loading}
        >
          {!resumeId
            ? "Upload resume first"
            : loading && action === "improve"
            ? "Improving..."
            : "Improve Resume"}
        </button>
      </div>

      {/* Result */}
      {analysis && (
        <div className="card">
          <h2>
            {action === "improve"
              ? "✨ Improved Resume Result"
              : "📊 Analysis Result"}
          </h2>

          <p>
            <b>ATS Score:</b> {analysis.atsScore}/100
          </p>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${analysis.atsScore}%` }}
            />
          </div>

          <h3>✅ Matched Skills</h3>
          {analysis.matchedSkills.map((s) => (
            <span className="badge green" key={s}>
              {s}
            </span>
          ))}

          <h3>❌ Missing Skills</h3>
          {analysis.missingSkills.map((s) => (
            <span className="badge red" key={s}>
              {s}
            </span>
          ))}

          <h3>🎯 Role Fit</h3>
          <p>{analysis.roleFitSummary}</p>

          <button className="btn btn-secondary" onClick={downloadPDF}>
            📄 Download PDF
          </button>
        </div>
      )}
    </div>
  );
}
