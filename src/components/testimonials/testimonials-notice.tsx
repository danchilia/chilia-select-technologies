import Link from "next/link";
import { MessageSquareQuote } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export function TestimonialsNotice() {
  return (
    <Reveal>
      <div className="spec-corners relative overflow-hidden rounded-md border border-border bg-ink px-8 py-16 text-center sm:px-16">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.06]" />
        <div className="relative mx-auto flex max-w-xl flex-col items-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-md bg-white/10 text-accent-light">
            <MessageSquareQuote className="h-7 w-7" />
          </span>
          <h3 className="mt-6 text-2xl font-bold text-white">
            Verified client testimonials are on their way
          </h3>
          <p className="mt-4 text-balance leading-relaxed text-white/70">
            We hold client feedback to the same standard as our work: genuine and verified.
            As current projects are completed, testimonials from real clients will appear
            in this section. In the meantime, explore our{" "}
            <Link href="/portfolio" className="font-medium text-accent-light underline underline-offset-2">
              portfolio
            </Link>{" "}
            to see the kind of work we deliver.
          </p>
        </div>
      </div>
    </Reveal>
  );
}
