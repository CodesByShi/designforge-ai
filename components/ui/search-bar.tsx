"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  "aria-label"?: string;
}

/** Global search input with clear button, used for the component library search. */
export function SearchBar({ value, onChange, placeholder = "Search components…", className, ...aria }: SearchBarProps) {
  return (
    <div className={cn("relative flex items-center", className)}>
      <Search className="pointer-events-none absolute left-3 h-4 w-4 text-paper-dim" aria-hidden="true" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={aria["aria-label"] || "Search"}
        className="h-10 w-full rounded-sf border border-graphite-border bg-graphite pl-9 pr-9 text-sm text-paper placeholder:text-paper-faint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:border-ember/60"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-2 rounded p-1 text-paper-dim hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
