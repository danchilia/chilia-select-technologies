import Image from "next/image";
import {
  UtensilsCrossed,
  Stethoscope,
  HardHat,
  SprayCan,
  Home,
  Scale,
  Calculator,
  GraduationCap,
  ShoppingBag,
  Package,
  Globe,
  type LucideIcon,
} from "lucide-react";
import type { Project } from "@/lib/data/portfolio";
import { cn } from "@/lib/utils";

const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  "Restaurant & Hospitality": UtensilsCrossed,
  Healthcare: Stethoscope,
  Construction: HardHat,
  "Home Services": SprayCan,
  "Real Estate": Home,
  "Legal Services": Scale,
  "Finance & Accounting": Calculator,
  Education: GraduationCap,
  Retail: ShoppingBag,
  "Logistics & Warehousing": Package,
};

function domainFor(slug: string) {
  return `${slug.replace(/-/g, "")}.com`;
}

export function SiteMockup({
  project,
  variant = "card",
  priority = false,
  className,
}: {
  project: Project;
  variant?: "card" | "hero";
  priority?: boolean;
  className?: string;
}) {
  const Icon = INDUSTRY_ICONS[project.industry] ?? Globe;
  const gradient = `linear-gradient(135deg, ${project.accentFrom}, ${project.accentTo})`;

  if (variant === "hero") {
    const highlights = project.features.slice(0, 3);
    return (
      <div className={cn("spec-corners overflow-hidden rounded-md border border-border bg-white", className)}>
        {project.screenshot ? (
          <div className="relative aspect-16/9 w-full overflow-hidden bg-slate-50">
            <Image
              src={project.screenshot}
              alt={`${project.name} website screenshot`}
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-contain"
              priority
            />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-1.5 border-b border-black/5 bg-slate-50 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
              <span className="ml-3 truncate text-xs font-medium text-slate-400">
                {domainFor(project.slug)}
              </span>
            </div>

            <div className="relative overflow-hidden" style={{ background: gradient }}>
              <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.08]" />

              <div className="relative flex items-center justify-between px-6 py-4 sm:px-10">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-white" />
                  <span className="h-2 w-20 rounded-full bg-white/50" />
                </div>
                <div className="hidden items-center gap-4 sm:flex">
                  <span className="h-1.5 w-10 rounded-full bg-white/25" />
                  <span className="h-1.5 w-10 rounded-full bg-white/25" />
                  <span className="h-1.5 w-10 rounded-full bg-white/25" />
                  <span className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold" style={{ color: project.accentFrom }}>
                    Get Started
                  </span>
                </div>
              </div>

              <div className="relative px-6 py-10 sm:px-10 sm:py-14">
                <span className="block h-3 w-56 max-w-full rounded-full bg-white/80 sm:w-72" />
                <span className="mt-3 block h-3 w-40 max-w-full rounded-full bg-white/50 sm:w-52" />
                <span className="mt-5 block h-2 w-64 max-w-full rounded-full bg-white/30" />
                <div className="mt-7 flex gap-3">
                  <span className="rounded-full bg-white px-5 py-2 text-xs font-semibold" style={{ color: project.accentFrom }}>
                    {project.category}
                  </span>
                  <span className="rounded-full border border-white/30 px-5 py-2 text-xs font-semibold text-white">
                    Learn More
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="grid grid-cols-1 gap-3 border-t border-border p-5 sm:grid-cols-3 sm:p-6">
          {highlights.map((feature, i) => (
            <div key={feature} className="flex items-start gap-3 rounded-md border border-border bg-background p-3.5">
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ background: project.accentFrom }}
              >
                {i + 1}
              </span>
              <span className="text-xs leading-snug text-text-light">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "spec-corners relative flex flex-col overflow-hidden rounded-md border border-border bg-white transition-colors duration-200 group-hover:border-accent/50",
        project.screenshot ? "aspect-video bg-slate-50" : "aspect-4/3",
        className
      )}
    >
      {project.screenshot ? (
        <Image
          src={project.screenshot}
          alt={`${project.name} website screenshot`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
        />
      ) : (
        <>
          <div className="flex items-center gap-1.5 border-b border-black/5 bg-slate-50 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-red-400/70" />
            <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
            <span className="h-2 w-2 rounded-full bg-green-400/70" />
            <span className="ml-2 truncate text-[10px] font-medium text-slate-400">
              {domainFor(project.slug)}
            </span>
          </div>

          <div className="relative flex flex-1 flex-col justify-between p-5" style={{ background: gradient }}>
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.08]" />

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Icon className="h-4 w-4 text-white" />
                <span className="h-1.5 w-12 rounded-full bg-white/40" />
              </div>
              <span className="hidden h-1.5 w-16 rounded-full bg-white/20 sm:block" />
            </div>

            <div className="relative">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-white/60">
                {project.industry}
              </p>
              <h3 className="mt-1 text-xl font-bold text-white">{project.name}</h3>
              <div className="mt-3 flex gap-1.5">
                <span className="h-1.5 w-16 rounded-full bg-white/35" />
                <span className="h-1.5 w-10 rounded-full bg-white/20" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
