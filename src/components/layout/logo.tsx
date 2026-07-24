import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span className="flex h-10 shrink-0 items-center rounded-md bg-white px-2 py-1.5 shadow-sm ring-1 ring-black/5">
        <Image
          src="/brand/logo-icon.png"
          alt=""
          width={850}
          height={430}
          priority
          className="h-full w-auto object-contain"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-bold tracking-tight text-text">
          Chilia Select
        </span>
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-text-light">
          Technologies
        </span>
      </span>
    </span>
  );
}
