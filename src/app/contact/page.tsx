import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { Mail, Clock, Globe2, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/layout/page-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { SITE } from "@/lib/constants";

const REGIONS_SERVED = ["United States", "Canada", "United Kingdom", "Worldwide"];

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Chilia Select Technologies. Tell us about your website or software project and receive a tailored quote within 24 hours.",
  alternates: { canonical: "/contact" },
};

const CONTACT_DETAILS = [
  {
    icon: Mail,
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
  },
  {
    icon: Globe2,
    label: "Availability",
    value: "Remote, serving clients worldwide",
  },
  {
    icon: MapPin,
    label: "Payments",
    value: "International payments accepted via PayPal, Payoneer, or Stripe",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us about your project"
        description="Share a few details and we'll follow up within 24 hours with a clear, tailored quote, no obligation."
      />

      <section className="py-24 lg:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr]">
            <div className="flex flex-col gap-8">
              <Reveal>
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
                  <Image
                    src="/images/developer-working.jpg"
                    alt="A member of our team at work"
                    fill
                    priority
                    sizes="(min-width: 1024px) 480px, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="text-2xl font-bold text-text">Get in touch</h2>
                <p className="mt-3 leading-relaxed text-text-light">
                  Whether you need a new website, a redesign, or custom software, we&apos;re
                  ready to hear about it.
                </p>
              </Reveal>

              <div className="flex flex-col gap-4">
                {CONTACT_DETAILS.map((detail, i) => {
                  const Icon = detail.icon;
                  const content = (
                    <div className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-5">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-text-light">
                          {detail.label}
                        </p>
                        <p className="mt-1 text-sm font-medium text-text">{detail.value}</p>
                      </div>
                    </div>
                  );
                  return (
                    <Reveal key={detail.label} delay={0.05 + i * 0.05}>
                      {detail.href ? (
                        <a href={detail.href} className="block transition-opacity hover:opacity-80">
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </Reveal>
                  );
                })}
              </div>
            </div>

            <Reveal delay={0.1}>
              <Suspense>
                <ContactForm />
              </Suspense>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="pb-24 lg:pb-32">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-8 py-16 text-center sm:px-16">
              <div className="pointer-events-none absolute inset-0 bg-noise opacity-60" />
              <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.05]" />
              <div className="relative mx-auto flex max-w-xl flex-col items-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <MapPin className="h-7 w-7" />
                </span>
                <h3 className="mt-6 text-2xl font-bold text-text">
                  Remote-First, Serving Clients Worldwide
                </h3>
                <p className="mt-4 text-balance leading-relaxed text-text-light">
                  {SITE.name} operates as a fully remote team, so there&apos;s no office to
                  visit, just clear communication and fast turnaround, wherever you&apos;re
                  based.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                  {REGIONS_SERVED.map((region) => (
                    <Badge key={region}>{region}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
