import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/layout/page-hero";
import { OnboardingForm } from "@/components/onboarding/onboarding-form";

export const metadata: Metadata = {
  title: "Client Onboarding",
  description:
    "Ready to start your project? Share your business details so we can begin building your website or software.",
  alternates: { canonical: "/onboarding" },
  robots: { index: false, follow: false },
};

export default function OnboardingPage() {
  return (
    <>
      <PageHero
        eyebrow="Client Onboarding"
        title="Let's start your project"
        description="Once a quote is accepted, this is where we collect the business details we need as developers to get to work. It only takes a few minutes."
        image="/images/hero-onboarding.png"
        imagePosition="right"
      />

      <section className="py-24 lg:py-32">
        <Container className="max-w-3xl">
          <Suspense fallback={null}>
            <OnboardingForm />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
