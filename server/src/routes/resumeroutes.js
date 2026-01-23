const express = require("express");
const router = express.Router();

const upload = require("../middlewares/uploadmiddleware");
const authMiddleware = require("../middlewares/authmiddleware");
const { uploadResume } = require("../controllers/resumecontroller");

/**
 * @route   
 * @desc    
 * @access  
 */
router.post(
  "/upload",
  authMiddleware,
  (req, res, next) => {
    upload.single("resume")(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          message: err.message || "File upload failed",
        });
      }
      next();
    });
  },
  uploadResume
);

module.exports = router;
