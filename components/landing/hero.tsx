"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/playground/code-block";

const heroSnippet = `<Button variant="gradient" size="lg">
  Ship it
</Button>`;

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-graphite-border">
      <div className="blueprint-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-ember-glow"
        style={{ "--x": "50%", "--y": "-10%" } as React.CSSProperties}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-20 md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex max-w-2xl flex-col items-center text-center"
        >
          <span className="corner-brackets inline-flex items-center gap-2 rounded-full border border-graphite-border bg-graphite/60 px-3 py-1 text-xs text-paper-dim">
            <Hammer className="h-3.5 w-3.5 text-ember" /> v2.4 — AI variant generator now live
          </span>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl text-balance">
            Forge production React components,
            <span className="text-ember"> not from scratch.</span>
          </h1>
          <p className="mt-5 max-w-xl text-balance text-paper-dim md:text-lg">
            30+ accessible, themeable components. A live playground to tune every prop.
            An AI assistant that rewrites variants in plain English. Copy the JSX and ship.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" variant="gradient" asChild>
              <Link href="/library">
                Browse the library <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/playground">Open playground</Link>
            </Button>
          </div>
        </motion.div>

        {/* Signature element: code forging into a live rendered component */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative mx-auto mt-16 grid max-w-4xl items-center gap-0 md:grid-cols-[1fr_auto_1fr]"
        >
          <CodeBlock code={heroSnippet} filename="Button.tsx" className="shadow-panel" />

          <div className="relative hidden h-full w-10 md:flex items-center justify-center" aria-hidden="true">
            <div className="h-px w-10 bg-[linear-gradient(90deg,#FF6A39,#4FD8C4,#FF6A39)] bg-[length:200%_auto] animate-seam-flow" />
            <span className="absolute h-2 w-2 rounded-full bg-ember animate-spark" />
          </div>

          <div className="mt-6 flex items-center justify-center rounded-sf border border-graphite-border bg-graphite p-10 shadow-panel md:mt-0">
            <Button variant="gradient" size="lg">Ship it</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
