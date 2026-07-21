import { NextResponse } from "next/server";
import { and, asc, eq, isNull } from "drizzle-orm";
import { db } from "@/db";
import { messages, users } from "@/db/schema";
import { getCurrentUser } from "@/lib/current-user";

// Resolves which client's thread is being read/written: the signed-in
// client's own id, or (for admins) the ?userId= of the client they're viewing.
async function resolveThreadUserId(request: Request): Promise<string | null> {
  const user = await getCurrentUser();
  if (!user) return null;

  if (user.role === "admin") {
    const targetId = new URL(request.url).searchParams.get("userId");
    return targetId;
  }

  return user.id;
}

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ ok: false, error: "Not authenticated." }, { status: 401 });

  const threadUserId = await resolveThreadUserId(request);
  if (!threadUserId) {
    return NextResponse.json({ ok: false, error: "A client must be specified." }, { status: 400 });
  }

  if (user.role === "admin") {
    const [client] = await db.select().from(users).where(eq(users.id, threadUserId)).limit(1);
    if (!client) return NextResponse.json({ ok: false, error: "Client not found." }, { status: 404 });
  }

  const thread = await db
    .select()
    .from(messages)
    .where(eq(messages.userId, threadUserId))
    .orderBy(asc(messages.createdAt));

  return NextResponse.json({ ok: true, messages: thread });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ ok: false, error: "Not authenticated." }, { status: 401 });

  const body = await request.json();
  const text = typeof body.body === "string" ? body.body.trim() : "";
  if (!text) {
    return NextResponse.json({ ok: false, error: "Message cannot be empty." }, { status: 400 });
  }

  const threadUserId = user.role === "admin" ? body.userId : user.id;
  if (!threadUserId) {
    return NextResponse.json({ ok: false, error: "A client must be specified." }, { status: 400 });
  }

  if (user.role === "admin") {
    const [client] = await db.select().from(users).where(eq(users.id, threadUserId)).limit(1);
    if (!client) return NextResponse.json({ ok: false, error: "Client not found." }, { status: 404 });
  }

  const [message] = await db
    .insert(messages)
    .values({ userId: threadUserId, senderRole: user.role, body: text })
    .returning();

  return NextResponse.json({ ok: true, message });
}

export async function PATCH(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ ok: false, error: "Not authenticated." }, { status: 401 });

  const threadUserId = await resolveThreadUserId(request);
  if (!threadUserId) {
    return NextResponse.json({ ok: false, error: "A client must be specified." }, { status: 400 });
  }

  // Mark as read only the messages sent by the *other* party.
  const otherRole = user.role === "admin" ? "client" : "admin";
  await db
    .update(messages)
    .set({ readAt: new Date() })
    .where(
      and(eq(messages.userId, threadUserId), eq(messages.senderRole, otherRole), isNull(messages.readAt))
    );

  return NextResponse.json({ ok: true });
}
