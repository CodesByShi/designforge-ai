"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

/** Toggle switch (Radix Switch under the hood) with accessible label. */
const Toggle = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> & { label?: string }
>(({ className, label, id, ...props }, ref) => {
  const generatedId = React.useId();
  const toggleId = id || generatedId;
  return (
    <div className="flex items-center gap-2">
      <SwitchPrimitive.Root
        ref={ref}
        id={toggleId}
        className={cn(
          "peer inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-graphite-border bg-graphite transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember",
          "data-[state=checked]:bg-ember data-[state=checked]:border-ember",
          className
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb className="block h-4 w-4 translate-x-1 rounded-full bg-paper transition-transform data-[state=checked]:translate-x-6 data-[state=checked]:bg-ink" />
      </SwitchPrimitive.Root>
      {label && (
        <label htmlFor={toggleId} className="text-sm text-paper cursor-pointer">
          {label}
        </label>
      )}
    </div>
  );
});
Toggle.displayName = "Toggle";

export { Toggle };
