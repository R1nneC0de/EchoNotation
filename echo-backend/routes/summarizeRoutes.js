// routes/summarizeRoutes.js
const express = require("express");
const { generateSummary } = require("../controllers/summarizeController");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/summarize", authenticateToken, generateSummary);

module.exports = router;
