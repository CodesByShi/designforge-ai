"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface NavLink {
  label: string;
  href: string;
}

/** Responsive top navigation bar with a mobile disclosure menu. */
export function Navbar({ brand, links, className }: { brand: React.ReactNode; links: NavLink[]; className?: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <header className={cn("sticky top-0 z-40 glass", className)}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="font-display text-lg font-semibold">{brand}</div>
        <nav aria-label="Primary" className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-paper-dim hover:text-paper transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button size="sm">Get Started</Button>
        </div>
        <button
          className="md:hidden rounded-sf p-2 text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <nav aria-label="Mobile" className="md:hidden border-t border-graphite-border px-4 py-3 space-y-2">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="block text-sm text-paper-dim hover:text-paper py-1">
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
