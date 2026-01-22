const extractTextFromResume = require("../services/resumeparser");
const Resume = require("../models/Resume");

exports.uploadResume = async (req, res) => {
  try {
    // 1️⃣ Validate file
    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    // 2️⃣ Extract text
    const resumeText = await extractTextFromResume(
      req.file.path,
      req.file.mimetype
    );

    // 🔍 Debug log (VERY IMPORTANT while building)
    console.log("📄 Extracted resume text length:", resumeText.length);

    if (!resumeText || resumeText.trim().length < 30) {
      return res.status(400).json({
        message:
          "Resume text could not be extracted properly. Please upload a text-based PDF or DOCX.",
      });
    }

    // 3️⃣ Save resume
    const resume = await Resume.create({
      user: req.user.userId,
      fileName: req.file.originalname,
      filePath: req.file.path,
      content: resumeText,
    });

    // 4️⃣ Response
    res.status(201).json({
      message: "Resume uploaded successfully",
      resumeId: resume._id,
    });
  } catch (error) {
    console.error("❌ Resume upload error:", error);
    res.status(500).json({ message: "Resume upload failed" });
  }
};
