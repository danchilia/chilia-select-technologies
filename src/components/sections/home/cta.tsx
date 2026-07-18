import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";

export function CTA() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <Reveal className="relative overflow-hidden rounded-3xl bg-accent px-8 py-16 text-center sm:px-16">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.08]" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to build something your business can rely on?
            </h2>
            <p className="mt-4 text-balance text-lg leading-relaxed text-white/85">
              Tell us about your project and we&apos;ll respond within 24 hours with a clear,
              tailored quote, no obligation.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                <Link href="/contact">
                  Get a Free Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:border-white hover:text-white hover:bg-white/10">
                <a href={`mailto:${SITE.email}`}>
                  <Mail className="h-4 w-4" />
                  {SITE.email}
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
