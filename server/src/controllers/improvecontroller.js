const Analysis = require("../models/Analysis");
const improveService = require("../services/improveservice");

exports.improveResume = async (req, res) => {
  try {
    const { analysisId } = req.params;

    const analysis = await Analysis.findById(analysisId);
    if (!analysis) {
      return res.status(404).json({ message: "Analysis not found" });
    }

    const improved = await improveService(analysis);

    res.json({ improved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to improve resume" });
  }
};
