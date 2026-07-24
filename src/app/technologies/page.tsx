import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { PageHero } from "@/components/layout/page-hero";
import { CTA } from "@/components/sections/home/cta";
import { technologies, technologyCategories } from "@/lib/data/technologies";
import { techIconMap } from "@/lib/tech-icon-map";

export const metadata: Metadata = {
  title: "Technologies",
  description:
    "The modern technology stack behind every Chilia Select Technologies project: React, Next.js, TypeScript, Node.js, PostgreSQL, and more.",
  alternates: { canonical: "/technologies" },
};

export default function TechnologiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Technologies"
        title="A modern, reliable technology stack"
        description="We build on proven, well-supported technologies chosen for performance, security, and long-term maintainability, never trend-chasing."
      />

      <section className="pt-24 lg:pt-32">
        <Container>
          <Reveal>
            <div className="spec-corners relative aspect-21/9 w-full overflow-hidden rounded-md border border-border">
              <Image
                src="/images/developers-team.jpg"
                alt="Developers working across our technology stack"
                fill
                sizes="(min-width: 1280px) 1152px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-24 lg:py-32">
        <Container>
          {technologyCategories.map((category, categoryIndex) => {
            const items = technologies.filter((t) => t.category === category);
            return (
              <div key={category} className={categoryIndex > 0 ? "mt-16" : ""}>
                <SectionHeading align="left" title={category} className="mx-0" />
                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {items.map((tech, i) => {
                    const Icon = techIconMap[tech.name];
                    return (
                      <Reveal key={tech.name} delay={i * 0.05}>
                        <div className="spec-corners flex h-full flex-col rounded-md border border-border bg-surface p-6 transition-colors duration-200 hover:border-accent/50">
                          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-accent/10 text-accent">
                            {Icon ? <Icon className="h-6 w-6" /> : null}
                          </div>
                          <h3 className="mt-4 text-base font-semibold text-text">{tech.name}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-text-light">
                            {tech.description}
                          </p>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </Container>
      </section>

      <CTA />
    </>
  );
}
