import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imagePosition = "center",
}: {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  imagePosition?: "center" | "right";
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-ink py-24 sm:py-28">
      {image ? (
        <Image
          src={image}
          alt=""
          fill
          priority
          className={cn("object-cover", imagePosition === "right" ? "object-right" : "object-center")}
        />
      ) : null}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/25" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.08]" />
      <Container className="relative">
        <Reveal className="max-w-2xl">
          <span className="flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-accent-light">
            <span className="h-px w-6 bg-accent-light" aria-hidden />
            {eyebrow}
          </span>
          <h1 className="mt-5 text-balance font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-balance text-lg leading-relaxed text-white/70">
            {description}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
