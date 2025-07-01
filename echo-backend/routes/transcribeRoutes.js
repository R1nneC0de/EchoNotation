// routes/transcribeRoutes.js

const express = require("express");
const { transcribeAudio } = require("../controllers/transcribeController");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/transcribe", authenticateToken, transcribeAudio);

module.exports = router;
