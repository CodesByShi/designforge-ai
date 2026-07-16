import Link from "next/link";
import { getComponentById } from "@/data/components";
import { CodeBlock } from "@/components/playground/code-block";

/** Live component preview embedded inside an MDX docs page, by registry id. */
export function ComponentPreview({ id }: { id: string }) {
  const entry = getComponentById(id);
  if (!entry) return <p className="text-red-400 text-sm">Unknown component id: {id}</p>;
  return (
    <div className="not-prose space-y-3">
      <div className="blueprint-grid flex min-h-[140px] items-center justify-center rounded-sf border border-graphite-border bg-graphite p-8">
        {entry.render(entry.defaultProps)}
      </div>
      <CodeBlock code={entry.code} filename={`${entry.name.replace(/\s+/g, "")}.tsx`} />
      <Link href={`/playground?component=${id}`} className="inline-block text-sm text-ember hover:underline">
        Open in playground →
      </Link>
    </div>
  );
}
