import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { PageHero } from "@/components/layout/page-hero";
import { CTA } from "@/components/sections/home/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { faqs } from "@/lib/data/faq";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about pricing, timelines, international payments, ownership, and the Chilia Select Technologies development process.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Everything you need to know before starting a project. Can't find your answer? Reach out and we'll respond within 24 hours."
      />

      <section className="py-24 lg:py-32">
        <Container>
          <Reveal className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                <AccordionItem key={faq.question} value={faq.question}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </Container>
      </section>

      <CTA />
    </>
  );
}
