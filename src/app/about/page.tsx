import type { Metadata } from "next";
import Image from "next/image";
import { Target, Eye } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/layout/page-hero";
import { CTA } from "@/components/sections/home/cta";
import { values, timeline } from "@/lib/data/site-content";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Chilia Select Technologies, a technology partner building premium websites and custom software for businesses across the United States and beyond.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Built to give growing businesses an enterprise-grade advantage"
        description={`${SITE.name} designs and builds websites and custom software with the same rigor as a large agency, for businesses that don't yet have an in-house engineering team.`}
        image="/images/office-building.png"
      />

      <section className="py-24 lg:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <span className="flex items-center gap-2 spec-label">
                <span className="h-px w-6 bg-accent" aria-hidden />
                Who We Are
              </span>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-text sm:text-3xl">
                A technology partner, not a freelancer
              </h2>
              <p className="mt-5 leading-relaxed text-text-light">
                {SITE.name} is a web development and custom software company serving
                businesses that need to look and operate like an established company from day
                one. We combine design, engineering, and strategy under one roof, so clients
                work with a single accountable team instead of coordinating freelancers.
              </p>
              <p className="mt-4 leading-relaxed text-text-light">
                Every engagement, from a five-page business website to a full management
                system, is treated with the same standard of craft, communication, and
                technical discipline.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <span className="flex items-center gap-2 spec-label">
                <span className="h-px w-6 bg-accent" aria-hidden />
                What We Do
              </span>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-text sm:text-3xl">
                Websites and software built around your operations
              </h2>
              <p className="mt-5 leading-relaxed text-text-light">
                We design and build business websites, e-commerce stores, and corporate sites,
                alongside custom web applications and management systems for schools, retail,
                and service businesses. Every project is custom-coded, never a templated
                page builder, and engineered for performance, security, and long-term growth.
              </p>
              <p className="mt-4 leading-relaxed text-text-light">
                We also support clients after launch, with maintenance, SEO, and technical
                consulting to keep their platform performing as their business scales.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-24 lg:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Reveal>
              <Card className="h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-accent/10 text-accent">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-text">Our Mission</h3>
                <p className="mt-3 leading-relaxed text-text-light">
                  To give growing businesses access to the same quality of website and
                  software development that large, well-funded companies take for granted,
                  delivered with clear communication and transparent pricing.
                </p>
              </Card>
            </Reveal>
            <Reveal delay={0.08}>
              <Card className="h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-accent/10 text-accent">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-text">Our Vision</h3>
                <p className="mt-3 leading-relaxed text-text-light">
                  To be the trusted technology partner businesses return to at every stage of
                  growth, from their first website to the custom software that runs their
                  operations.
                </p>
              </Card>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-24 lg:py-32">
        <Container>
          <Reveal>
            <div className="spec-corners relative aspect-21/9 w-full overflow-hidden rounded-md border border-border">
              <Image
                src="/images/team-collaboration.jpg"
                alt="Chilia Select Technologies team collaborating"
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
          <SectionHeading
            eyebrow="Our Values"
            title="The principles behind every project"
            description="These values shape how we scope, design, build, and support every engagement, regardless of size."
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.06}>
                <Card>
                  <h3 className="text-lg font-semibold text-text">{value.title}</h3>
                  <p className="mt-2 leading-relaxed text-text-light">{value.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface py-24 lg:py-32">
        <Container>
          <SectionHeading
            eyebrow="Our Journey"
            title="Why clients trust us"
            description="A steady progression from single websites to full custom platforms, built one reliable delivery at a time."
          />
          <div className="mx-auto mt-16 max-w-2xl">
            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.08}>
                <div className="relative flex gap-6 pb-12 last:pb-0">
                  <div className="flex flex-col items-center">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-background text-sm font-bold text-accent">
                      {item.year.slice(0, 2)}
                    </span>
                    {i < timeline.length - 1 ? (
                      <span className="mt-2 w-px flex-1 bg-border" />
                    ) : null}
                  </div>
                  <div className="pb-2">
                    <span className="text-sm font-semibold text-accent">{item.year}</span>
                    <h3 className="mt-1 text-lg font-semibold text-text">{item.title}</h3>
                    <p className="mt-2 leading-relaxed text-text-light">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
