import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // 1. Validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, message: "Please provide your name." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, message: "Please provide a message description." },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedSubject = subject?.trim() || "Portfolio Contact Inquiry";
    const trimmedMessage = message.trim();

    // 2. Read SMTP credentials
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = Number(process.env.SMTP_PORT) || 465;
    const secure = process.env.SMTP_SECURE !== "false";
    const user = process.env.SMTP_USER || "karthi25082000@gmail.com";
    // Clean Gmail App Password (strip any whitespace)
    const pass = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/\s+/g, "") : "";
    const receiver = process.env.RECEIVER_EMAIL || "karthi25082000@gmail.com";

    // 3. Fallback if SMTP password is not configured yet
    if (!pass) {
      console.warn(
        "[Nodemailer] SMTP_PASS not found. Logged message:",
        { trimmedName, trimmedEmail, trimmedSubject, trimmedMessage }
      );
      return NextResponse.json({
        success: true,
        message: "Message recorded! (SMTP_PASS is not configured in .env.local yet)",
        simulated: true,
      });
    }

    // 4. Create Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    // 5. HTML Email Template
    const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; color: #e2e8f0; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #111827; border: 1px solid #1f2937; border-radius: 16px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #0ea5e9, #3b82f6); padding: 24px; text-align: center; }
          .header h1 { margin: 0; color: #ffffff; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; }
          .header p { margin: 4px 0 0 0; color: #e0f2fe; font-size: 13px; font-weight: 500; }
          .content { padding: 28px 24px; }
          .field { margin-bottom: 20px; }
          .field-label { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #38bdf8; letter-spacing: 0.5px; margin-bottom: 6px; }
          .field-val { font-size: 15px; color: #f8fafc; font-weight: 600; }
          .badge { display: inline-block; padding: 4px 12px; background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 9999px; color: #38bdf8; font-size: 12px; font-weight: 600; }
          .message-box { background: #070a12; border: 1px solid #1e293b; border-radius: 12px; padding: 18px; color: #cbd5e1; font-size: 14px; line-height: 1.6; white-space: pre-wrap; }
          .footer { padding: 16px 24px; border-top: 1px solid #1f2937; text-align: center; font-size: 12px; color: #64748b; background: #0c101c; }
          .reply-btn { display: inline-block; margin-top: 16px; padding: 10px 20px; background: #0284c7; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 13px; font-weight: 700; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Portfolio Inquiry</h1>
            <p>Direct Message from Karthikeyan Manikandan Portfolio</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="field-label">Inquiry Intent</div>
              <div class="badge">${trimmedSubject}</div>
            </div>
            <div class="field">
              <div class="field-label">Sender Name</div>
              <div class="field-val">${trimmedName}</div>
            </div>
            <div class="field">
              <div class="field-label">Sender Email</div>
              <div class="field-val">
                <a href="mailto:${trimmedEmail}" style="color: #38bdf8; text-decoration: none;">${trimmedEmail}</a>
              </div>
            </div>
            <div class="field">
              <div class="field-label">Message Details</div>
              <div class="message-box">${trimmedMessage}</div>
            </div>
            <div style="text-align: center;">
              <a href="mailto:${trimmedEmail}?subject=Re: ${encodeURIComponent(trimmedSubject)}" class="reply-btn">Reply to ${trimmedName}</a>
            </div>
          </div>
          <div class="footer">
            Delivered directly via Karthikeyan's Portfolio • Next.js &amp; Nodemailer
          </div>
        </div>
      </body>
    </html>
    `;

    // 6. Send Mail
    const mailOptions = {
      from: `"${trimmedName} (via Portfolio)" <${user}>`,
      to: receiver,
      replyTo: trimmedEmail,
      subject: `[Portfolio Inquiry] ${trimmedSubject} - from ${trimmedName}`,
      text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\nSubject: ${trimmedSubject}\n\nMessage:\n${trimmedMessage}`,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Message delivered successfully to Karthikeyan!",
      messageId: info.messageId,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("[Nodemailer Error]:", err);
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Failed to send email via SMTP.",
      },
      { status: 500 }
    );
  }
}

