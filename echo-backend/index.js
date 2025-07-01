require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authenticateToken = require("./middleware/authMiddleware");

const transcribeRouter = require("./routes/transcribeRoutes");
const summarizeRouter = require("./routes/summarizeRoutes");
const emailRouter = require("./routes/emailRoutes");
const scheduleRouter = require("./routes/scheduleRoutes");
const uploadRouter = require("./routes/upload");

const app = express();

app.use(cors());
app.use(express.json());

// Route mounting
app.use("/", transcribeRouter);
app.use("/", summarizeRouter);
app.use("/", emailRouter);
app.use("/", scheduleRouter);
app.use("/", uploadRouter);

// Protected route
app.get("/protected", authenticateToken, (req, res) => {
  res.json({
    message: "Secure data accessed!",
    userId: req.user.sub,
    email: req.user.email,
  });
});

app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));
