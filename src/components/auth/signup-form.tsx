"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fieldError, sanitizeNextPath, validateForm } from "@/lib/validation";

const inputClasses =
  "h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-text placeholder:text-text-light transition-colors focus:border-accent focus:outline-none aria-invalid:border-red-400 aria-invalid:focus:border-red-400";
const labelClasses = "text-sm font-medium text-text";
const errorClasses = "text-xs font-medium text-red-500";

export function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = sanitizeNextPath(searchParams.get("next"));
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: fieldError(e.target) }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const errors = validateForm(form);
    const data = Object.fromEntries(new FormData(form).entries());

    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok || !result.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }
      router.push(next);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="scroll-mt-28 flex flex-col gap-5 rounded-2xl border border-border bg-surface p-8"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className={labelClasses}>Full Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={100}
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
          onBlur={handleBlur}
          aria-invalid={Boolean(fieldErrors.email)}
          className={inputClasses}
          placeholder="you@company.com"
        />
        {fieldErrors.email ? <p className={errorClasses}>{fieldErrors.email}</p> : null}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className={labelClasses}>Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          maxLength={72}
          pattern="(?=.*[A-Za-z])(?=.*[0-9]).+"
          onBlur={handleBlur}
          aria-invalid={Boolean(fieldErrors.password)}
          className={inputClasses}
          placeholder="At least 8 characters, with a letter and a number"
        />
        {fieldErrors.password ? <p className={errorClasses}>{fieldErrors.password}</p> : null}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="confirmPassword" className={labelClasses}>Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          minLength={8}
          onBlur={handleBlur}
          aria-invalid={Boolean(fieldErrors.confirmPassword)}
          className={inputClasses}
          placeholder="Re-enter your password"
        />
        {fieldErrors.confirmPassword ? <p className={errorClasses}>{fieldErrors.confirmPassword}</p> : null}
      </div>

      {error ? <p className={errorClasses}>{error}</p> : null}

      <Button type="submit" size="lg" disabled={submitting} className="mt-2 w-full">
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          <>
            Create Account
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>

      <p className="text-center text-sm text-text-light">
        Already have an account?{" "}
        <Link href={`/login?next=${encodeURIComponent(next)}`} className="font-semibold text-accent hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
