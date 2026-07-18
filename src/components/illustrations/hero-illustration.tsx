"use client";

import { motion } from "framer-motion";
import { Code2, Award, TrendingUp, Zap } from "lucide-react";

export function HeroIllustration() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[480px]">
      <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-accent/20 via-transparent to-transparent blur-2xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-primary shadow-2xl shadow-primary/30"
      >
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
          <span className="ml-3 text-[11px] font-medium text-white/40">
            chiliaselect.com
          </span>
        </div>

        <div className="space-y-3 p-6">
          {[
            { w: "70%", accent: true },
            { w: "45%" },
            { w: "88%" },
            { w: "60%" },
            { w: "35%", accent: true },
          ].map((line, i) => (
            <motion.div
              key={i}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
              style={{ width: line.w, transformOrigin: "left" }}
              className={`h-3 origin-left rounded-full ${
                line.accent ? "bg-accent/70" : "bg-white/15"
              }`}
            />
          ))}

          <div className="mt-6 grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 + i * 0.1 }}
                className="aspect-square rounded-lg border border-white/10 bg-white/[0.04]"
              />
            ))}
          </div>
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
      className={`absolute z-10 hidden w-44 items-center gap-3 rounded-xl border border-border bg-surface p-3 shadow-xl shadow-primary/10 sm:flex ${className}`}
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
