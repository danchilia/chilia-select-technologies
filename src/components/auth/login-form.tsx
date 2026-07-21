"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fieldError, validateForm } from "@/lib/validation";

const inputClasses =
  "h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-text placeholder:text-text-light transition-colors focus:border-accent focus:outline-none aria-invalid:border-red-400 aria-invalid:focus:border-red-400";
const labelClasses = "text-sm font-medium text-text";
const errorClasses = "text-xs font-medium text-red-500";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";
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
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok || !result.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }
      router.push(result.role === "admin" ? "/admin" : next);
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
          onBlur={handleBlur}
          aria-invalid={Boolean(fieldErrors.password)}
          className={inputClasses}
          placeholder="Your password"
        />
        {fieldErrors.password ? <p className={errorClasses}>{fieldErrors.password}</p> : null}
      </div>

      {error ? <p className={errorClasses}>{error}</p> : null}

      <Button type="submit" size="lg" disabled={submitting} className="mt-2 w-full">
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Logging in...
          </>
        ) : (
          <>
            Log In
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>

      <p className="text-center text-sm text-text-light">
        Don&apos;t have an account?{" "}
        <Link href={`/signup?next=${encodeURIComponent(next)}`} className="font-semibold text-accent hover:underline">
          Create one
        </Link>
      </p>
    </form>
  );
}
