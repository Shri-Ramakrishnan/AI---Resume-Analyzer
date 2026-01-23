const express = require("express");
const router = express.Router();

const upload = require("../middlewares/uploadmiddleware");
const authMiddleware = require("../middlewares/authmiddleware");
const { uploadResume } = require("../controllers/resumecontroller");

router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  uploadResume
);

module.exports = router;
