"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { BackToTop } from "@/components/layout/back-to-top";
import { FloatingContactButton } from "@/components/layout/floating-contact-button";
import { CookieConsent } from "@/components/layout/cookie-consent";
import { LoadingScreen } from "@/components/layout/loading-screen";
import { PageTransition } from "@/components/layout/page-transition";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDemo = pathname?.startsWith("/demos");
  const isApp = pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin");

  if (isDemo || isApp) {
    return (
      <main id="main-content" className="flex-1">
        {children}
      </main>
    );
  }

  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <Header />
      <main id="main-content" className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <BackToTop />
      <FloatingContactButton />
      <CookieConsent />
    </>
  );
}
