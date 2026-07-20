import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/layout/page-hero";
import { TestimonialsNotice } from "@/components/testimonials/testimonials-notice";
import { CTA } from "@/components/sections/home/cta";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Verified client testimonials from Chilia Select Technologies projects, published as they are completed.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="What clients say, as it happens"
        description="We only publish testimonials from verified clients, no fabricated reviews. Here's where they'll appear as projects are completed."
        image="/images/hero-testimonials.jpg"
      />

      <section className="py-24 lg:py-32">
        <Container>
          <TestimonialsNotice />
        </Container>
      </section>

      <CTA />
    </>
  );
}
