"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { InvoiceStatusBadge } from "@/components/dashboard/status-badge";

type Invoice = {
  id: string;
  description: string;
  amountCents: number;
  status: string;
  paymentProvider: string | null;
  paymentLink: string | null;
  dueDate: string | null;
  createdAt: string;
};

const PROVIDERS = [
  { value: "", label: "No link yet" },
  { value: "payoneer", label: "Payoneer" },
  { value: "paypal", label: "PayPal" },
  { value: "skrill", label: "Skrill" },
];

function formatAmount(cents: number) {
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function AdminInvoicesPanel({ clientId }: { clientId: string }) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [provider, setProvider] = useState("");
  const [link, setLink] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const res = await fetch(`/api/invoices?userId=${clientId}`, { cache: "no-store" });
    const result = await res.json();
    return result.ok ? (result.invoices as Invoice[]) : null;
  }

  useEffect(() => {
    let cancelled = false;
    load().then((data) => {
      if (cancelled) return;
      if (data) setInvoices(data);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const amountCents = Math.round(Number(amount) * 100);
    if (!description.trim() || !amountCents || amountCents <= 0) return;

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: clientId,
          description,
          amountCents,
          dueDate: dueDate || undefined,
          paymentProvider: provider || undefined,
          paymentLink: link || undefined,
        }),
      });
      const result = await res.json();
      if (!res.ok || !result.ok) throw new Error(result.error || "Failed to create invoice.");
      setInvoices((prev) => [result.invoice, ...prev]);
      setDescription("");
      setAmount("");
      setDueDate("");
      setProvider("");
      setLink("");
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create invoice.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleMarkPaid(invoiceId: string) {
    setInvoices((prev) => prev.map((i) => (i.id === invoiceId ? { ...i, status: "paid" } : i)));
    await fetch(`/api/invoices/${invoiceId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "paid" }),
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-text">Invoices</h3>
        <Button size="sm" variant="outline" onClick={() => setShowForm((v) => !v)}>
          <Plus className="h-4 w-4" />
          New invoice
        </Button>
      </div>

      {showForm ? (
        <Card className="hover:translate-y-0">
          <form onSubmit={handleCreate} className="flex flex-col gap-3">
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (e.g. Website build - 50% deposit)"
              required
              className="h-11 rounded-xl border border-border bg-background px-4 text-sm text-text placeholder:text-text-light focus:border-accent focus:outline-none"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                min="0"
                step="0.01"
                placeholder="Amount (USD)"
                required
                className="h-11 rounded-xl border border-border bg-background px-4 text-sm text-text placeholder:text-text-light focus:border-accent focus:outline-none"
              />
              <input
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                type="date"
                className="h-11 rounded-xl border border-border bg-background px-4 text-sm text-text focus:border-accent focus:outline-none"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="h-11 rounded-xl border border-border bg-background px-4 text-sm text-text focus:border-accent focus:outline-none"
              >
                {PROVIDERS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
              <input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                type="url"
                placeholder="Payment link (paste from provider)"
                className="h-11 rounded-xl border border-border bg-background px-4 text-sm text-text placeholder:text-text-light focus:border-accent focus:outline-none"
              />
            </div>
            {error ? <p className="text-xs font-medium text-red-500">{error}</p> : null}
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={submitting}>
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create"}
              </Button>
            </div>
          </form>
        </Card>
      ) : null}

      {loading ? (
        <div className="flex justify-center py-6 text-text-light">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
      ) : invoices.length === 0 ? (
        <p className="text-sm text-text-light">No invoices yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {invoices.map((invoice) => (
            <Card key={invoice.id} className="hover:translate-y-0">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-text">{invoice.description}</p>
                  <p className="mt-1 text-sm text-text-light">
                    {formatAmount(invoice.amountCents)}
                    {invoice.dueDate ? ` · Due ${new Date(invoice.dueDate).toLocaleDateString()}` : ""}
                    {invoice.paymentProvider ? ` · ${invoice.paymentProvider}` : ""}
                  </p>
                  {invoice.paymentLink ? (
                    <a
                      href={invoice.paymentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-xs font-medium text-accent hover:underline"
                    >
                      View payment link
                    </a>
                  ) : null}
                </div>
                <div className="flex items-center gap-2">
                  <InvoiceStatusBadge status={invoice.status} />
                  {invoice.status === "unpaid" ? (
                    <Button size="sm" variant="outline" onClick={() => handleMarkPaid(invoice.id)}>
                      <Check className="h-4 w-4" />
                      Mark paid
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
