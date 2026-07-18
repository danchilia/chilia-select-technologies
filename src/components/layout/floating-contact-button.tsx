"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Mail, X } from "lucide-react";
import { SITE } from "@/lib/constants";

export function FloatingContactButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-64 overflow-hidden rounded-2xl border border-border bg-surface p-4 shadow-2xl shadow-primary/10"
          >
            <p className="text-sm font-semibold text-text">Let&apos;s talk about your project</p>
            <p className="mt-1 text-xs text-text-light">We typically respond within 24 hours.</p>
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-light"
              >
                <MessageCircle className="h-4 w-4" />
                Get a Free Quote
              </Link>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent"
              >
                <Mail className="h-4 w-4" />
                Email Us
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        aria-label={open ? "Close contact menu" : "Open contact menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/30 transition-transform hover:scale-105"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 45 }}
            transition={{ duration: 0.15 }}
          >
            {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
