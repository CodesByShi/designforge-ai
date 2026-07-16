import Link from "next/link";
import { cn } from "@/lib/utils";

export const docsNav = [
  { slug: "getting-started", label: "Getting Started" },
  { slug: "button", label: "Button" },
];

export function DocsSidebar({ activeSlug }: { activeSlug: string }) {
  return (
    <nav aria-label="Documentation" className="hidden w-56 shrink-0 md:block">
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-paper-dim">Documentation</p>
      <ul className="space-y-1">
        {docsNav.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/docs/${item.slug}`}
              aria-current={activeSlug === item.slug ? "page" : undefined}
              className={cn(
                "block rounded-md px-3 py-1.5 text-sm transition-colors",
                activeSlug === item.slug ? "bg-ember/10 text-ember" : "text-paper-dim hover:text-paper hover:bg-graphite"
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
