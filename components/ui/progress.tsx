"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

export interface ProgressBarProps {
  value: number;
  label?: string;
  className?: string;
}

/** Progress bar with accessible value text and animated fill. */
export function ProgressBar({ value, label, className }: ProgressBarProps) {
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="mb-1.5 flex justify-between text-xs text-paper-dim">
          <span>{label}</span>
          <span>{value}%</span>
        </div>
      )}
      <ProgressPrimitive.Root
        value={value}
        aria-label={label}
        className="relative h-2 w-full overflow-hidden rounded-full bg-graphite"
      >
        <ProgressPrimitive.Indicator
          style={{ transform: `translateX(-${100 - value}%)` }}
          className="h-full w-full flex-1 bg-gradient-to-r from-ember to-blueprint transition-transform duration-500 ease-out"
        />
      </ProgressPrimitive.Root>
    </div>
  );
}
