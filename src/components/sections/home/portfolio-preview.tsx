import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/portfolio/project-card";
import { projects } from "@/lib/data/portfolio";

const FEATURED = projects.slice(0, 3);

export function PortfolioPreview() {
  return (
    <section className="bg-surface py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Our Work"
          title="A portfolio built on real business needs"
          description="A selection of concept projects that reflect the range of industries and platforms we design and build for."
        />

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((project, i) => (
            <ProjectCard key={project.slug} project={project} delay={i * 0.08} />
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/portfolio">
              View Full Portfolio
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
