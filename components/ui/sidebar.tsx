"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export interface SidebarItem {
  label: string;
  icon: LucideIcon;
  href: string;
}

/** Collapsible left navigation sidebar used across dashboards/docs. */
export function Sidebar({ items, activeHref, className }: { items: SidebarItem[]; activeHref?: string; className?: string }) {
  return (
    <nav aria-label="Sidebar" className={cn("w-60 shrink-0 border-r border-graphite-border p-3 space-y-1", className)}>
      {items.map((item) => {
        const Icon = item.icon;
        const active = item.href === activeHref;
        return (
          <a
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-2.5 rounded-sf px-3 py-2 text-sm transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember",
              active ? "bg-ember/10 text-ember" : "text-paper-dim hover:bg-graphite-light hover:text-paper"
            )}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
