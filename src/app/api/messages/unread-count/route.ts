import { NextResponse } from "next/server";
import { and, eq, isNull } from "drizzle-orm";
import { db } from "@/db";
import { messages } from "@/db/schema";
import { getCurrentUser } from "@/lib/current-user";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ ok: false, error: "Not authenticated." }, { status: 401 });

  const unread = await db
    .select({ id: messages.id })
    .from(messages)
    .where(and(eq(messages.userId, user.id), eq(messages.senderRole, "admin"), isNull(messages.readAt)));

  return NextResponse.json({ ok: true, count: unread.length });
}
