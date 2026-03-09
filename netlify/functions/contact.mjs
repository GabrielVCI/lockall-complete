import nodemailer from "nodemailer";
import axios from "axios";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: CORS_HEADERS,
  });
}

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

    console.log("reCAPTCHA result:", { success, score, action });

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
    console.error("reCAPTCHA verification error:", error.message);
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
      </head>
      <body style="font-family: Arial, sans-serif; color: #333; background: #f3f4f6; margin: 0; padding: 20px;">
        <div style="max-width: 700px; margin: 0 auto; background: #fff; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #0ea5e9; color: white; padding: 24px;">
            <h1 style="margin: 0 0 6px 0;">New Corporate Contact Request</h1>
            <p style="margin: 0;">LOCKALL - Contact Form Submission</p>
          </div>

          <div style="padding: 24px;">
            <p>A new corporate contact request has been received from the LOCKALL website.</p>

            <table style="width: 100%; border-collapse: collapse; margin-top: 12px;">
              <tr><th style="padding: 12px; border: 1px solid #d1d5db; text-align:left;">Field</th><th style="padding: 12px; border: 1px solid #d1d5db; text-align:left;">Value</th></tr>
              <tr><td style="padding: 12px; border: 1px solid #d1d5db;"><strong>Institution</strong></td><td style="padding: 12px; border: 1px solid #d1d5db;">${escaped.institution}</td></tr>
              <tr><td style="padding: 12px; border: 1px solid #d1d5db;"><strong>Country</strong></td><td style="padding: 12px; border: 1px solid #d1d5db;">${escaped.country}</td></tr>
              <tr><td style="padding: 12px; border: 1px solid #d1d5db;"><strong>Institution Type</strong></td><td style="padding: 12px; border: 1px solid #d1d5db;">${escaped.institutionType}</td></tr>
              <tr><td style="padding: 12px; border: 1px solid #d1d5db;"><strong>Monthly Volume</strong></td><td style="padding: 12px; border: 1px solid #d1d5db;">${escaped.volume}</td></tr>
              <tr><td style="padding: 12px; border: 1px solid #d1d5db;"><strong>Device Type</strong></td><td style="padding: 12px; border: 1px solid #d1d5db;">${escaped.deviceType}</td></tr>
              <tr><td style="padding: 12px; border: 1px solid #d1d5db;"><strong>Role</strong></td><td style="padding: 12px; border: 1px solid #d1d5db;">${escaped.role}</td></tr>
              <tr><td style="padding: 12px; border: 1px solid #d1d5db;"><strong>Corporate Email</strong></td><td style="padding: 12px; border: 1px solid #d1d5db;">${escaped.email}</td></tr>
              <tr><td style="padding: 12px; border: 1px solid #d1d5db;"><strong>Phone</strong></td><td style="padding: 12px; border: 1px solid #d1d5db;">${escaped.phone}</td></tr>
              <tr><td style="padding: 12px; border: 1px solid #d1d5db;"><strong>Message</strong></td><td style="padding: 12px; border: 1px solid #d1d5db; white-space: pre-wrap;">${escaped.message}</td></tr>
            </table>

            <p style="margin-top:20px; font-size:12px; color:#6b7280;">
              Timestamp: ${new Date().toISOString()}
            </p>
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

export default async (req, context) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: CORS_HEADERS,
    });
  }

  if (req.method !== "POST") {
    return json({ ok: false, message: "Method not allowed" }, 405);
  }

  try {
    const body = await req.json();

    const isProduction = process.env.NODE_ENV === "production";
    const skipRecaptcha = process.env.SKIP_RECAPTCHA === "true" && !isProduction;

    const { recaptchaToken, ...formData } = body;

    const validation = validateFormData(body);
    if (!validation.valid) {
      return json({ ok: false, message: validation.error }, 400);
    }

    if (!skipRecaptcha) {
      const recaptchaResult = await verifyRecaptcha(recaptchaToken);

      if (!recaptchaResult.valid) {
        return json({ ok: false, message: recaptchaResult.error }, 403);
      }
    }

    const transporter = createTransporter();

    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_TO_EMAIL || "info@lockall.co",
      replyTo: formData.email,
      subject: `New Corporate Contact Request — ${formData.institution}`,
      html: formatEmailHtml(formData),
      text: formatEmailText(formData),
    });

    console.log("Message ID:", info.messageId);

    return json({ ok: true, message: "Contact form submitted successfully" }, 200);
  } catch (error) {
    console.error("Error processing contact form:", error);
    return json(
      { ok: false, message: error.message || "Error processing contact form" },
      
    );
  }
};