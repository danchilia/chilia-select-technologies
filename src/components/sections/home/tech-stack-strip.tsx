import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { technologies } from "@/lib/data/technologies";
import { techIconMap } from "@/lib/tech-icon-map";

const loopedTech = [...technologies, ...technologies];

export function TechStackStrip() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Our Technology"
          title="Built on a modern, reliable technology stack"
          description="We work with proven, industry-standard technologies chosen for performance, security, and long-term maintainability."
        />
      </Container>

      <Reveal className="mt-14 overflow-hidden">
        <div className="flex w-max animate-marquee gap-4">
          {loopedTech.map((tech, i) => {
            const Icon = techIconMap[tech.name];
            return (
              <div
                key={`${tech.name}-${i}`}
                className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-6 py-4"
              >
                {Icon ? <Icon className="h-6 w-6 text-text" /> : null}
                <span className="whitespace-nowrap text-sm font-semibold text-text">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </Reveal>

      <Container className="mt-10 flex justify-center">
        <Link href="/technologies" className="text-sm font-semibold text-accent hover:underline">
          Explore our full technology stack →
        </Link>
      </Container>
    </section>
  );
}
