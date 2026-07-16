import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface PricingCardProps {
  tier: string;
  price: string;
  period?: string;
  features: string[];
  highlighted?: boolean;
}

/** Pricing tier card, with a highlighted "recommended" treatment. */
export function PricingCard({ tier, price, period = "/mo", features, highlighted }: PricingCardProps) {
  return (
    <Card
      className={cn("w-72", highlighted && "border-ember shadow-ember relative")}
    >
      {highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-ember px-3 py-0.5 text-xs font-medium text-ink">
          Recommended
        </span>
      )}
      <h3 className="font-display text-lg font-semibold">{tier}</h3>
      <p className="mt-2">
        <span className="font-display text-3xl">{price}</span>
        <span className="text-paper-dim text-sm">{period}</span>
      </p>
      <ul className="mt-4 space-y-2">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-paper-dim">
            <Check className="h-4 w-4 text-blueprint" aria-hidden="true" /> {f}
          </li>
        ))}
      </ul>
      <Button className="mt-5 w-full" variant={highlighted ? "gradient" : "outline"}>Choose {tier}</Button>
    </Card>
  );
}
