import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/layout/page-hero";
import { CTA } from "@/components/sections/home/cta";
import { getIcon } from "@/lib/icon-map";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Business websites, e-commerce development, custom web applications, and business management systems: explore every service Chilia Select Technologies offers.",
  alternates: { canonical: "/services" },
};

const CATEGORIES: { key: "web" | "software" | "growth"; label: string; description: string }[] = [
  {
    key: "web",
    label: "Websites",
    description: "Custom-coded websites designed to build trust and convert visitors into customers.",
  },
  {
    key: "software",
    label: "Custom Software",
    description: "Purpose-built applications and management systems engineered around your operations.",
  },
  {
    key: "growth",
    label: "Growth & Support",
    description: "Ongoing optimization, maintenance, and consulting that keeps your platform performing.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Web development and software services built around your business"
        description="From your first business website to a full custom platform, every service is delivered with the same standard of design, engineering, and communication."
      />

      {CATEGORIES.map((category, categoryIndex) => {
        const items = services.filter((s) => s.category === category.key);
        return (
          <section
            key={category.key}
            className={categoryIndex % 2 === 1 ? "bg-surface py-24 lg:py-32" : "py-24 lg:py-32"}
          >
            <Container>
              <SectionHeading
                align="left"
                eyebrow={category.label}
                title={category.label}
                description={category.description}
                className="mx-0"
              />

              <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
                {items.map((service, i) => {
                  const Icon = getIcon(service.icon);
                  return (
                    <Reveal key={service.slug} delay={(i % 2) * 0.08}>
                      <div
                        id={service.slug}
                        className="scroll-mt-28 flex h-full flex-col rounded-2xl border border-border bg-background p-7"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                          <Icon className="h-6 w-6" />
                        </div>
                        <h3 className="mt-5 text-xl font-bold text-text">{service.title}</h3>
                        <p className="mt-3 leading-relaxed text-text-light">{service.description}</p>

                        <ul className="mt-5 flex flex-col gap-2.5">
                          {service.benefits.map((benefit) => (
                            <li key={benefit} className="flex items-start gap-2.5 text-sm text-text-light">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                              {benefit}
                            </li>
                          ))}
                        </ul>

                        <div className="mt-6 rounded-xl border border-border bg-surface px-4 py-3">
                          <p className="text-xs font-semibold uppercase tracking-wider text-text-light">
                            Ideal For
                          </p>
                          <p className="mt-1 text-sm text-text">{service.idealFor}</p>
                        </div>

                        <Button asChild variant="outline" className="mt-6 self-start">
                          <Link href={`/contact?service=${service.slug}`}>
                            Request This Service
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </Container>
          </section>
        );
      })}

      <CTA />
    </>
  );
}
