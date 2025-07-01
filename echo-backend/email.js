// email.js
const express = require("express");
const router = express.Router();
const authenticateToken = require("./authMiddleware");
const AWS = require("aws-sdk");

const ses = new AWS.SES({
  region: process.env.AWS_REGION,
});

router.post("/send-email", authenticateToken, async (req, res) => {
  try {
    const { summary } = req.body;
    const recipientEmail = req.user.email; // from the decoded token

    if (!summary || !recipientEmail) {
      return res.status(400).json({ error: "Missing summary or recipient email" });
    }

    const params = {
      Source: process.env.SENDER_EMAIL,
      Destination: { ToAddresses: [recipientEmail] },
      Message: {
        Subject: { Data: "Your Meeting Summary from EchoNotation" },
        Body: {
          Text: {
            Data: `Here is your meeting summary:\n\n${summary}`,
          },
        },
      },
    };

    await ses.sendEmail(params).promise();
    console.log(`Email sent to ${recipientEmail}`);
    res.json({ message: `Email sent to ${recipientEmail}` });
  } catch (err) {
    console.error("SES email error:", err);
    res.status(500).json({ error: "Email failed to send" });
  }
});

module.exports = router;
