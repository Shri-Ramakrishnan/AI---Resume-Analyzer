const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    atsScore: Number,
    matchedSkills: [String],
    missingSkills: [String],
    strengths: [String],
    weaknesses: [String],
    suggestions: [String],
    roleFitSummary: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Analysis", analysisSchema);
