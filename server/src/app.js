const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authroutes");
const resumeRoutes = require("./routes/resumeroutes");
const analysisRoutes = require("./routes/analysisroutes");
const improveRoutes = require("./routes/improveroutes");

const app = express();

const allowedOrigins = [
  /^http:\/\/localhost:5173$/,
  /^https:\/\/.*\.vercel\.app$/,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      const allowed = allowedOrigins.some((pattern) =>
        pattern.test(origin)
      );

      if (allowed) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
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
  res.status(200).send("🚀 AI Resume Analyzer Backend is running");
});

module.exports = app;
