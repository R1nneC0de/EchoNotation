const upload = require("../utils/multerUpload");

const uploadRecording = (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  res.json({
    message: "File uploaded successfully",
    s3Url: req.file.location,
    key: req.file.key,
  });
};

module.exports = { uploadRecording };
