// routes/scheduleRoutes.js
const express = require("express");
const router = express.Router();
const { createMeeting } = require("../controllers/scheduleController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/schedule", verifyToken, createMeeting);

module.exports = router;
