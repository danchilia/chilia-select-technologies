import Link from "next/link";
import { and, eq, isNull } from "drizzle-orm";
import { ArrowRight, User } from "lucide-react";
import { db } from "@/db";
import { users, messages, invoices } from "@/db/schema";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function AdminOverviewPage() {
  const [clients, unreadRows, unpaidRows] = await Promise.all([
    db
      .select({ id: users.id, name: users.name, email: users.email, createdAt: users.createdAt })
      .from(users)
      .where(eq(users.role, "client")),
    db
      .select({ userId: messages.userId })
      .from(messages)
      .where(and(eq(messages.senderRole, "client"), isNull(messages.readAt))),
    db.select({ userId: invoices.userId }).from(invoices).where(eq(invoices.status, "unpaid")),
  ]);

  const unreadByClient = new Map<string, number>();
  for (const row of unreadRows) unreadByClient.set(row.userId, (unreadByClient.get(row.userId) ?? 0) + 1);
  const unpaidByClient = new Map<string, number>();
  for (const row of unpaidRows) unpaidByClient.set(row.userId, (unpaidByClient.get(row.userId) ?? 0) + 1);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-text">Clients</h1>
        <p className="mt-1 text-text-light">{clients.length} client accounts</p>
      </div>

      {clients.length === 0 ? (
        <Card className="hover:translate-y-0">
          <p className="text-sm text-text-light">No clients have signed up yet.</p>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {clients.map((client) => {
            const unread = unreadByClient.get(client.id) ?? 0;
            const unpaid = unpaidByClient.get(client.id) ?? 0;
            return (
              <Link key={client.id} href={`/admin/clients/${client.id}`}>
                <Card className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-text">{client.name}</p>
                      <p className="text-xs text-text-light">{client.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {unread > 0 ? (
                      <Badge className="border-accent/40 bg-accent/10 text-accent">
                        {unread} unread
                      </Badge>
                    ) : null}
                    {unpaid > 0 ? (
                      <Badge className="border-amber-400/40 bg-amber-400/10 text-amber-600 dark:text-amber-400">
                        {unpaid} unpaid
                      </Badge>
                    ) : null}
                    <ArrowRight className="h-4 w-4 text-text-light" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
