"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  hint?: string;
  label?: string;
}

/** Text input with label, hint, and error states — fully associated via aria for screen readers. */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-paper">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={cn(hintId, errorId) || undefined}
          className={cn(
            "flex h-10 w-full rounded-sf border border-graphite-border bg-graphite px-3 text-sm text-paper placeholder:text-paper-faint",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:border-ember/60",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500/60 focus-visible:ring-red-500",
            className
          )}
          {...props}
        />
        {hint && !error && <p id={hintId} className="text-xs text-paper-dim">{hint}</p>}
        {error && <p id={errorId} role="alert" className="text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
