"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Code2, Award, TrendingUp, Zap } from "lucide-react";

const SLIDES = [
  { src: "/images/developers-team.jpg", alt: "Our development team collaborating on a project" },
  { src: "/images/developer-working.jpg", alt: "Developer building custom software" },
  { src: "/images/team-collaboration.jpg", alt: "Team reviewing a client project together" },
];

const SLIDE_INTERVAL = 4500;

export function HeroImageSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[480px]">
      <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-accent/20 via-transparent to-transparent blur-2xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-primary/30"
      >
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={SLIDES[index].src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={SLIDES[index].src}
              alt={SLIDES[index].alt}
              fill
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center gap-2">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-white" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </motion.div>

      <FloatingCard
        icon={<Award className="h-4 w-4 text-accent" />}
        label="Project Delivered"
        sub="On time, every time"
        className="left-[-8%] top-[8%]"
        delay={0.9}
      />
      <FloatingCard
        icon={<TrendingUp className="h-4 w-4 text-accent" />}
        label="Performance"
        sub="98/100 Lighthouse"
        className="bottom-[10%] left-[-6%]"
        delay={1.1}
      />
      <FloatingCard
        icon={<Zap className="h-4 w-4 text-yellow-500" />}
        label="Fast Delivery"
        sub="2–6 week turnaround"
        className="right-[-8%] top-[38%]"
        delay={1.3}
      />
      <FloatingCard
        icon={<Code2 className="h-4 w-4 text-accent" />}
        label="Clean Code"
        sub="Fully owned by you"
        className="bottom-[-4%] right-[6%]"
        delay={1.5}
      />
    </div>
  );
}

function FloatingCard({
  icon,
  label,
  sub,
  className,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className={`absolute z-20 hidden w-44 items-center gap-3 rounded-xl border border-border bg-surface p-3 shadow-xl shadow-primary/10 sm:flex ${className}`}
    >
      <motion.span
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay }}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-background"
      >
        {icon}
      </motion.span>
      <span className="flex flex-col">
        <span className="text-xs font-semibold text-text">{label}</span>
        <span className="text-[11px] text-text-light">{sub}</span>
      </span>
    </motion.div>
  );
}
