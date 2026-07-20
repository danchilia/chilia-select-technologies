import Link from "next/link";
import { ArrowRight, Home, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.05]" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <Container className="relative">
        <Reveal className="mx-auto max-w-xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">
            Error 404
          </span>
          <h1 className="mt-4 text-balance font-display text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            This page doesn&apos;t exist
          </h1>
          <p className="mt-5 text-balance leading-relaxed text-text-light">
            The page you&apos;re looking for may have been moved or no longer exists. Let&apos;s
            get you back on track.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">
                <Mail className="h-4 w-4" />
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <p className="mt-8 text-sm text-text-light">
            Or email us directly at{" "}
            <a href={`mailto:${SITE.email}`} className="font-medium text-accent hover:underline">
              {SITE.email}
            </a>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
