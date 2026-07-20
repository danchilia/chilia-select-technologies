import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { PageHero } from "@/components/layout/page-hero";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms and conditions governing projects and services delivered by ${SITE.name}.`,
  alternates: { canonical: "/terms-of-service" },
};

const LAST_UPDATED = "July 18, 2026";

export default function TermsOfServicePage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description={`Last updated: ${LAST_UPDATED}`}
      />

      <section className="py-24 lg:py-32">
        <Container>
          <Reveal className="mx-auto flex max-w-3xl flex-col gap-10">
            <p className="leading-relaxed text-text-light">
              These Terms of Service (&quot;Terms&quot;) govern your engagement with{" "}
              {SITE.name} (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) for website
              design, development, and custom software services. By engaging our services or
              using {SITE.url}, you agree to these Terms.
            </p>

            <div>
              <h2 className="text-xl font-bold text-text">1. Services Provided</h2>
              <p className="mt-3 leading-relaxed text-text-light">
                We provide website design and development, e-commerce development, custom web
                application development, business management systems, SEO, performance
                optimization, hosting assistance, and related technical consulting. The exact
                scope of each engagement is defined in a project proposal or agreement prior to
                the start of work.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-text">2. Project Engagement Process</h2>
              <p className="mt-3 leading-relaxed text-text-light">
                Projects typically begin with a discovery discussion to define scope, timeline,
                and pricing. Work commences once both parties agree to the proposal and any
                required deposit has been received. Timelines communicated during proposal are
                estimates and may shift based on scope changes or delayed client feedback.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-text">3. Payment Terms</h2>
              <p className="mt-3 leading-relaxed text-text-light">
                Pricing is outlined in each project proposal. Payments are accepted through
                PayPal, Payoneer, Stripe, and other agreed methods, and are typically structured as a deposit
                prior to work commencing, followed by milestone or completion payments as
                outlined in the agreement. Work may be paused if payment falls significantly
                behind the agreed schedule.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-text">4. Revisions</h2>
              <p className="mt-3 leading-relaxed text-text-light">
                Each pricing tier includes a defined number of revision rounds, as outlined on
                our Pricing page or in your project proposal. Requests beyond the included
                revisions, or changes to previously approved scope, may be billed separately.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-text">5. Ownership and Intellectual Property</h2>
              <p className="mt-3 leading-relaxed text-text-light">
                Upon receipt of final payment, you receive full ownership of the final website,
                application, source code, and associated project assets created specifically
                for your project. We retain the right to showcase completed work in our
                portfolio unless otherwise agreed in writing. Third-party assets, libraries, or
                licensed tools remain subject to their original licensing terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-text">6. Client Responsibilities</h2>
              <p className="mt-3 leading-relaxed text-text-light">
                You agree to provide timely feedback, content, credentials, and any information
                reasonably required for us to complete the project. Delays in providing these
                materials may extend the project timeline accordingly.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-text">7. Warranties and Disclaimers</h2>
              <p className="mt-3 leading-relaxed text-text-light">
                We warrant that services will be performed with reasonable skill and care. We
                do not guarantee specific business outcomes, such as search engine rankings or
                sales figures, as these depend on factors outside our control. Services are
                provided on an &quot;as is&quot; basis beyond the specific warranties stated in
                your project agreement.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-text">8. Limitation of Liability</h2>
              <p className="mt-3 leading-relaxed text-text-light">
                To the maximum extent permitted by law, our total liability for any claim
                arising from a project is limited to the amount paid for that project. We are
                not liable for indirect, incidental, or consequential damages, including lost
                profits or business interruption.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-text">9. Termination</h2>
              <p className="mt-3 leading-relaxed text-text-light">
                Either party may terminate a project agreement with written notice if the other
                party materially breaches its obligations and fails to resolve the breach
                within a reasonable period. Fees for work completed prior to termination remain
                payable.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-text">10. Governing Terms</h2>
              <p className="mt-3 leading-relaxed text-text-light">
                These Terms, together with any signed project agreement, constitute the entire
                agreement between the parties regarding the services described. If any
                provision is found unenforceable, the remaining provisions remain in full
                effect.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-text">11. Changes to These Terms</h2>
              <p className="mt-3 leading-relaxed text-text-light">
                We may update these Terms from time to time. Continued use of our services
                after changes are posted constitutes acceptance of the revised Terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-text">12. Contact Us</h2>
              <p className="mt-3 leading-relaxed text-text-light">
                Questions about these Terms can be directed to{" "}
                <a href={`mailto:${SITE.email}`} className="font-medium text-accent hover:underline">
                  {SITE.email}
                </a>
                .
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
