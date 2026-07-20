import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/layout/page-hero";
import { CTA } from "@/components/sections/home/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { projects } from "@/lib/data/portfolio";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore concept projects across restaurants, healthcare, real estate, legal, education, and retail, showcasing the range of websites and software Chilia Select Technologies builds.",
  alternates: { canonical: "/portfolio" },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Portfolio", path: "/portfolio" },
]);

export default function PortfolioPage() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <PageHero
        eyebrow="Our Work"
        title="A portfolio built on real business needs"
        description="Each project below is a concept build reflecting the industries, platforms, and problems we design and engineer solutions for."
        image="/images/hero-portfolio.jpg"
      />

      <section className="py-24 lg:py-32">
        <Container>
          <PortfolioGrid projects={projects} />
        </Container>
      </section>

      <CTA
        title="Like what you see?"
        description="Let's build something just as strong for your business, tailored to your goals and budget."
        primaryLabel="Start Your Project"
        secondaryLabel="See Pricing"
        secondaryHref="/pricing"
      />
    </>
  );
}
