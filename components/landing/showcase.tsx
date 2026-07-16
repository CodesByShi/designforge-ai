"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { componentRegistry, type ComponentEntry } from "@/data/components";
import { Badge } from "@/components/ui/badge";

const featuredIds = ["gradient-button", "pricing-card", "glass-card", "stats-card", "modal", "toggle"];

export function ComponentShowcase() {
  const items = featuredIds
    .map((id) => componentRegistry.find((c) => c.id === id))
    .filter((entry): entry is ComponentEntry => Boolean(entry));
  return (
    <section className="border-y border-graphite-border bg-graphite/40">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-semibold md:text-4xl">A closer look</h2>
            <p className="mt-2 text-paper-dim">{"A sample of what's in the forge."}</p>
          </div>
          <Link href="/library" className="hidden sm:flex items-center gap-1 text-sm text-ember hover:underline">
            View all components <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((entry) => (
            <Link
              key={entry.id}
              href={`/playground?component=${entry.id}`}
              className="group rounded-sf border border-graphite-border bg-ink p-5 hover:border-ember/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
            >
              <div className="blueprint-grid flex h-32 items-center justify-center overflow-hidden rounded-md border border-graphite-border">
                <div className="scale-95 pointer-events-none">{entry.render(entry.defaultProps)}</div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <h3 className="text-sm font-medium">{entry.name}</h3>
                <Badge>{entry.category}</Badge>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
