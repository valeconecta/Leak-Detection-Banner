import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Estimate Form
  app.post("/api/estimate", async (req, res) => {
    const { fullName, phone, email, address, service, message, preferredTime } = req.body;

    if (!fullName || !phone || !email || !address || !service) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      // Configure SMTP Transporter
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Email Content
      const mailOptions = {
        from: `"Waterland Pools Website" <${process.env.SMTP_USER}>`,
        to: process.env.NOTIFICATION_EMAIL || "sales@waterlandpoolsfl.com",
        subject: `New Estimate Request: ${service}`,
        text: `
          New Estimate Request Received:
          
          Full Name: ${fullName}
          Phone: ${phone}
          Email: ${email}
          Address: ${address}
          Service: ${service}
          Preferred Time: ${preferredTime || "Not specified"}
          
          Message:
          ${message || "No additional message provided."}
        `,
        html: `
          <h3>New Estimate Request Received</h3>
          <p><strong>Full Name:</strong> ${fullName}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Address:</strong> ${address}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Preferred Time:</strong> ${preferredTime || "Not specified"}</p>
          <br/>
          <p><strong>Message:</strong></p>
          <p>${message || "No additional message provided."}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: "Email sent successfully" });
    } catch (error) {
      console.error("SMTP Error:", error);
      res.status(500).json({ error: "Failed to send email. Please try again later." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
