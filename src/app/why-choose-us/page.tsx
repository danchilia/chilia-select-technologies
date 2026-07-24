import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { PageHero } from "@/components/layout/page-hero";
import { CTA } from "@/components/sections/home/cta";
import { getIcon } from "@/lib/icon-map";
import { whyChooseUs } from "@/lib/data/site-content";

export const metadata: Metadata = {
  title: "Why Choose Us",
  description:
    "Professional design, fast performance, secure development, and reliable support: see why businesses choose Chilia Select Technologies for their website and software projects.",
  alternates: { canonical: "/why-choose-us" },
};

export default function WhyChooseUsPage() {
  return (
    <>
      <PageHero
        eyebrow="Why Choose Us"
        title="A technology partner built around reliability"
        description="We combine premium design, technical rigor, and consistent communication so you always know your project is in capable hands."
        image="/images/hero-why-choose-us.jpg"
      />

      <section className="py-24 lg:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item, i) => {
              const Icon = getIcon(item.icon);
              return (
                <Reveal key={item.title} delay={i * 0.05}>
                  <div className="spec-corners flex h-full flex-col rounded-md border border-border bg-surface p-7 transition-colors duration-200 hover:border-accent/50">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-accent/10 text-accent">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-text">{item.title}</h3>
                    <p className="mt-2 leading-relaxed text-text-light">{item.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
