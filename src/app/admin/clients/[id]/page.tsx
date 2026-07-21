import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { users } from "@/db/schema";
import { AdminProjectsPanel } from "@/components/admin/admin-projects-panel";
import { AdminInvoicesPanel } from "@/components/admin/admin-invoices-panel";
import { FileManager } from "@/components/dashboard/file-manager";
import { ChatThread } from "@/components/dashboard/chat-thread";

export default async function AdminClientDetailPage({ params }: PageProps<"/admin/clients/[id]">) {
  const { id } = await params;

  const [client] = await db
    .select({ id: users.id, name: users.name, email: users.email, createdAt: users.createdAt })
    .from(users)
    .where(eq(users.id, id))
    .limit(1);

  if (!client) notFound();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-text">{client.name}</h1>
        <p className="mt-1 text-text-light">
          {client.email} · Client since {new Date(client.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <AdminProjectsPanel clientId={client.id} />
          <AdminInvoicesPanel clientId={client.id} />
          <FileManager currentRole="admin" threadUserId={client.id} />
        </div>
        <div>
          <h3 className="mb-4 font-semibold text-text">Messages</h3>
          <ChatThread currentRole="admin" threadUserId={client.id} />
        </div>
      </div>
    </div>
  );
}
