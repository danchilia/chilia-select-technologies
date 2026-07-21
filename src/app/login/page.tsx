import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/layout/page-hero";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to your client account.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <>
      <PageHero
        eyebrow="Client Account"
        title="Welcome back"
        description="Log in to request a quote, track your project, and view invoices."
      />
      <section className="py-24 lg:py-32">
        <Container className="max-w-md">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
