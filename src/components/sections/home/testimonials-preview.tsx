import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { TestimonialsNotice } from "@/components/testimonials/testimonials-notice";

export function TestimonialsPreview() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Client Feedback"
          title="What clients say about working with us"
          description="We believe trust is earned, not written for you."
        />
        <div className="mt-14">
          <TestimonialsNotice />
        </div>
      </Container>
    </section>
  );
}
