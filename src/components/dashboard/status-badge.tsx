import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const PROJECT_STATUS_LABEL: Record<string, string> = {
  pending: "Pending",
  in_progress: "In Progress",
  in_review: "In Review",
  delivered: "Delivered",
};

const PROJECT_STATUS_CLASS: Record<string, string> = {
  pending: "border-amber-400/40 bg-amber-400/10 text-amber-600 dark:text-amber-400",
  in_progress: "border-accent/40 bg-accent/10 text-accent",
  in_review: "border-purple-400/40 bg-purple-400/10 text-purple-600 dark:text-purple-400",
  delivered: "border-success/40 bg-success/10 text-success",
};

export function ProjectStatusBadge({ status }: { status: string }) {
  return (
    <Badge className={cn(PROJECT_STATUS_CLASS[status])}>
      {PROJECT_STATUS_LABEL[status] ?? status}
    </Badge>
  );
}

export function InvoiceStatusBadge({ status }: { status: string }) {
  return (
    <Badge
      className={cn(
        status === "paid"
          ? "border-success/40 bg-success/10 text-success"
          : "border-amber-400/40 bg-amber-400/10 text-amber-600 dark:text-amber-400"
      )}
    >
      {status === "paid" ? "Paid" : "Unpaid"}
    </Badge>
  );
}
