import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";

export function CTA({
  title = "Ready to build something your business can rely on?",
  description = "Tell us about your project and we'll respond within 24 hours with a clear, tailored quote, no obligation.",
  primaryLabel = "Get a Free Quote",
  primaryHref = "/contact",
  secondaryLabel = "View Our Work",
  secondaryHref = "/portfolio",
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <Reveal className="relative overflow-hidden rounded-md border border-white/10 bg-ink px-8 py-16 text-center sm:px-16">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.1]" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-balance text-lg leading-relaxed text-white/85">
              {description}
            </p>
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" variant="secondary" className="border-transparent bg-white text-ink hover:bg-white/90">
                <Link href={primaryHref}>
                  {primaryLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:border-white hover:text-white hover:bg-white/10">
                <Link href={secondaryHref}>{secondaryLabel}</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-white/70">
              Prefer email?{" "}
              <a href={`mailto:${SITE.email}`} className="font-semibold text-white hover:underline">
                {SITE.email}
              </a>
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
