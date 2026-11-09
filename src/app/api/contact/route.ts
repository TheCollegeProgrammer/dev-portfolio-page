import { NextResponse } from "next/server";

import { contactSchema } from "@/lib/contact-schema";
import { siteConfig } from "@/lib/site";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, code: "INVALID_BODY", message: "Invalid request body." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        code: "VALIDATION_ERROR",
        message: "Please check the form fields and try again.",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  if (parsed.data.company) {
    return NextResponse.json({ ok: true, delivered: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.email;
  const from =
    process.env.CONTACT_FROM_EMAIL ??
    "Devansh Portfolio <onboarding@resend.dev>";

  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        code: "EMAIL_NOT_CONFIGURED",
        message:
          "Email delivery is not configured yet. Please reach out directly by email.",
      },
      { status: 503 },
    );
  }

  const { name, email, subject, message } = parsed.data;

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;background:#08090d;color:#f5f5f5;padding:32px">
      <p style="font-family:monospace;font-size:11px;letter-spacing:2px;color:#e62429;text-transform:uppercase">
        Portfolio contact
      </p>
      <h1 style="font-size:22px;margin:16px 0 8px">${escapeHtml(subject)}</h1>
      <p style="color:#9296a1;font-size:13px;margin:0 0 24px">
        From ${escapeHtml(name)} · ${escapeHtml(email)}
      </p>
      <p style="font-size:15px;line-height:1.7;white-space:pre-wrap">${escapeHtml(
        message,
      )}</p>
    </div>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio enquiry — ${subject}`,
        text: `From: ${name} <${email}>\n\n${message}`,
        html,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Contact email failed:", response.status, detail);

      return NextResponse.json(
        {
          ok: false,
          code: "DELIVERY_FAILED",
          message: "The message could not be sent right now. Please try again.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error("Contact email error:", error);

    return NextResponse.json(
      {
        ok: false,
        code: "DELIVERY_FAILED",
        message: "The message could not be sent right now. Please try again.",
      },
      { status: 502 },
    );
  }
}
