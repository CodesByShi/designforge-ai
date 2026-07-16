"use client";

import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PricingCard } from "@/components/ui/pricing-card";
import { useTheme, type BrandAccent } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

const accents: { id: BrandAccent; label: string; hex: string }[] = [
  { id: "ember", label: "Ember", hex: "#FF6A39" },
  { id: "blueprint", label: "Blueprint", hex: "#4FD8C4" },
  { id: "copper", label: "Copper", hex: "#C9823D" },
];

export default function SettingsPage() {
  const { mode, accent, fontScale, setMode, setAccent, setFontScale } = useTheme();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="font-display text-3xl font-semibold">Theme Engine</h1>
        <p className="mt-1 text-paper-dim">Every choice here is saved locally and applied instantly across the app.</p>

        <div className="mt-8 grid gap-6 md:grid-cols-[280px_1fr]">
          <div className="space-y-6">
            <Card>
              <h2 className="text-sm font-medium">Mode</h2>
              <div className="mt-3 flex gap-2">
                {(["dark", "light"] as const).map((m) => (
                  <Button key={m} size="sm" variant={mode === m ? "primary" : "outline"} onClick={() => setMode(m)}>
                    {m === "dark" ? "Dark" : "Light"}
                  </Button>
                ))}
              </div>
            </Card>

            <Card>
              <h2 className="text-sm font-medium">Brand accent</h2>
              <div className="mt-3 flex gap-2">
                {accents.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setAccent(a.id)}
                    aria-pressed={accent === a.id}
                    aria-label={a.label}
                    style={{ backgroundColor: a.hex }}
                    className={cn(
                      "h-8 w-8 rounded-full border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember",
                      accent === a.id ? "border-paper" : "border-transparent"
                    )}
                  />
                ))}
              </div>
            </Card>

            <Card>
              <h2 className="text-sm font-medium">Font scale</h2>
              <input
                type="range"
                min={0.9}
                max={1.15}
                step={0.05}
                value={fontScale}
                onChange={(e) => setFontScale(Number(e.target.value))}
                aria-label="Font scale"
                className="mt-3 w-full accent-ember"
              />
              <p className="mt-1 text-xs text-paper-dim">{Math.round(fontScale * 100)}%</p>
            </Card>
          </div>

          <div className="flex items-center justify-center rounded-sf border border-graphite-border bg-graphite p-10">
            <PricingCard
              tier="Pro"
              price="$29"
              features={["Unlimited components", "AI generator", "Priority support"]}
              highlighted
            />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
