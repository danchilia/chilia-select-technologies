import { desc, eq } from "drizzle-orm";
import { CreditCard } from "lucide-react";
import { db } from "@/db";
import { invoices } from "@/db/schema";
import { getCurrentUser } from "@/lib/current-user";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InvoiceStatusBadge } from "@/components/dashboard/status-badge";

const PROVIDER_LABEL: Record<string, string> = {
  payoneer: "Payoneer",
  paypal: "PayPal",
  skrill: "Skrill",
};

function formatAmount(cents: number) {
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export default async function DashboardInvoicesPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const list = await db
    .select()
    .from(invoices)
    .where(eq(invoices.userId, user.id))
    .orderBy(desc(invoices.createdAt));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-text">Invoices</h1>
        <p className="mt-1 text-text-light">Payment requests from Chilia Select.</p>
      </div>

      {list.length === 0 ? (
        <Card className="hover:translate-y-0">
          <p className="text-sm text-text-light">No invoices yet.</p>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {list.map((invoice) => (
            <Card key={invoice.id} className="hover:translate-y-0">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-text">{invoice.description}</p>
                  <p className="mt-1 text-sm text-text-light">
                    {formatAmount(invoice.amountCents)}
                    {invoice.dueDate ? ` · Due ${new Date(invoice.dueDate).toLocaleDateString()}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <InvoiceStatusBadge status={invoice.status} />
                  {invoice.status === "unpaid" && invoice.paymentLink ? (
                    <Button asChild size="sm">
                      <a href={invoice.paymentLink} target="_blank" rel="noopener noreferrer">
                        <CreditCard className="h-4 w-4" />
                        Pay via {PROVIDER_LABEL[invoice.paymentProvider ?? ""] ?? "link"}
                      </a>
                    </Button>
                  ) : null}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
