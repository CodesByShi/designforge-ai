import { cn } from "@/lib/utils";

export interface TimelineEvent {
  date: string;
  title: string;
  description?: string;
}

/** Vertical timeline for changelogs, activity feeds, and roadmaps. */
export function Timeline({ events, className }: { events: TimelineEvent[]; className?: string }) {
  return (
    <ol className={cn("relative border-l border-graphite-border pl-6", className)}>
      {events.map((e, i) => (
        <li key={i} className="mb-8 last:mb-0">
          <span className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-ember ring-4 ring-ink" aria-hidden="true" />
          <time className="text-xs text-paper-dim">{e.date}</time>
          <h4 className="font-medium text-sm mt-0.5">{e.title}</h4>
          {e.description && <p className="mt-1 text-sm text-paper-dim">{e.description}</p>}
        </li>
      ))}
    </ol>
  );
}
