import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  message: string;
}

function validatePayload(body: unknown): body is ContactPayload {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    typeof b.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) &&
    typeof b.message === "string" &&
    b.message.trim().length > 0
  );
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!validatePayload(body)) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 422 }
    );
  }

  const { name, email, company, message } = body;

  // ── Email sending ────────────────────────────────────────────────────────────
  // If SMTP env vars are set, send via nodemailer.
  // Otherwise, log to console (stub mode — useful for local dev / Vercel preview).

  const smtpConfigured =
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.CONTACT_TO_EMAIL;

  if (smtpConfigured) {
    try {
      // Dynamic import so the module is not bundled when SMTP is not used.
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.default.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Atlas Labs Contact" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_TO_EMAIL,
        replyTo: email,
        subject: `Contact: ${name}${company ? ` — ${company}` : ""}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          company ? `Company: ${company}` : null,
          "",
          "Message:",
          message,
        ]
          .filter((l) => l !== null)
          .join("\n"),
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
          <hr />
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      });
    } catch (err) {
      console.error("[contact] SMTP send failed", err);
      return NextResponse.json(
        { error: "Failed to send message. Please email us directly." },
        { status: 500 }
      );
    }
  } else {
    // Stub mode — log submission so it's visible in Vercel logs
    console.log("[contact] New submission (SMTP not configured)", {
      name,
      email,
      company: company || "(none)",
      message: message.slice(0, 200),
    });
  }

  return NextResponse.json({ ok: true });
}
