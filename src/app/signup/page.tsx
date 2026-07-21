import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/layout/page-hero";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your client account to request a quote and track your project.",
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  return (
    <>
      <PageHero
        eyebrow="Client Account"
        title="Create your account"
        description="You'll use this to request quotes, track your project, and receive invoices."
      />
      <section className="py-24 lg:py-32">
        <Container className="max-w-md">
          <Suspense fallback={null}>
            <SignupForm />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
