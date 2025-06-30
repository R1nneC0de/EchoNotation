require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authenticateToken = require("./authMiddleware");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/protected", authenticateToken, (req, res) => {
  res.json({
    message: "Secure data accessed!",
    userId: req.user.sub,
  });
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));

const upload = require("./upload");

// POST /upload
app.post("/upload", authenticateToken, upload.single("recording"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  res.json({
    message: "File uploaded successfully",
    s3Url: req.file.location,
    key: req.file.key,
  });
});
