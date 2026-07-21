import { NextResponse } from "next/server";
import { and, eq, isNull } from "drizzle-orm";
import { db } from "@/db";
import { users, messages, invoices } from "@/db/schema";
import { getCurrentUser } from "@/lib/current-user";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Forbidden." }, { status: 403 });
  }

  const clients = await db
    .select({ id: users.id, name: users.name, email: users.email, createdAt: users.createdAt })
    .from(users)
    .where(eq(users.role, "client"));

  const [unreadRows, unpaidRows] = await Promise.all([
    db
      .select({ userId: messages.userId })
      .from(messages)
      .where(and(eq(messages.senderRole, "client"), isNull(messages.readAt))),
    db
      .select({ userId: invoices.userId })
      .from(invoices)
      .where(eq(invoices.status, "unpaid")),
  ]);

  const unreadByClient = new Map<string, number>();
  for (const row of unreadRows) {
    unreadByClient.set(row.userId, (unreadByClient.get(row.userId) ?? 0) + 1);
  }
  const unpaidByClient = new Map<string, number>();
  for (const row of unpaidRows) {
    unpaidByClient.set(row.userId, (unpaidByClient.get(row.userId) ?? 0) + 1);
  }

  const result = clients.map((client) => ({
    ...client,
    unreadMessages: unreadByClient.get(client.id) ?? 0,
    unpaidInvoices: unpaidByClient.get(client.id) ?? 0,
  }));

  return NextResponse.json({ ok: true, clients: result });
}
