import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DeveloperCta() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="corner-brackets relative overflow-hidden rounded-sf border border-ember/30 bg-[linear-gradient(135deg,rgba(255,106,57,0.1),rgba(79,216,196,0.06))] p-10 text-center md:p-16">
        <h2 className="font-display text-3xl font-semibold md:text-4xl">Stop rebuilding the same button.</h2>
        <p className="mx-auto mt-3 max-w-lg text-paper-dim">
          Copy a component, tune it in the playground, or ask the AI assistant to restyle it — then paste straight into your codebase.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" variant="gradient" asChild>
            <Link href="/library">Start building <ArrowRight className="h-4 w-4" /></Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/docs/getting-started">Read the docs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
