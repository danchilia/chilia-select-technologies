import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Minus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PageHero } from "@/components/layout/page-hero";
import { CTA } from "@/components/sections/home/cta";
import { pricingTiers, comparisonFeatures } from "@/lib/data/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for business websites, e-commerce stores, and custom software. Compare Starter, Professional, and Enterprise plans from Chilia Select Technologies.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Transparent pricing for every stage of growth"
        description="No hidden fees, no vague quotes. Every plan below reflects real scope, request a free quote for pricing tailored to your project."
      />

      <section className="py-24 lg:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {pricingTiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 0.08}>
                <div
                  className={cn(
                    "flex h-full flex-col rounded-3xl border p-8",
                    tier.highlighted
                      ? "relative border-accent bg-primary shadow-xl shadow-accent/10"
                      : "border-border bg-surface"
                  )}
                >
                  {tier.highlighted ? (
                    <span className="absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                      Most Popular
                    </span>
                  ) : null}
                  <h3 className={cn("text-lg font-semibold", tier.highlighted ? "text-white" : "text-text")}>
                    {tier.name}
                  </h3>
                  <p className={cn("mt-2 text-sm leading-relaxed", tier.highlighted ? "text-white/70" : "text-text-light")}>
                    {tier.description}
                  </p>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className={cn("text-4xl font-bold tracking-tight", tier.highlighted ? "text-white" : "text-text")}>
                      {tier.price}
                    </span>
                    <span className={cn("text-sm", tier.highlighted ? "text-white/60" : "text-text-light")}>
                      {tier.priceNote}
                    </span>
                  </div>
                  <p className={cn("mt-1 text-xs font-medium uppercase tracking-wider", tier.highlighted ? "text-accent-light" : "text-accent")}>
                    Best for {tier.bestFor}
                  </p>

                  <ul className="mt-7 flex flex-1 flex-col gap-3">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className={cn(
                          "flex items-start gap-2.5 text-sm",
                          tier.highlighted ? "text-white/80" : "text-text-light"
                        )}
                      >
                        <span
                          className={cn(
                            "mt-2 h-1.5 w-1.5 shrink-0 rounded-full",
                            tier.highlighted ? "bg-accent-light" : "bg-accent"
                          )}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    size="lg"
                    variant={tier.highlighted ? "primary" : "outline"}
                    className={cn("mt-8", tier.highlighted ? "" : "")}
                  >
                    <Link href={`/contact?plan=${tier.name.toLowerCase()}`}>
                      Request a Quote
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface py-24 lg:py-32">
        <Container>
          <SectionHeading
            eyebrow="Compare Plans"
            title="A closer look at what's included"
            description="Every plan includes custom design and mobile-responsive development. Here's how they differ."
          />

          <Reveal className="mt-14 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse overflow-hidden rounded-2xl border border-border bg-background text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-4 font-semibold text-text">Feature</th>
                  {pricingTiers.map((tier) => (
                    <th key={tier.name} className="px-6 py-4 text-center font-semibold text-text">
                      {tier.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 1 ? "bg-surface/60" : ""}>
                    <td className="border-t border-border px-6 py-4 text-text-light">{row.feature}</td>
                    <td className="border-t border-border px-6 py-4 text-center">
                      <ComparisonCell value={row.starter} />
                    </td>
                    <td className="border-t border-border px-6 py-4 text-center">
                      <ComparisonCell value={row.professional} />
                    </td>
                    <td className="border-t border-border px-6 py-4 text-center">
                      <ComparisonCell value={row.enterprise} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </Container>
      </section>

      <CTA />
    </>
  );
}

function ComparisonCell({ value }: { value: boolean | string }) {
  if (value === true) {
    return <span className="mx-auto block h-1.5 w-1.5 rounded-full bg-accent" />;
  }
  if (value === false) {
    return <Minus className="mx-auto h-4 w-4 text-text-light/50" />;
  }
  return <span className="text-xs font-medium text-text">{value}</span>;
}
