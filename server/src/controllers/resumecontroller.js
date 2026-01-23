const extractTextFromResume = require("../services/resumeparser");
const Resume = require("../models/Resume");

exports.uploadResume = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required" });
    }


    const resumeText = await extractTextFromResume(
      req.file.path,
      req.file.mimetype
    );


    console.log("📄 Extracted resume text length:", resumeText.length);

    if (!resumeText || resumeText.trim().length < 30) {
      return res.status(400).json({
        message:
          "Resume text could not be extracted properly. Please upload a text-based PDF or DOCX.",
      });
    }


    const resume = await Resume.create({
      user: req.user.userId,
      fileName: req.file.originalname,
      filePath: req.file.path,
      content: resumeText,
    });

  
    res.status(201).json({
      message: "Resume uploaded successfully",
      resumeId: resume._id,
    });
  } catch (error) {
    console.error("❌ Resume upload error:", error);
    res.status(500).json({ message: "Resume upload failed" });
  }
};
