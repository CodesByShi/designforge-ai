import * as React from "react";
import { cn } from "@/lib/utils";

/** Base card surface — the shared shell for Profile/Product/Pricing/Glass cards. */
export function Card({ className, glass, ...props }: React.HTMLAttributes<HTMLDivElement> & { glass?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-sf border border-graphite-border p-5",
        glass ? "glass shadow-panel" : "bg-graphite",
        className
      )}
      {...props}
    />
  );
}
