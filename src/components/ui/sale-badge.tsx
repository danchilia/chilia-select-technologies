"use client";

import { cn, getDaysLeftInMonth } from "@/lib/utils";

export function SaleBadge({ highlighted }: { highlighted?: boolean }) {
  const daysLeft = getDaysLeftInMonth();

  return (
    <p
      suppressHydrationWarning
      className={cn(
        "mt-3 inline-flex w-fit items-center gap-1.5 rounded-md px-3 py-1 text-xs font-semibold",
        highlighted ? "bg-white/15 text-white" : "bg-accent/10 text-accent"
      )}
    >
      This month only — {daysLeft} {daysLeft === 1 ? "day" : "days"} left
    </p>
  );
}
