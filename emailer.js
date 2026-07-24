import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import "dotenv/config";

const app = express();

const allowedOrigins = [
  "http://localhost:8443",
  "http://localhost:5173",
  process.env.FRONTEND_URL,
  process.env.PORT,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests with no Origin, such as health checks
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`Origin not allowed by CORS: ${origin}`));
    },
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Email server is running");
});

app.post("/api/contact", async (req, res) => {
  const { message, subject_line } = req.body;

  if (!message?.trim()) {
    return res.status(400).json({
      error: "Message is required",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO ?? process.env.EMAIL_USER,
      subject: subject_line?.trim() || "Portfolio contact message",
      text: message.trim(),
    });

    console.log("Email sent:", info.messageId);

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.error("Email error:", err);

    return res.status(500).json({
      error: "Unable to send email",
    });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Email server running on port ${PORT}`);
});