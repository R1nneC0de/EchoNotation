const express = require("express");
const router = express.Router();
const authenticateToken = require("../authMiddleware");
const { uploadRecording } = require("../controllers/uploadController");
const upload = require("../utils/multerUpload");

router.post("/upload", authenticateToken, upload.single("recording"), uploadRecording);

module.exports = router;
