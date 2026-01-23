const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authroutes");
const resumeRoutes = require("./routes/resumeroutes");
const analysisRoutes = require("./routes/analysisroutes");
const improveRoutes = require("./routes/improveroutes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-resume-analyzer-psi-cyan.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api/improve", improveRoutes);

app.get("/", (req, res) => {
  res.send("🚀 AI Resume Analyzer Backend is running");
});

module.exports = app;
