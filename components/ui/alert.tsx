import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = { info: Info, success: CheckCircle2, warning: AlertTriangle, error: XCircle };
const styles = {
  info: "border-blueprint/40 text-blueprint bg-blueprint/5",
  success: "border-emerald-500/40 text-emerald-400 bg-emerald-500/5",
  warning: "border-copper/40 text-copper-light bg-copper/5",
  error: "border-red-500/40 text-red-400 bg-red-500/5",
};

export interface AlertProps {
  variant?: keyof typeof icons;
  title: string;
  description?: string;
  className?: string;
}

/** Inline alert banner with semantic role="alert" for assistive tech. */
export function Alert({ variant = "info", title, description, className }: AlertProps) {
  const Icon = icons[variant];
  return (
    <div role="alert" className={cn("flex gap-3 rounded-sf border p-4", styles[variant], className)}>
      <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
      <div>
        <p className="text-sm font-medium text-paper">{title}</p>
        {description && <p className="mt-0.5 text-sm text-paper-dim">{description}</p>}
      </div>
    </div>
  );
}
