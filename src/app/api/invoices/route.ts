import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { invoices, users, paymentProviderEnum } from "@/db/schema";
import { getCurrentUser } from "@/lib/current-user";

const VALID_PROVIDERS = paymentProviderEnum.enumValues;

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ ok: false, error: "Not authenticated." }, { status: 401 });

  if (user.role === "admin") {
    const targetUserId = new URL(request.url).searchParams.get("userId");
    const list = targetUserId
      ? await db
          .select()
          .from(invoices)
          .where(eq(invoices.userId, targetUserId))
          .orderBy(desc(invoices.createdAt))
      : await db.select().from(invoices).orderBy(desc(invoices.createdAt));
    return NextResponse.json({ ok: true, invoices: list });
  }

  const list = await db
    .select()
    .from(invoices)
    .where(eq(invoices.userId, user.id))
    .orderBy(desc(invoices.createdAt));
  return NextResponse.json({ ok: true, invoices: list });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Forbidden." }, { status: 403 });
  }

  const body = await request.json();
  const { userId, projectId, description, amountCents, dueDate, paymentProvider, paymentLink } = body;

  if (!userId || !description || !amountCents || Number(amountCents) <= 0) {
    return NextResponse.json(
      { ok: false, error: "A client, description, and amount are required." },
      { status: 400 }
    );
  }
  if (paymentProvider && !VALID_PROVIDERS.includes(paymentProvider)) {
    return NextResponse.json({ ok: false, error: "Invalid payment provider." }, { status: 400 });
  }

  const [client] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (!client) return NextResponse.json({ ok: false, error: "Client not found." }, { status: 404 });

  const [invoice] = await db
    .insert(invoices)
    .values({
      userId,
      projectId: projectId || null,
      description,
      amountCents: Math.round(Number(amountCents)),
      dueDate: dueDate ? new Date(dueDate) : null,
      paymentProvider: paymentProvider || null,
      paymentLink: paymentLink || null,
    })
    .returning();

  return NextResponse.json({ ok: true, invoice });
}
