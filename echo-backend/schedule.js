const express = require("express");
const router = express.Router();
const getGraphAccessToken = require("./utils/getGraphAccessToken");
const axios = require("axios");

router.post("/schedule", async (req, res) => {
  try {
    const graphToken = await getGraphAccessToken();

    const { subject, startTime, endTime, attendees } = req.body;

    const response = await axios.post(
      "https://graph.microsoft.com/v1.0/me/events",
      {
        subject,
        start: { dateTime: startTime, timeZone: "UTC" },
        end: { dateTime: endTime, timeZone: "UTC" },
        attendees: attendees.map(email => ({
          emailAddress: { address: email },
          type: "required"
        }))
      },
      {
        headers: {
          Authorization: `Bearer ${graphToken}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.status(200).json({ event: response.data });
  } catch (err) {
    console.error("Schedule error:", err?.response?.data || err.message);
    res.status(500).json({ error: "Failed to schedule meeting" });
  }
});

module.exports = router;
