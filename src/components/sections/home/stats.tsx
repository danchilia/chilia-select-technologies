import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { stats } from "@/lib/data/site-content";

export function Stats() {
  return (
    <section className="bg-ink py-20">
      <Container>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 border-y border-white/10 py-10 lg:grid-cols-4 lg:gap-x-0 lg:divide-x lg:divide-white/10 lg:py-0">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} className="text-center lg:px-6 lg:py-10">
              <div className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
