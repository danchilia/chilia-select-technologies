import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function PageHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-primary py-24 sm:py-28">
      {image ? (
        <Image
          src={image}
          alt=""
          fill
          priority
          className="object-cover opacity-20"
        />
      ) : null}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary via-primary/85 to-primary/70" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.06]" />
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      <Container className="relative">
        <Reveal className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-light">
            {eyebrow}
          </span>
          <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
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
