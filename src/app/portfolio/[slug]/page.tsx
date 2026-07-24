import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTA } from "@/components/sections/home/cta";
import { SiteMockup } from "@/components/portfolio/site-mockup";
import { JsonLd } from "@/components/seo/json-ld";
import { projects } from "@/lib/data/portfolio";
import { SITE } from "@/lib/constants";
import { breadcrumbJsonLd } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: `/portfolio/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    creator: { "@type": "Organization", name: SITE.name, url: SITE.url },
    about: project.industry,
    genre: project.category,
    keywords: project.technologies.join(", "),
  };

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: project.name, path: `/portfolio/${project.slug}` },
  ]);

  return (
    <>
      <JsonLd data={projectJsonLd} />
      <JsonLd data={breadcrumb} />
      <section className="relative overflow-hidden border-b border-border py-24 sm:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-95"
          style={{ background: `linear-gradient(135deg, ${project.accentFrom}, ${project.accentTo})` }}
        />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.08]" />
        <Container className="relative">
          <Reveal className="max-w-2xl">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Link>
            <div className="mt-6 flex items-center gap-3">
              <Badge className="border-white/20 bg-white/10 text-white">{project.category}</Badge>
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-white/60">
                {project.industry}
              </span>
            </div>
            <h1 className="mt-4 text-balance font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {project.name}
            </h1>
            <p className="mt-5 max-w-xl text-balance text-lg leading-relaxed text-white/80">
              {project.description}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="relative -mt-14 pb-4 sm:-mt-20">
        <Container>
          <Reveal delay={0.1}>
            <SiteMockup project={project} variant="hero" />
          </Reveal>
        </Container>
      </section>

      <section className="py-24 lg:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr]">
            <div className="flex flex-col gap-10">
              <Reveal>
                <h2 className="text-2xl font-bold text-text">The Challenge</h2>
                <p className="mt-4 leading-relaxed text-text-light">{project.challenge}</p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="text-2xl font-bold text-text">Our Solution</h2>
                <p className="mt-4 leading-relaxed text-text-light">{project.solution}</p>
              </Reveal>
              <Reveal delay={0.16}>
                <h2 className="text-2xl font-bold text-text">Key Features</h2>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-text-light">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="spec-corners rounded-md border border-border bg-surface p-7">
                <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-text-light">
                  Technology Used
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
                <div className="mt-7 border-t border-border pt-6">
                  <p className="text-sm leading-relaxed text-text-light">
                    Have a project like this in mind? We&apos;ll walk you through timeline,
                    pricing, and technical approach on a free discovery call.
                  </p>
                  <Button asChild className="mt-5 w-full">
                    <Link href="/contact">
                      Start a Similar Project
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTA
        title={`Want a website like ${project.name}?`}
        description="Tell us about your business and we'll put together a tailored quote within 24 hours."
        secondaryLabel="View More Work"
      />
    </>
  );
}
