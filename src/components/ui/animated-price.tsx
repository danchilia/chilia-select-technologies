"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export function AnimatedPrice({ value, className }: { value: string; className?: string }) {
  const numeric = Number(value.replace(/[^0-9.]/g, ""));
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && !Number.isNaN(numeric)) motionValue.set(numeric);
  }, [isInView, motionValue, numeric]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `$${Math.round(latest).toLocaleString("en-US")}`;
      }
    });
  }, [springValue]);

  if (Number.isNaN(numeric)) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      $0
    </span>
  );
}
