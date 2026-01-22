const Resume = require("../models/Resume");
const Analysis = require("../models/Analysis");
const analyzeResumeWithGroq = require("../services/aiservice");

/**
 * Analyze resume vs job description
 */
exports.analyzeResume = async (req, res) => {
  try {
    const { resumeId, jobDescription } = req.body;

    if (!resumeId || !jobDescription) {
      return res.status(400).json({ message: "resumeId and jobDescription required" });
    }

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const aiResult = await analyzeResumeWithGroq(
      resume.content,
      jobDescription
    );

    const analysis = await Analysis.create({
      user: req.user.userId,
      resume: resume._id,
      ...aiResult,
    });

    res.status(200).json({
      message: "Analysis successful",
      analysis,
    });
  } catch (error) {
    console.error("❌ Analyze error:", error);
    res.status(500).json({ message: "Analysis failed" });
  }
};

/**
 * Improve / rewrite resume using AI
 */
exports.improveResume = async (req, res) => {
  try {
    const { resumeId, jobDescription } = req.body;

    if (!resumeId || !jobDescription) {
      return res.status(400).json({ message: "resumeId and jobDescription required" });
    }

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const improvedText = await analyzeResumeWithGroq(
      resume.content,
      jobDescription
    );

    res.status(200).json({
      message: "Resume improved successfully",
      improvedResume: improvedText,
    });
  } catch (error) {
    console.error("❌ Improve error:", error);
    res.status(500).json({ message: "Resume improvement failed" });
  }
};
