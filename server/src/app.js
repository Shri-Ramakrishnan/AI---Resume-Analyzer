const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authroutes");
const resumeRoutes = require("./routes/resumeroutes");
const analysisRoutes = require("./routes/analysisroutes");
const improveRoutes = require("./routes/improveroutes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-resume-analyzer-268g75jal-shri-ramakrishnans-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed for this origin"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

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
