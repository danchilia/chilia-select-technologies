import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE } from "@/lib/constants";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    name,
    email,
    phone,
    businessName,
    industry,
    existingWebsite,
    plan,
    goals,
    references,
    assetsReady,
    assetsLink,
    contentReady,
    domain,
    hosting,
    paymentMethod,
    notes,
    website,
  } = body;

  // Honeypot: real users never fill this hidden field, bots often do.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !businessName || !goals) {
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
      subject: `New project onboarding from ${businessName}`,
      text: [
        `Contact Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        "",
        `Business Name: ${businessName}`,
        industry ? `Industry: ${industry}` : null,
        existingWebsite ? `Existing Website: ${existingWebsite}` : null,
        plan ? `Plan: ${plan}` : null,
        "",
        "Goals & Key Features:",
        goals,
        references ? `\nReference/Inspiration Sites:\n${references}` : null,
        "",
        assetsReady ? `Brand Assets Ready: ${assetsReady}` : null,
        assetsLink ? `Assets Link: ${assetsLink}` : null,
        contentReady ? `Content/Copy Ready: ${contentReady}` : null,
        domain ? `Domain: ${domain}` : null,
        hosting ? `Hosting: ${hosting}` : null,
        paymentMethod ? `Preferred Payment Method: ${paymentMethod}` : null,
        notes ? `\nAdditional Notes:\n${notes}` : null,
      ]
        .filter((line) => line !== null)
        .join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ ok: false, error: "Failed to send onboarding details." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Onboarding form error:", err);
    return NextResponse.json({ ok: false, error: "Failed to send onboarding details." }, { status: 500 });
  }
}
