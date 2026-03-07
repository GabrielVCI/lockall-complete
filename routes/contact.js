import express from "express";
import nodemailer from "nodemailer";
import axios from "axios";

const router = express.Router();

function escapeHtml(text) {
  if (text === null || text === undefined) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function validateFormData(data) {
  const requiredFields = [
    "institution",
    "country",
    "institutionType",
    "volume",
    "deviceType",
    "role",
    "email",
    "message",
  ];

  const isProduction = process.env.NODE_ENV === "production";
  const skipRecaptcha = process.env.SKIP_RECAPTCHA === "true" && !isProduction;

  if (!skipRecaptcha) {
    requiredFields.push("recaptchaToken");
  }

  for (const field of requiredFields) {
    if (!data[field] || String(data[field]).trim() === "") {
      return { valid: false, error: `Field "${field}" is required` };
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(String(data.email).trim())) {
    return { valid: false, error: "Invalid email format" };
  }

  return { valid: true };
}

async function verifyRecaptcha(token) {
  try {
    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: token,
        },
        timeout: 10000,
      }
    );

    const { success, score, action } = response.data;

    console.log("📊 reCAPTCHA result:", { success, score, action });

    if (!success) {
      return { valid: false, error: "reCAPTCHA verification failed" };
    }

    if (typeof score === "number" && score < 0.5) {
      return {
        valid: false,
        error: "reCAPTCHA score too low (suspicious activity)",
      };
    }

    return { valid: true, score };
  } catch (error) {
    console.error("❌ reCAPTCHA verification error:", error.message);
    return { valid: false, error: "reCAPTCHA verification error" };
  }
}

function ensureSmtpEnv() {
  const required = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"];

  for (const key of required) {
    if (!process.env[key] || String(process.env[key]).trim() === "") {
      throw new Error(`${key} no está definido en process.env`);
    }
  }
}

function createTransporter() {
  ensureSmtpEnv(); 

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    pool: true,
    maxConnections: 1,
    maxMessages: 20,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });
}

function formatEmailHtml(data) {
  const escaped = {
    institution: escapeHtml(data.institution),
    country: escapeHtml(data.country),
    institutionType: escapeHtml(data.institutionType),
    volume: escapeHtml(data.volume),
    deviceType: escapeHtml(data.deviceType),
    role: escapeHtml(data.role),
    email: escapeHtml(data.email),
    phone: escapeHtml(data.phone || "N/A"),
    message: escapeHtml(data.message || ""),
  };

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <title>New Corporate Contact Request — LOCKALL</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          color: #333;
          background: #f3f4f6;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 700px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 18px rgba(0,0,0,0.08);
        }
        .header {
          background-color: #0ea5e9;
          color: white;
          padding: 24px;
        }
        .header h1 {
          margin: 0 0 6px 0;
          font-size: 24px;
        }
        .header p {
          margin: 0;
          font-size: 14px;
          opacity: 0.95;
        }
        .content {
          padding: 24px;
        }
        .intro {
          margin-bottom: 18px;
          font-size: 15px;
          line-height: 1.5;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 12px;
        }
        th {
          background-color: #e5e7eb;
          padding: 12px;
          text-align: left;
          font-weight: bold;
          border: 1px solid #d1d5db;
        }
        td {
          padding: 12px;
          border: 1px solid #d1d5db;
          vertical-align: top;
        }
        .label {
          font-weight: bold;
          background-color: #f9fafb;
          width: 220px;
        }
        .footer {
          font-size: 12px;
          color: #6b7280;
          padding: 20px 24px 24px;
          border-top: 1px solid #e5e7eb;
        }
        .message-box {
          white-space: pre-wrap;
          line-height: 1.6;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Corporate Contact Request</h1>
          <p>LOCKALL - Contact Form Submission</p>
        </div>

        <div class="content">
          <div class="intro">
            A new corporate contact request has been received from the LOCKALL website.
          </div>

          <table>
            <tr>
              <th class="label">Field</th>
              <th>Value</th>
            </tr>
            <tr>
              <td class="label">Institution</td>
              <td>${escaped.institution}</td>
            </tr>
            <tr>
              <td class="label">Country</td>
              <td>${escaped.country}</td>
            </tr>
            <tr>
              <td class="label">Institution Type</td>
              <td>${escaped.institutionType}</td>
            </tr>
            <tr>
              <td class="label">Monthly Volume</td>
              <td>${escaped.volume}</td>
            </tr>
            <tr>
              <td class="label">Device Type</td>
              <td>${escaped.deviceType}</td>
            </tr>
            <tr>
              <td class="label">Role</td>
              <td>${escaped.role}</td>
            </tr>
            <tr>
              <td class="label">Corporate Email</td>
              <td>${escaped.email}</td>
            </tr>
            <tr>
              <td class="label">Phone</td>
              <td>${escaped.phone}</td>
            </tr>
            <tr>
              <td class="label">Message</td>
              <td class="message-box">${escaped.message}</td>
            </tr>
          </table>
        </div>

        <div class="footer">
          <div>This email was sent from the LOCKALL contact form.</div>
          <div>Timestamp: ${new Date().toISOString()}</div>
        </div>
      </div>
    </body>
    </html>
  `;
}

function formatEmailText(data) {
  return `
New Corporate Contact Request — LOCKALL

Institution: ${data.institution}
Country: ${data.country}
Institution Type: ${data.institutionType}
Monthly Volume: ${data.volume}
Device Type: ${data.deviceType}
Role: ${data.role}
Corporate Email: ${data.email}
Phone: ${data.phone || "N/A"}
Message: ${data.message || ""}

Timestamp: ${new Date().toISOString()}
  `.trim();
}

router.post("/contact", async (req, res) => {
  try {

    const isProduction = process.env.NODE_ENV === "production";
    const skipRecaptcha = process.env.SKIP_RECAPTCHA === "true" && !isProduction;

    const { recaptchaToken, ...formData } = req.body || {};


    const validation = validateFormData(req.body || {});
    if (!validation.valid) {
      console.warn(`❌ Validation error: ${validation.error}`);
      return res.status(400).json({
        ok: false,
        message: validation.error,
      });
    }

    if (!skipRecaptcha) {
      const recaptchaResult = await verifyRecaptcha(recaptchaToken);

      if (!recaptchaResult.valid) {
        console.warn(`❌ reCAPTCHA error: ${recaptchaResult.error}`);
        return res.status(403).json({
          ok: false,
          message: recaptchaResult.error,
        });
      }
    } else {
      console.warn("⚠️ SKIP_RECAPTCHA activo: validación omitida solo para pruebas");
    }

    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_TO_EMAIL || "info@lockall.co",
      replyTo: formData.email,
      subject: `New Corporate Contact Request — ${formData.institution}`,
      html: formatEmailHtml(formData),
      text: formatEmailText(formData),
    };

    const info = await transporter.sendMail(mailOptions);

    return res.status(200).json({
      ok: true,
      message: "Contact form submitted successfully",
    });
  } catch (error) {
    console.error("❌ Error processing contact form:", error);

    return res.status(500).json({
      ok: false,
      message: error.message || "Error processing contact form",
    });
  }
});

export default router;