import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE } from "@/lib/constants";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, website } = body;

  // Honeypot: real users never fill this hidden field, bots often do.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!email) {
    return NextResponse.json({ ok: false, error: "Email is required." }, { status: 400 });
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
      subject: "New newsletter signup",
      text: `New newsletter signup: ${email}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ ok: false, error: "Failed to subscribe." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Newsletter form error:", err);
    return NextResponse.json({ ok: false, error: "Failed to subscribe." }, { status: 500 });
  }
}
