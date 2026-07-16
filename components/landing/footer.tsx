import Link from "next/link";
import { Hammer } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-graphite-border">
      <div className="mx-auto max-w-6xl px-6 py-10 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display font-semibold">
            <Hammer className="h-4 w-4 text-ember" /> DesignForge AI
          </div>
          <p className="mt-2 text-sm text-paper-dim max-w-xs">
            An open component forge for React teams who copy-paste their way to production.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-medium uppercase tracking-wide text-paper-dim">Product</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/library" className="text-paper-dim hover:text-paper">Component Library</Link></li>
            <li><Link href="/playground" className="text-paper-dim hover:text-paper">Playground</Link></li>
            <li><Link href="/my-kit" className="text-paper-dim hover:text-paper">My Kit</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-medium uppercase tracking-wide text-paper-dim">Resources</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/docs/getting-started" className="text-paper-dim hover:text-paper">Documentation</Link></li>
            <li><Link href="/changelog" className="text-paper-dim hover:text-paper">Changelog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-medium uppercase tracking-wide text-paper-dim">Built with</h4>
          <p className="mt-3 text-sm text-paper-dim">Next.js · Tailwind CSS · Radix UI · Framer Motion · Zustand</p>
        </div>
      </div>
      <div className="border-t border-graphite-border py-5 text-center text-xs text-paper-faint">
        © {new Date().getFullYear()} DesignForge AI. Built for portfolios, not sold as a product.
      </div>
    </footer>
  );
}
