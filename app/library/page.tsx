"use client";

import * as React from "react";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/footer";
import { SearchBar } from "@/components/ui/search-bar";
import { Button } from "@/components/ui/button";
import { ComponentCard } from "@/components/playground/component-card";
import { CATEGORIES, componentRegistry, type Category } from "@/data/components";
import { useKitStore } from "@/store/useKitStore";
import { cn } from "@/lib/utils";

type SortMode = "name-asc" | "category";

export default function LibraryPage() {
  const [query, setQuery] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState<Category | "All">("All");
  const [sort, setSort] = React.useState<SortMode>("category");
  const { toggleFavorite, isFavorite } = useKitStore();

  const filtered = React.useMemo(() => {
    let items = componentRegistry;
    if (activeCategory !== "All") items = items.filter((c) => c.category === activeCategory);
    if (query.trim()) {
      const q = query.toLowerCase();
      items = items.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return [...items].sort((a, b) =>
      sort === "name-asc" ? a.name.localeCompare(b.name) : a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
    );
  }, [query, activeCategory, sort]);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-3xl font-semibold">Component Library</h1>
          <p className="text-paper-dim">{componentRegistry.length} components across {CATEGORIES.length} categories. Search, filter, and open any of them in the playground.</p>
        </div>

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <SearchBar value={query} onChange={setQuery} className="md:w-80" aria-label="Search components" />
          <div className="flex items-center gap-2 text-sm">
            <label htmlFor="sort" className="text-paper-dim">Sort</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortMode)}
              className="rounded-sf border border-graphite-border bg-graphite px-2 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
            >
              <option value="category">Category</option>
              <option value="name-asc">Name (A–Z)</option>
            </select>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {(["All", ...CATEGORIES] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember",
                activeCategory === cat
                  ? "border-ember bg-ember/10 text-ember"
                  : "border-graphite-border text-paper-dim hover:text-paper"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-16 flex flex-col items-center text-center">
            <p className="font-display text-lg">No components match &ldquo;{query}&rdquo;</p>
            <p className="mt-1 text-sm text-paper-dim">Try a different term, or clear the filters.</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={() => { setQuery(""); setActiveCategory("All"); }}>
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((entry) => (
              <ComponentCard
                key={entry.id}
                entry={entry}
                isFavorite={isFavorite(entry.id)}
                onToggleFavorite={() => toggleFavorite(entry.id)}
              />
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
