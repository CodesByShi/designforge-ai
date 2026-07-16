import Link from "next/link";
import { Heart } from "lucide-react";
import type { ComponentEntry } from "@/data/components";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/** Grid tile for the component library — preview, name, category, and a favorite toggle. */
export function ComponentCard({
  entry,
  isFavorite,
  onToggleFavorite,
}: {
  entry: ComponentEntry;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) {
  return (
    <div className="group relative rounded-sf border border-graphite-border bg-graphite p-4 hover:border-ember/40 transition-colors">
      <button
        onClick={onToggleFavorite}
        aria-pressed={isFavorite}
        aria-label={isFavorite ? `Remove ${entry.name} from My Kit` : `Save ${entry.name} to My Kit`}
        className="absolute right-3 top-3 z-10 rounded-md p-1.5 text-paper-dim hover:text-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
      >
        <Heart className={cn("h-4 w-4", isFavorite && "fill-ember text-ember")} />
      </button>
      <Link href={`/playground?component=${entry.id}`} className="block focus-visible:outline-none">
        <div className="blueprint-grid flex h-28 items-center justify-center overflow-hidden rounded-md border border-graphite-border bg-ink/60">
          <div className="scale-90 pointer-events-none">{entry.render(entry.defaultProps)}</div>
        </div>
        <div className="mt-3">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-sm">{entry.name}</h3>
            <Badge variant="default">{entry.category}</Badge>
          </div>
          <p className="mt-1 text-xs text-paper-dim line-clamp-2">{entry.description}</p>
        </div>
      </Link>
    </div>
  );
}
