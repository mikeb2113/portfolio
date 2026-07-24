import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import "dotenv/config";

const app = express();

app.use(cors({
  origin: "http://localhost:8443",
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Email server is running");
});

app.post("/api/contact", async (req, res) => {
  const { message } = req.body;
  const { subject_line } = req.body;

  if (!message?.trim()) {
    return res.status(400).json({
      error: "Message is required",
    });
  }

  console.log("Received contact request:", message);

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();
    console.log("Gmail authentication successful");

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "mikebermudez2113@gmail.com",
      subject: subject_line,
      text: message,
    });

    console.log("Email sent:", info.messageId);

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.error("Email error:", err);

    res.status(500).json({
      error: err.message,
    });
  }
});

app.listen(3001, () => {
  console.log("Email server running at http://localhost:3001");
});