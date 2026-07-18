"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });
      const result = await res.json();

      if (!res.ok || !result.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
      <div>
        <h3 className="text-base font-semibold text-text">Stay ahead with our newsletter</h3>
        <p className="mt-1 text-sm text-text-light">
          Practical insights on websites, software, and growing your business online.
        </p>
      </div>
      {submitted ? (
        <p className="flex items-center gap-2 text-sm font-medium text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Thanks, you&apos;re on the list.
        </p>
      ) : (
        <div className="flex w-full max-w-md flex-col gap-2">
          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="h-12 w-full rounded-full border border-border bg-background px-5 text-sm text-text placeholder:text-text-light transition-colors focus:border-accent focus:outline-none"
            />
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
              aria-hidden="true"
            />
            <Button type="submit" size="sm" disabled={submitting} className="shrink-0">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                <>
                  Subscribe
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>
          {error ? <p className="text-xs font-medium text-red-500">{error}</p> : null}
        </div>
      )}
    </div>
  );
}
