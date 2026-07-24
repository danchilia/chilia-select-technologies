"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Loader2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pricingTiers } from "@/lib/data/pricing";
import { fieldError, validateForm } from "@/lib/validation";

const inputClasses =
  "h-12 w-full rounded-md border border-border bg-background px-4 text-sm text-text placeholder:text-text-light transition-colors focus:border-accent focus:outline-none aria-invalid:border-red-400 aria-invalid:focus:border-red-400";
const textareaClasses =
  "w-full resize-none rounded-md border border-border bg-background px-4 py-3 text-sm text-text placeholder:text-text-light transition-colors focus:border-accent focus:outline-none aria-invalid:border-red-400 aria-invalid:focus:border-red-400";
const labelClasses = "text-sm font-medium text-text";
const sectionHeadingClasses = "font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent";
const errorClasses = "text-xs font-medium text-red-500";

export function OnboardingForm({
  defaultName = "",
  defaultEmail = "",
}: {
  defaultName?: string;
  defaultEmail?: string;
}) {
  const searchParams = useSearchParams();
  const presetPlan = searchParams.get("plan") ?? "";
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
      const res = await fetch("/api/onboarding", {
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
      <div className="flex flex-col items-start rounded-md border border-border bg-surface p-8">
        <span className="h-1 w-10 bg-accent" />
        <h3 className="mt-5 text-xl font-bold text-text">Project details received</h3>
        <p className="mt-2 leading-relaxed text-text-light">
          Thank you. We&apos;ll review your business details and reach out within 24 hours to
          confirm next steps and kick off the project.
        </p>
        <Button asChild size="sm" className="mt-5">
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="spec-corners flex flex-col gap-8 rounded-md border border-border bg-surface p-8">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-5">
        <span className={sectionHeadingClasses}>Your Details</span>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className={labelClasses}>Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              defaultValue={defaultName}
              onBlur={handleBlur}
              aria-invalid={Boolean(fieldErrors.name)}
              className={inputClasses}
              placeholder="Your full name"
            />
            {fieldErrors.name ? <p className={errorClasses}>{fieldErrors.name}</p> : null}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className={labelClasses}>Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              defaultValue={defaultEmail}
              onBlur={handleBlur}
              aria-invalid={Boolean(fieldErrors.email)}
              className={inputClasses}
              placeholder="you@company.com"
            />
            {fieldErrors.email ? <p className={errorClasses}>{fieldErrors.email}</p> : null}
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:max-w-xs">
          <label htmlFor="phone" className={labelClasses}>
            Phone <span className="text-text-light">(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel" className={inputClasses} placeholder="+1 (555) 000-0000" />
        </div>
      </div>

      <div className="flex flex-col gap-5 border-t border-border pt-8">
        <span className={sectionHeadingClasses}>Business Details</span>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="businessName" className={labelClasses}>Business Name</label>
            <input
              id="businessName"
              name="businessName"
              type="text"
              required
              onBlur={handleBlur}
              aria-invalid={Boolean(fieldErrors.businessName)}
              className={inputClasses}
              placeholder="Your business name"
            />
            {fieldErrors.businessName ? <p className={errorClasses}>{fieldErrors.businessName}</p> : null}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="industry" className={labelClasses}>Industry</label>
            <input id="industry" name="industry" type="text" className={inputClasses} placeholder="e.g. Restaurant, Real Estate" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="existingWebsite" className={labelClasses}>
            Existing Website <span className="text-text-light">(optional)</span>
          </label>
          <input id="existingWebsite" name="existingWebsite" type="text" className={inputClasses} placeholder="https://" />
        </div>
      </div>

      <div className="flex flex-col gap-5 border-t border-border pt-8">
        <span className={sectionHeadingClasses}>Project Scope</span>
        <div className="flex flex-col gap-2">
          <label htmlFor="plan" className={labelClasses}>Plan</label>
          <select id="plan" name="plan" defaultValue={presetPlan} className={inputClasses}>
            <option value="" disabled>Select a plan</option>
            {pricingTiers.map((tier) => (
              <option key={tier.name} value={tier.name.toLowerCase()}>{tier.name}</option>
            ))}
            <option value="not-sure">Not sure yet</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="goals" className={labelClasses}>Goals &amp; Key Features</label>
          <textarea
            id="goals"
            name="goals"
            required
            rows={4}
            onBlur={handleBlur}
            aria-invalid={Boolean(fieldErrors.goals)}
            className={textareaClasses}
            placeholder="What should the website or software do? Any must-have pages or features?"
          />
          {fieldErrors.goals ? <p className={errorClasses}>{fieldErrors.goals}</p> : null}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="references" className={labelClasses}>
            Reference / Inspiration Sites <span className="text-text-light">(optional)</span>
          </label>
          <textarea
            id="references"
            name="references"
            rows={3}
            className={textareaClasses}
            placeholder="Links to sites whose look, feel, or features you like"
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 border-t border-border pt-8">
        <span className={sectionHeadingClasses}>Content &amp; Assets</span>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="assetsReady" className={labelClasses}>Logo &amp; Brand Assets</label>
            <select id="assetsReady" name="assetsReady" defaultValue="" className={inputClasses}>
              <option value="" disabled>Select an option</option>
              <option value="ready">Ready, I&apos;ll share a link</option>
              <option value="partial">Have some, need help finishing</option>
              <option value="none">None yet, need branding help</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contentReady" className={labelClasses}>Written Content / Copy</label>
            <select id="contentReady" name="contentReady" defaultValue="" className={inputClasses}>
              <option value="" disabled>Select an option</option>
              <option value="ready">Ready to send over</option>
              <option value="partial">Partially ready</option>
              <option value="none">Need copywriting help</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="assetsLink" className={labelClasses}>
            Link to Assets <span className="text-text-light">(Google Drive, Dropbox, etc. — optional)</span>
          </label>
          <input id="assetsLink" name="assetsLink" type="text" className={inputClasses} placeholder="https://" />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="domain" className={labelClasses}>Domain Name</label>
            <input id="domain" name="domain" type="text" className={inputClasses} placeholder="e.g. mybusiness.com, or 'need one'" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="hosting" className={labelClasses}>Hosting</label>
            <input id="hosting" name="hosting" type="text" className={inputClasses} placeholder="Existing provider, or 'need hosting'" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 border-t border-border pt-8">
        <span className={sectionHeadingClasses}>Payment</span>
        <div className="flex flex-col gap-2 sm:max-w-xs">
          <label htmlFor="paymentMethod" className={labelClasses}>Preferred Payment Method</label>
          <select id="paymentMethod" name="paymentMethod" defaultValue="" className={inputClasses}>
            <option value="" disabled>Select a method</option>
            <option value="paypal">PayPal</option>
            <option value="payoneer">Payoneer</option>
            <option value="stripe">Stripe</option>
            <option value="other">Other / Not sure yet</option>
          </select>
        </div>

        <div className="flex items-start gap-3 rounded-md border border-accent/30 bg-accent/5 p-4">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <p className="text-xs leading-relaxed text-text-light">
            For your security, please don&apos;t include passwords or login credentials in this
            form. Once onboarding begins, we&apos;ll share a secure way to exchange any account
            access we need.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-border pt-8">
        <label htmlFor="notes" className={labelClasses}>
          Additional Notes <span className="text-text-light">(optional)</span>
        </label>
        <textarea id="notes" name="notes" rows={3} className={textareaClasses} placeholder="Anything else we should know?" />
      </div>

      {error ? <p className="text-sm font-medium text-red-500">{error}</p> : null}

      <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-fit">
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            Submit Project Details
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
