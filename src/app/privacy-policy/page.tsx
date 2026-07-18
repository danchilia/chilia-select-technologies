import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { PageHero } from "@/components/layout/page-hero";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} collects, uses, and protects your information.`,
  alternates: { canonical: "/privacy-policy" },
};

const LAST_UPDATED = "July 18, 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description={`Last updated: ${LAST_UPDATED}`}
      />

      <section className="py-24 lg:py-32">
        <Container>
          <Reveal className="mx-auto flex max-w-3xl flex-col gap-10">
            <p className="leading-relaxed text-text-light">
              {SITE.name} (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) respects your
              privacy and is committed to protecting the personal information you share with us.
              This Privacy Policy explains what information we collect, how we use it, and the
              choices you have regarding your data when you visit {SITE.url} or engage us for
              services.
            </p>

            <div>
              <h2 className="text-xl font-bold text-text">1. Information We Collect</h2>
              <p className="mt-3 leading-relaxed text-text-light">
                We collect information you provide directly to us, such as your name, email
                address, phone number, company name, and project details when you submit a
                contact form, request a quote, or subscribe to our newsletter. We also collect
                limited technical information automatically, including browser type, device
                type, and general usage data, to help us understand how our website is used.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-text">2. How We Use Your Information</h2>
              <p className="mt-3 leading-relaxed text-text-light">
                We use the information we collect to respond to inquiries, prepare quotes,
                deliver contracted services, communicate about your project, send newsletter
                updates you have opted into, and improve our website and services. We do not
                sell or rent your personal information to third parties.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-text">3. Cookies and Tracking</h2>
              <p className="mt-3 leading-relaxed text-text-light">
                Our website may use cookies and similar technologies to remember your
                preferences, such as your theme selection, and to understand aggregate site
                usage. You can control cookie preferences through your browser settings or the
                cookie consent banner presented on your first visit.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-text">4. Third-Party Services</h2>
              <p className="mt-3 leading-relaxed text-text-light">
                We may share limited information with trusted third-party service providers who
                support our operations, including hosting providers, payment processors such as
                Payoneer, and email delivery services. These providers are only granted access
                to the information necessary to perform their function and are bound by their
                own privacy and security obligations.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-text">5. Data Security</h2>
              <p className="mt-3 leading-relaxed text-text-light">
                We apply reasonable technical and organizational safeguards to protect your
                information from unauthorized access, disclosure, alteration, or destruction.
                However, no method of transmission over the internet is completely secure, and
                we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-text">6. Data Retention</h2>
              <p className="mt-3 leading-relaxed text-text-light">
                We retain personal information only for as long as necessary to fulfill the
                purposes outlined in this policy, including ongoing legal, accounting, or
                reporting requirements, after which it is securely deleted or anonymized.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-text">7. Your Rights</h2>
              <p className="mt-3 leading-relaxed text-text-light">
                Depending on your location, you may have the right to access, correct, or
                request deletion of your personal information. To exercise any of these rights,
                contact us at{" "}
                <a href={`mailto:${SITE.email}`} className="font-medium text-accent hover:underline">
                  {SITE.email}
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-text">8. Children&apos;s Privacy</h2>
              <p className="mt-3 leading-relaxed text-text-light">
                Our website and services are not directed at individuals under the age of 16,
                and we do not knowingly collect personal information from children.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-text">9. Changes to This Policy</h2>
              <p className="mt-3 leading-relaxed text-text-light">
                We may update this Privacy Policy from time to time to reflect changes in our
                practices or for legal, operational, or regulatory reasons. The updated version
                will be indicated by a revised &quot;Last updated&quot; date at the top of this
                page.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-text">10. Contact Us</h2>
              <p className="mt-3 leading-relaxed text-text-light">
                If you have questions about this Privacy Policy or how we handle your
                information, contact us at{" "}
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
