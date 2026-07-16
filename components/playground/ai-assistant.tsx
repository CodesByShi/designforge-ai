"use client";

import * as React from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/playground/code-block";
import { Alert } from "@/components/ui/alert";

export function AiAssistant({ componentName, baseCode }: { componentName: string; baseCode: string }) {
  const [prompt, setPrompt] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<{ code: string; explanation: string; usedMock: boolean } | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  async function handleGenerate() {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ai-generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ prompt, baseCode, componentName }),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setResult(data);
    } catch {
      setError("Couldn't reach the AI generator. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4 rounded-sf border border-graphite-border bg-graphite p-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-ember" aria-hidden="true" />
        <h3 className="font-display text-sm font-semibold">AI Component Generator</h3>
      </div>
      <p className="text-xs text-paper-dim">
        Describe a style change in plain English — e.g. &ldquo;make this a blue glassmorphism card&rdquo;.
      </p>
      <div className="flex gap-2">
        <Input
          aria-label="Describe the change you want"
          placeholder={`Make ${componentName} a glassmorphism card with a blue theme`}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
        />
        <Button onClick={handleGenerate} disabled={loading || !prompt.trim()} isLoading={loading}>
          Generate
        </Button>
      </div>

      {error && <Alert variant="error" title="Generation failed" description={error} />}

      {result && (
        <div className="space-y-3 pt-2">
          {result.usedMock && (
            <Alert
              variant="warning"
              title="Using mock generator"
              description="No ANTHROPIC_API_KEY was found, so this response was generated locally by pattern rules instead of a live model call."
            />
          )}
          <p className="text-sm text-paper-dim">{result.explanation}</p>
          <CodeBlock code={result.code} filename={`${componentName}.tsx`} />
        </div>
      )}
    </div>
  );
}
