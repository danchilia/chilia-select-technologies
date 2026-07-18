"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { HeroIllustration } from "@/components/illustrations/hero-illustration";

const TRUST_POINTS = ["Free project quote", "Response within 24 hours", "International payments accepted"];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pb-20 pt-16 sm:pt-20 lg:pb-28 lg:pt-24">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.04]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />

      <Container className="relative grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent"
          >
            Trusted Web &amp; Software Development Partner
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-text sm:text-5xl lg:text-[3.4rem]"
          >
            Professional Websites and Custom Software That Help Businesses Grow.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-text-light"
          >
            Chilia Select Technologies designs and builds premium websites and custom
            business software for companies that want a technology partner they can rely
            on, from first concept to long-term support.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <Button asChild size="lg">
              <Link href="/contact">
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/portfolio">View Portfolio</Link>
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3"
          >
            {TRUST_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm text-text-light">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {point}
              </li>
            ))}
          </motion.ul>
        </div>

        <HeroIllustration />
      </Container>
    </section>
  );
}
