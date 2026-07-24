import { PROJECT_STATUS_LABEL } from "@/components/dashboard/status-badge";

type StatusEvent = {
  id: string;
  status: string;
  createdAt: Date | string;
};

export function ProjectStatusTimeline({ events }: { events: StatusEvent[] }) {
  if (events.length === 0) return null;

  // Most recent first.
  const ordered = [...events].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="rounded-md border border-border bg-surface p-6">
      <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-text-light">
        Project Timeline
      </h3>
      <ol className="mt-4 flex flex-col gap-5">
        {ordered.map((event, i) => (
          <li key={event.id} className="relative flex gap-3 pl-5">
            <span
              className={
                "absolute left-0 top-1.5 h-2 w-2 shrink-0 rounded-full " +
                (i === 0 ? "bg-accent" : "bg-border")
              }
            />
            {i < ordered.length - 1 ? (
              <span className="absolute left-[3.5px] top-3.5 bottom-[-1.25rem] w-px bg-border" />
            ) : null}
            <div>
              <p className="text-sm font-medium text-text">
                {PROJECT_STATUS_LABEL[event.status] ?? event.status}
              </p>
              <p className="text-xs text-text-light">
                {new Date(event.createdAt).toLocaleString([], {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
