import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { invoices, paymentProviderEnum } from "@/db/schema";
import { getCurrentUser } from "@/lib/current-user";

const VALID_PROVIDERS = paymentProviderEnum.enumValues;

export async function PATCH(request: Request, ctx: RouteContext<"/api/invoices/[id]">) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Forbidden." }, { status: 403 });
  }

  const { id } = await ctx.params;
  const body = await request.json();
  const { status, paymentProvider, paymentLink } = body;

  if (status !== undefined && status !== "paid" && status !== "unpaid") {
    return NextResponse.json({ ok: false, error: "Invalid status." }, { status: 400 });
  }
  if (paymentProvider !== undefined && paymentProvider !== null && !VALID_PROVIDERS.includes(paymentProvider)) {
    return NextResponse.json({ ok: false, error: "Invalid payment provider." }, { status: 400 });
  }

  const [existing] = await db.select().from(invoices).where(eq(invoices.id, id)).limit(1);
  if (!existing) return NextResponse.json({ ok: false, error: "Invoice not found." }, { status: 404 });

  const [invoice] = await db
    .update(invoices)
    .set({
      ...(status !== undefined ? { status, paidAt: status === "paid" ? new Date() : null } : {}),
      ...(paymentProvider !== undefined ? { paymentProvider } : {}),
      ...(paymentLink !== undefined ? { paymentLink } : {}),
    })
    .where(eq(invoices.id, id))
    .returning();

  return NextResponse.json({ ok: true, invoice });
}
