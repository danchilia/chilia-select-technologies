"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Award, TrendingUp, Zap, Code2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { HeroImageSlider } from "@/components/illustrations/hero-image-slider";

const TRUST_POINTS = ["Free project quote", "Response within 24 hours", "International payments accepted"];

const PROOF_POINTS = [
  { icon: Award, label: "Project Delivered", sub: "On time, every time" },
  { icon: TrendingUp, label: "Performance", sub: "98/100 Lighthouse" },
  { icon: Zap, label: "Fast Delivery", sub: "2–6 week turnaround" },
  { icon: Code2, label: "Clean Code", sub: "Fully owned by you" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pb-20 pt-16 sm:pt-20 lg:pb-28 lg:pt-24">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.05]" />

      <Container className="relative grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 spec-label"
          >
            <span className="h-px w-6 bg-accent" aria-hidden />
            Trusted Web &amp; Software Development Partner
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.1] tracking-tight text-text sm:text-5xl lg:text-[3.4rem]"
          >
            Professional Websites and Custom Software That Help Businesses{" "}
            <em className="font-normal italic text-accent">Grow.</em>
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
                <span className="h-1.5 w-1.5 shrink-0 bg-accent" />
                {point}
              </li>
            ))}
          </motion.ul>

          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-8 sm:grid-cols-4 lg:hidden"
          >
            {PROOF_POINTS.map((point) => (
              <div key={point.label} className="flex items-start gap-2.5">
                <point.icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div>
                  <dt className="text-xs font-semibold text-text">{point.label}</dt>
                  <dd className="text-[11px] text-text-light">{point.sub}</dd>
                </div>
              </div>
            ))}
          </motion.dl>
        </div>

        <div>
          <HeroImageSlider />
          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 hidden grid-cols-4 gap-4 border-t border-border pt-6 lg:grid"
          >
            {PROOF_POINTS.map((point) => (
              <div key={point.label}>
                <point.icon className="h-4 w-4 shrink-0 text-accent" />
                <dt className="mt-2 text-xs font-semibold text-text">{point.label}</dt>
                <dd className="mt-0.5 text-[11px] leading-snug text-text-light">{point.sub}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </Container>
    </section>
  );
}
