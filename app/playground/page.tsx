"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/footer";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PropsEditor } from "@/components/playground/props-editor";
import { PreviewFrame } from "@/components/playground/preview-frame";
import { CodeBlock } from "@/components/playground/code-block";
import { AiAssistant } from "@/components/playground/ai-assistant";
import { componentRegistry, getComponentById } from "@/data/components";
import { useKitStore } from "@/store/useKitStore";
import { useToastStore } from "@/store/useToastStore";

function buildCode(entryId: string, values: Record<string, any>, baseCode: string) {
  // Reflects current playground values back into a copyable JSX string, but only
  // for "simple" catalog entries (a single tag with plain text content). Entries
  // with nested JSX children (icons, composed elements) always show their
  // canonical example instead, since a naive rewrite would drop that markup.
  const entry = getComponentById(entryId);
  if (!entry || entry.controls.length === 0) return baseCode;

  const openTagCount = (baseCode.match(/</g) || []).length;
  const isSimpleTag = openTagCount === 2; // exactly one opening + one closing tag
  if (!isSimpleTag) return baseCode;

  const attrs = Object.entries(values)
    .map(([k, v]) => (typeof v === "boolean" ? (v ? k : `${k}={false}`) : `${k}="${v}"`))
    .join(" ");
  const tagMatch = baseCode.match(/<([A-Za-z]+)/);
  const tag = tagMatch ? tagMatch[1] : "Component";
  const childMatch = baseCode.match(/>([^<]*)<\//);
  const child = childMatch ? childMatch[1] : "";
  return `<${tag} ${attrs}>${child}</${tag}>`;
}

function PlaygroundInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const componentId = searchParams.get("component") || componentRegistry[0].id;
  const entry = getComponentById(componentId) || componentRegistry[0];

  const [values, setValues] = React.useState<Record<string, any>>(entry.defaultProps);
  const { toggleFavorite, isFavorite } = useKitStore();
  const push = useToastStore((s) => s.push);

  React.useEffect(() => {
    setValues(entry.defaultProps);
  }, [entry]);

  const code = buildCode(entry.id, values, entry.code);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-display text-3xl font-semibold">Playground</h1>
            <p className="mt-1 text-paper-dim">Tune props, preview responsively, and copy the result.</p>
          </div>
          <div className="w-64">
            <Select value={entry.id} onValueChange={(v) => router.push(`/playground?component=${v}`)}>
              <SelectTrigger aria-label="Choose component"><SelectValue /></SelectTrigger>
              <SelectContent>
                {componentRegistry.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Badge variant="ember">{entry.category}</Badge>
              {entry.tags.map((t) => <Badge key={t}>{t}</Badge>)}
            </div>
            <PreviewFrame>{entry.render(values)}</PreviewFrame>
            <CodeBlock code={code} filename={`${entry.name.replace(/\s+/g, "")}.tsx`} />
            <AiAssistant componentName={entry.name} baseCode={entry.code} />
          </div>

          <aside className="space-y-6">
            <div className="rounded-sf border border-graphite-border bg-graphite p-4">
              <h2 className="font-display text-sm font-semibold">Props</h2>
              <p className="mt-1 text-xs text-paper-dim">{entry.description}</p>
              <div className="mt-4">
                <PropsEditor controls={entry.controls} values={values} onChange={(k, v) => setValues((s) => ({ ...s, [k]: v }))} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                variant={isFavorite(entry.id) ? "primary" : "outline"}
                onClick={() => {
                  toggleFavorite(entry.id);
                  push({
                    title: isFavorite(entry.id) ? "Removed from My Kit" : "Saved to My Kit",
                    variant: "success",
                  });
                }}
              >
                <Heart className={isFavorite(entry.id) ? "h-4 w-4 fill-ink" : "h-4 w-4"} />
                {isFavorite(entry.id) ? "Saved to My Kit" : "Save to My Kit"}
              </Button>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

export default function PlaygroundPage() {
  return (
    <React.Suspense fallback={<div className="p-10 text-paper-dim">Loading playground…</div>}>
      <PlaygroundInner />
    </React.Suspense>
  );
}
