const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authroutes");
const resumeRoutes = require("./routes/resumeroutes");
const analysisRoutes = require("./routes/analysisroutes");
const improveRoutes = require("./routes/improveroutes");

const app = express(); 

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api/improve", improveRoutes); 

module.exports = app;
