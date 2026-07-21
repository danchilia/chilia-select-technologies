import { NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { getCurrentUser } from "@/lib/current-user";
import { SITE } from "@/lib/constants";
import { pricingTiers } from "@/lib/data/pricing";

function planLabel(plan: string | undefined) {
  const tier = pricingTiers.find((t) => t.name.toLowerCase() === plan);
  return tier?.name ?? (plan === "not-sure" ? "Not sure yet" : "Not specified");
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: "Not authenticated." }, { status: 401 });
  }

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

  const projectNotes = [
    `Contact: ${name} (${email}${phone ? `, ${phone}` : ""})`,
    industry ? `Industry: ${industry}` : null,
    existingWebsite ? `Existing Website: ${existingWebsite}` : null,
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
    .join("\n");

  const [project] = await db
    .insert(projects)
    .values({
      userId: user.id,
      title: `${businessName} — ${planLabel(plan)}`,
      notes: projectNotes,
    })
    .returning();

  // Email is a best-effort notification; the project record above is the source of truth.
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: `${SITE.name} Website <onboarding@resend.dev>`,
        to: process.env.CONTACT_TO_EMAIL || SITE.email,
        replyTo: email,
        subject: `New project onboarding from ${businessName}`,
        text: `Plan: ${planLabel(plan)}\n\n${projectNotes}`,
      });
    } catch (err) {
      console.error("Onboarding notification email failed:", err);
    }
  } else {
    console.error("RESEND_API_KEY is not configured; skipped onboarding notification email.");
  }

  return NextResponse.json({ ok: true, projectId: project.id });
}
