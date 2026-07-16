import * as React from "react";
import { Card } from "@/components/ui/card";

/** Glassmorphism card — translucent, blurred surface for hero/feature contexts. */
export function GlassCard({ title, description, icon }: { title: string; description: string; icon?: React.ReactNode }) {
  return (
    <Card glass className="w-72">
      {icon && <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-sf bg-ember/10 text-ember">{icon}</div>}
      <h3 className="font-display text-base font-semibold">{title}</h3>
      <p className="mt-1.5 text-sm text-paper-dim">{description}</p>
    </Card>
  );
}
