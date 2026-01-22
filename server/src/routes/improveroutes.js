const express = require("express");
const router = express.Router();
const { improveResume } = require("../controllers/improvecontroller");
const auth = require("../middlewares/authmiddleware");

router.post("/", auth, improveResume);

module.exports = router;
