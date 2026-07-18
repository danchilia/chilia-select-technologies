import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { BackToTop } from "@/components/layout/back-to-top";
import { FloatingContactButton } from "@/components/layout/floating-contact-button";
import { CookieConsent } from "@/components/layout/cookie-consent";
import { LoadingScreen } from "@/components/layout/loading-screen";
import { PageTransition } from "@/components/layout/page-transition";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE, SOCIAL_LINKS } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Premium Websites & Custom Software`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "web development company",
    "custom software development",
    "business website design",
    "e-commerce development",
    "business management systems",
    "SEO optimization",
    "Chilia Select Technologies",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | Premium Websites & Custom Software`,
    description: SITE.description,
    images: [
      {
        url: "/brand/cover.jpg",
        width: 1942,
        height: 809,
        alt: `${SITE.name}: Building Websites. Powering Businesses. Delivering Results.`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Premium Websites & Custom Software`,
    description: SITE.description,
    images: ["/brand/cover.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  email: SITE.email,
  description: SITE.description,
  foundingDate: String(SITE.foundedYear),
  sameAs: SOCIAL_LINKS.map((social) => social.href),
  contactPoint: {
    "@type": "ContactPoint",
    email: SITE.email,
    contactType: "sales",
    areaServed: "Worldwide",
    availableLanguage: "English",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <JsonLd data={organizationJsonLd} />
        <ThemeProvider>
          <LoadingScreen />
          <ScrollProgress />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
          >
            Skip to content
          </a>
          <Header />
          <main id="main-content" className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <BackToTop />
          <FloatingContactButton />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
