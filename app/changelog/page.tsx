import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/footer";
import { Badge } from "@/components/ui/badge";
import { changelog } from "@/data/changelog";
import { formatMonthYear } from "@/lib/utils";

const typeVariant = { feature: "ember", improvement: "blueprint", fix: "default" } as const;

export default function ChangelogPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="font-display text-3xl font-semibold">Changelog</h1>
        <p className="mt-1 text-paper-dim">Every release, what shipped, and when.</p>

        <ol className="relative mt-10 border-l border-graphite-border pl-6">
          {changelog.map((entry) => (
            <li key={entry.version} className="mb-10 last:mb-0">
              <span className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-ember ring-4 ring-ink" aria-hidden="true" />
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-paper-dim">v{entry.version}</span>
                <time className="text-xs text-paper-dim">{formatMonthYear(entry.date)}</time>
                <Badge variant={typeVariant[entry.type]}>{entry.type}</Badge>
              </div>
              <h2 className="mt-1.5 font-display text-lg font-semibold">{entry.title}</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-paper-dim">
                {entry.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </main>
      <SiteFooter />
    </>
  );
}
