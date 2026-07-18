import type { Metadata } from "next";
import { Hero } from "@/components/sections/home/hero";
import { TrustStrip } from "@/components/sections/home/trust-strip";
import { Stats } from "@/components/sections/home/stats";
import { ServicesPreview } from "@/components/sections/home/services-preview";
import { PortfolioPreview } from "@/components/sections/home/portfolio-preview";
import { TechStackStrip } from "@/components/sections/home/tech-stack-strip";
import { WhyChooseUsPreview } from "@/components/sections/home/why-choose-us-preview";
import { TestimonialsPreview } from "@/components/sections/home/testimonials-preview";
import { CTA } from "@/components/sections/home/cta";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE.name} | Premium Websites & Custom Software for Growing Businesses`,
  description: SITE.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Stats />
      <ServicesPreview />
      <PortfolioPreview />
      <TechStackStrip />
      <WhyChooseUsPreview />
      <TestimonialsPreview />
      <CTA />
    </>
  );
}
