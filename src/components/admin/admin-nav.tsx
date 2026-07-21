"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function AdminNav({ name }: { name: string }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/admin" className="font-display text-lg font-semibold text-text">
          Chilia Select <span className="text-accent">Admin</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-text-light sm:inline">{name}</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-text-light transition-colors hover:text-red-500"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
