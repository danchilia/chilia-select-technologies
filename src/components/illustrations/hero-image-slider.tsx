"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

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
    <div className="spec-corners relative mx-auto aspect-square w-full max-w-[480px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative h-full w-full overflow-hidden rounded-md border border-border"
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
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute left-4 top-4 z-10 rounded-md border border-white/15 bg-ink/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/80 backdrop-blur-sm">
          Fig. {String(index + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </div>

        <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center gap-2">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show slide ${i + 1}`}
              className={`h-1.5 rounded-sm transition-all ${
                i === index ? "w-6 bg-white" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
