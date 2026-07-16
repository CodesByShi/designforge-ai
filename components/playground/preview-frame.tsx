"use client";

import * as React from "react";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { cn } from "@/lib/utils";

const widths = { desktop: "100%", tablet: "768px", mobile: "375px" };
type Mode = keyof typeof widths;

/** Preview canvas with responsive-mode switcher (desktop / tablet / mobile). */
export function PreviewFrame({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<Mode>("desktop");
  return (
    <div className="rounded-sf border border-graphite-border bg-graphite">
      <div className="flex items-center justify-between border-b border-graphite-border px-3 py-2">
        <span className="text-xs text-paper-dim font-mono">Preview</span>
        <div className="flex items-center gap-1" role="group" aria-label="Preview viewport size">
          {(["desktop", "tablet", "mobile"] as Mode[]).map((m) => {
            const Icon = m === "desktop" ? Monitor : m === "tablet" ? Tablet : Smartphone;
            return (
              <button
                key={m}
                onClick={() => setMode(m)}
                aria-pressed={mode === m}
                aria-label={`${m} preview`}
                className={cn(
                  "rounded-md p-1.5 text-paper-dim hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember",
                  mode === m && "bg-ember/10 text-ember"
                )}
              >
                <Icon className="h-4 w-4" />
              </button>
            );
          })}
        </div>
      </div>
      <div className="blueprint-grid flex min-h-[220px] items-center justify-center overflow-auto p-8">
        <div style={{ width: widths[mode], maxWidth: "100%" }} className="flex items-center justify-center transition-all duration-300">
          {children}
        </div>
      </div>
    </div>
  );
}
