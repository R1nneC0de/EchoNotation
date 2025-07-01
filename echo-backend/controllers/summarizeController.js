// controllers/summarizeController.js

// Simulated summary function (replace with real Bedrock integration later)
function simulateSummary(transcript) {
  return `Summary: This is a smart summary of the transcript - "${transcript.slice(0, 60)}..."`;
}

const generateSummary = async (req, res) => {
  try {
    const { transcript } = req.body;
    if (!transcript) {
      return res.status(400).json({ error: "Missing transcript in request body" });
    }

    const summary = simulateSummary(transcript);
    console.log("Summary generated:", summary);

    res.json({ summary });
  } catch (err) {
    console.error("Summarization failed:", err);
    res.status(500).json({ error: "Summary error" });
  }
};

module.exports = { generateSummary };
