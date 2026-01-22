const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authmiddleware");
const {
  analyzeResume,
  improveResume,
} = require("../controllers/analysiscontroller");

const Analysis = require("../models/Analysis");

router.post("/analyze", authMiddleware, analyzeResume);
router.post("/improve", authMiddleware, improveResume);

router.get("/history", authMiddleware, async (req, res) => {
  try {
    const history = await Analysis.find({ user: req.user.userId })
      .populate("resume", "fileName")
      .sort({ createdAt: -1 });

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch analysis history" });
  }
});

module.exports = router;
