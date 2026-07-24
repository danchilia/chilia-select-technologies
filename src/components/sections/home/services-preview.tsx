import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getIcon } from "@/lib/icon-map";
import { services } from "@/lib/data/services";

const FEATURED = services.slice(0, 6);

export function ServicesPreview() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="What We Do"
          title="Web development and software services built around your business"
          description="From your first website to a full custom platform, we deliver technology that looks professional and performs reliably."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((service, i) => {
            const Icon = getIcon(service.icon);
            return (
              <Reveal key={service.slug} delay={i * 0.06}>
                <Link href={`/services#${service.slug}`} className="group block h-full">
                  <Card className="flex h-full flex-col">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-accent/10 text-accent">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-text">{service.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-text-light">
                      {service.shortDescription}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                      Learn more
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Card>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/services">
              View All Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
