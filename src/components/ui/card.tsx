import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "spec-corners rounded-md border border-border bg-surface p-6 transition-colors duration-200 hover:border-accent/50",
        className
      )}
    >
      {children}
    </div>
  );
}
