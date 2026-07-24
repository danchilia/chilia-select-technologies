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
          <p className="spec-label">
            Trusted by Businesses Across Industries
          </p>
        </Reveal>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {INDUSTRIES.map((industry, i) => (
            <Reveal key={industry} delay={i * 0.04}>
              <span className="text-sm font-medium text-text-light">
                {industry}
              </span>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
