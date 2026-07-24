"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, MessageSquare, Receipt, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/invoices", label: "Invoices", icon: Receipt },
];

const UNREAD_POLL_MS = 15_000;

export function DashboardNav({ name }: { name: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadUnread() {
      try {
        const res = await fetch("/api/messages/unread-count", { cache: "no-store" });
        const result = await res.json();
        if (!cancelled && result.ok) setUnreadCount(result.count);
      } catch {
        // Silently ignore — the badge just won't update this cycle.
      }
    }

    loadUnread();
    const interval = setInterval(loadUnread, UNREAD_POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
    // Re-poll immediately on navigation so leaving /dashboard/messages clears the badge right away.
  }, [pathname]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="font-display text-lg font-semibold text-text">
            Chilia Select
          </Link>
          <nav className="hidden items-center gap-1 sm:flex">
            {LINKS.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              const showBadge = href === "/dashboard/messages" && unreadCount > 0;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                    active ? "bg-accent/10 text-accent" : "text-text-light hover:text-text"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                  {showBadge ? (
                    <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-white">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-text-light sm:inline">{name}</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-text-light transition-colors hover:text-red-500"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </div>
      </div>
      <nav className="flex items-center gap-1 overflow-x-auto border-t border-border px-6 py-2 sm:hidden">
        {LINKS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          const showBadge = href === "/dashboard/messages" && unreadCount > 0;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                active ? "bg-accent/10 text-accent" : "text-text-light hover:text-text"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
              {showBadge ? (
                <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
