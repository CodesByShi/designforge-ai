import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface StatsCardProps {
  label: string;
  value: string;
  delta?: number;
}

/** Stat tile — big number, label, and a trend delta. */
export function StatsCard({ label, value, delta }: StatsCardProps) {
  const positive = (delta ?? 0) >= 0;
  return (
    <Card className="w-48">
      <p className="text-xs uppercase tracking-wide text-paper-dim">{label}</p>
      <p className="mt-1.5 font-display text-2xl font-semibold">{value}</p>
      {typeof delta === "number" && (
        <p className={cn("mt-1 flex items-center gap-1 text-xs", positive ? "text-emerald-400" : "text-red-400")}>
          {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
          {Math.abs(delta)}% vs last month
        </p>
      )}
    </Card>
  );
}
