"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/data/services";
import { fieldError, validateForm } from "@/lib/validation";
import { cn } from "@/lib/utils";

const inputClasses =
  "h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-text placeholder:text-text-light transition-colors focus:border-accent focus:outline-none aria-invalid:border-red-400 aria-invalid:focus:border-red-400";
const textareaClasses =
  "w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-text placeholder:text-text-light transition-colors focus:border-accent focus:outline-none aria-invalid:border-red-400 aria-invalid:focus:border-red-400";
const labelClasses = "text-sm font-medium text-text";
const errorClasses = "text-xs font-medium text-red-500";

export function ContactForm() {
  const searchParams = useSearchParams();
  const presetService = searchParams.get("service") ?? "";
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: fieldError(e.target) }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const errors = validateForm(form);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    setSubmitting(true);
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
        <p className="mt-4 text-sm text-text-light">
          Already agreed on a project with us?{" "}
          <Link href="/onboarding" className="font-semibold text-accent hover:underline">
            Start onboarding
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 rounded-2xl border border-border bg-surface p-8">
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
          <input
            id="name"
            name="name"
            type="text"
            required
            onBlur={handleBlur}
            aria-invalid={Boolean(fieldErrors.name)}
            className={inputClasses}
            placeholder="Your full name"
          />
          {fieldErrors.name ? <p className={errorClasses}>{fieldErrors.name}</p> : null}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            onBlur={handleBlur}
            aria-invalid={Boolean(fieldErrors.email)}
            className={inputClasses}
            placeholder="you@company.com"
          />
          {fieldErrors.email ? <p className={errorClasses}>{fieldErrors.email}</p> : null}
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
          onBlur={handleBlur}
          aria-invalid={Boolean(fieldErrors.service)}
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
        {fieldErrors.service ? <p className={errorClasses}>{fieldErrors.service}</p> : null}
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
          onBlur={handleBlur}
          aria-invalid={Boolean(fieldErrors.message)}
          className={textareaClasses}
          placeholder="Tell us about your project, timeline, and goals."
        />
        {fieldErrors.message ? <p className={errorClasses}>{fieldErrors.message}</p> : null}
      </div>

      {error ? <p className={cn(errorClasses, "text-sm")}>{error}</p> : null}

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
