import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", {
  variants: {
    variant: {
      default: "bg-graphite-light text-paper-dim border border-graphite-border",
      ember: "bg-ember/10 text-ember border border-ember/30",
      blueprint: "bg-blueprint/10 text-blueprint border border-blueprint/30",
      success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

/** Small status/tag pill used across the library for categories and states. */
export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
