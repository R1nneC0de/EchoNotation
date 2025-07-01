const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const { sendEmail } = require("../controllers/emailController");

const router = express.Router();

router.post("/send-email", authenticateToken, sendEmail);

module.exports = router;
