const express = require("express");
const router = express.Router();

console.log("✅ authroutes loaded");

const { signup, login } = require("../controllers/authcontroller");

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
