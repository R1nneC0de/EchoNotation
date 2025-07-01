const AWS = require("aws-sdk");

AWS.config.update({
  region: process.env.AWS_REGION, // ✅ Use env
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const ses = new AWS.SES();

exports.sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ error: "Missing email parameters" });
  }

  const params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Text: { Data: text },
      },
      Subject: { Data: subject },
    },
    Source: process.env.SENDER_EMAIL, // ✅ Use env for sender
  };

  try {
    const result = await ses.sendEmail(params).promise();
    res.status(200).json({ message: "Email sent", result });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};
