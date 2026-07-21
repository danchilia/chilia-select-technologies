"use client";

import { motion } from "framer-motion";

export function PulseBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.span
      className={className}
      animate={{ scale: [1, 1.06, 1] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.span>
  );
}
