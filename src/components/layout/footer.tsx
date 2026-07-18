import Link from "next/link";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/layout/logo";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { FOOTER_LINKS, SITE, SOCIAL_LINKS } from "@/lib/constants";

const SOCIAL_ICONS = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaXTwitter,
  instagram: FaInstagram,
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-text-light">
              {SITE.description}
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
            >
              <Mail className="h-4 w-4" />
              {SITE.email}
            </a>
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon as keyof typeof SOCIAL_ICONS];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-light transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <FooterColumn title="Company" links={FOOTER_LINKS.company} />
          <FooterColumn title="Services" links={FOOTER_LINKS.services} />
          <FooterColumn title="Resources" links={FOOTER_LINKS.resources} />
        </div>

        <div className="mt-14 border-t border-border pt-10">
          <NewsletterForm />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-text-light sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-text">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-text">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-text">{title}</h3>
      <ul className="mt-5 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-text-light transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
