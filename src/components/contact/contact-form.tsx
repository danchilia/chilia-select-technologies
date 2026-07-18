"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/data/services";

const inputClasses =
  "h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-text placeholder:text-text-light transition-colors focus:border-accent focus:outline-none";
const labelClasses = "text-sm font-medium text-text";

export function ContactForm() {
  const searchParams = useSearchParams();
  const presetService = searchParams.get("service") ?? "";
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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

  if (submitted) {
    return (
      <div className="flex flex-col items-start rounded-2xl border border-border bg-surface p-8">
        <span className="h-1 w-10 rounded-full bg-accent" />
        <h3 className="mt-5 text-xl font-bold text-text">Message received</h3>
        <p className="mt-2 leading-relaxed text-text-light">
          Thank you for reaching out. We&apos;ll review your project details and respond within
          24 hours with next steps.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-2xl border border-border bg-surface p-8">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelClasses}>
            Name
          </label>
          <input id="name" name="name" type="text" required className={inputClasses} placeholder="Your full name" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input id="email" name="email" type="email" required className={inputClasses} placeholder="you@company.com" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className={labelClasses}>
            Phone <span className="text-text-light">(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel" className={inputClasses} placeholder="+1 (555) 000-0000" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="company" className={labelClasses}>
            Company <span className="text-text-light">(optional)</span>
          </label>
          <input id="company" name="company" type="text" className={inputClasses} placeholder="Your business name" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="service" className={labelClasses}>
          Service Required
        </label>
        <select
          id="service"
          name="service"
          defaultValue={presetService}
          required
          className={inputClasses}
        >
          <option value="" disabled>
            Select a service
          </option>
          {services.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.title}
            </option>
          ))}
          <option value="other">Something else</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelClasses}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-text placeholder:text-text-light transition-colors focus:border-accent focus:outline-none"
          placeholder="Tell us about your project, timeline, and goals."
        />
      </div>

      {error ? <p className="text-sm font-medium text-red-500">{error}</p> : null}

      <Button type="submit" size="lg" disabled={submitting} className="mt-2 w-full sm:w-fit">
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
