import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { getIcon } from "@/lib/icon-map";
import { whyChooseUs } from "@/lib/data/site-content";

export function WhyChooseUsPreview() {
  return (
    <section className="bg-surface py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Why Choose Us"
          title="A technology partner built around reliability"
          description="We combine premium design, technical rigor, and consistent communication so you always know your project is in capable hands."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item, i) => {
            const Icon = getIcon(item.icon);
            return (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="spec-corners rounded-md border border-border bg-background p-6 transition-colors duration-200 hover:border-accent/50">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-text">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-light">{item.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/why-choose-us">
              See Why Clients Choose Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
