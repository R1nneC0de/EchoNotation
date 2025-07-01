require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authenticateToken = require("./authMiddleware");

const transcribeRouter = require("./transcribe");
const summarizeRouter = require("./controllers/summarize");
const emailRouter = require("./email");
const upload = require("./upload");
const scheduleRouter = require("./schedule");

const app = express();

app.use(cors());
app.use(express.json());

// Mount API routes
app.use("/", transcribeRouter);
app.use("/", summarizeRouter);
app.use("/", emailRouter);
app.use("/", scheduleRouter);

// Protected test route
app.get("/protected", authenticateToken, (req, res) => {
  res.json({
    message: "Secure data accessed!",
    userId: req.user.sub,
    email: req.user.email,
  });
});

// Upload route
app.post("/upload", authenticateToken, upload.single("recording"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  res.json({
    message: "File uploaded successfully",
    s3Url: req.file.location,
    key: req.file.key,
  });
});

app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));
