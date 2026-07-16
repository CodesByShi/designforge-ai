"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { copyToClipboard, cn } from "@/lib/utils";
import type { HighlighterGeneric } from "shiki";

type Highlighter = HighlighterGeneric<string, string>;

let highlighterPromise: Promise<Highlighter> | null = null;

/** Lazily creates (and caches) a single Shiki highlighter for the app's lifetime. */
function getShikiHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = import("shiki").then((shiki) =>
      shiki.createHighlighter({
        themes: ["github-dark-default"],
        langs: ["tsx", "jsx", "bash"],
      })
    );
  }
  return highlighterPromise;
}

export interface CodeBlockProps {
  code: string;
  lang?: "tsx" | "jsx" | "bash";
  className?: string;
  filename?: string;
}

/** Syntax-highlighted code panel (Shiki) with a copy button + success animation. */
export function CodeBlock({ code, lang = "tsx", className, filename }: CodeBlockProps) {
  const [html, setHtml] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    getShikiHighlighter().then((highlighter) => {
      if (cancelled) return;
      const out = highlighter.codeToHtml(code, { lang, theme: "github-dark-default" });
      setHtml(out);
    });
    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  async function handleCopy() {
    const ok = await copyToClipboard(code);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  }

  return (
    <div className={cn("relative overflow-hidden rounded-sf border border-graphite-border bg-[#0d1117]", className)}>
      {filename && (
        <div className="flex items-center justify-between border-b border-graphite-border px-4 py-2 text-xs text-paper-dim font-mono">
          {filename}
        </div>
      )}
      <button
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-md border border-graphite-border bg-graphite-light/80 px-2.5 py-1.5 text-xs text-paper-dim hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember transition-colors"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-400" /> Copied
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" /> Copy
          </>
        )}
      </button>
      <div className="scrollbar-thin overflow-x-auto p-4 text-[13px] leading-relaxed font-mono [&_pre]:!bg-transparent [&_pre]:!m-0">
        {html ? (
          <div dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <pre className="text-paper-dim whitespace-pre-wrap">{code}</pre>
        )}
      </div>
    </div>
  );
}
