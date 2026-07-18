import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const INDUSTRIES = [
  "Professional Services",
  "Healthcare",
  "Real Estate",
  "Retail & E-commerce",
  "Hospitality",
  "Construction",
  "Education",
  "Legal & Finance",
];

export function TrustStrip() {
  return (
    <section className="border-y border-border bg-surface py-12">
      <Container>
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-light">
            Trusted by Businesses Across Industries
          </p>
        </Reveal>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {INDUSTRIES.map((industry, i) => (
            <Reveal key={industry} delay={i * 0.04}>
              <span className="inline-flex items-center rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-text-light">
                {industry}
              </span>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
