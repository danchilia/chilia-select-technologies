import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE } from "@/lib/constants";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, company, service, message, website } = body;

  // Honeypot: real users never fill this hidden field, bots often do.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !service || !message) {
    return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { ok: false, error: "Email delivery is not configured yet." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: `${SITE.name} Website <onboarding@resend.dev>`,
      to: process.env.CONTACT_TO_EMAIL || SITE.email,
      replyTo: email,
      subject: `New project inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        company ? `Company: ${company}` : null,
        `Service: ${service}`,
        "",
        "Message:",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ ok: false, error: "Failed to send message." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ ok: false, error: "Failed to send message." }, { status: 500 });
  }
}
