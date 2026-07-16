import Link from "next/link";
import { Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Library", href: "/library" },
  { label: "Playground", href: "/playground" },
  { label: "Docs", href: "/docs/getting-started" },
  { label: "Changelog", href: "/changelog" },
  { label: "Theme", href: "/settings" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 glass">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold">
          <Hammer className="h-5 w-5 text-ember" aria-hidden="true" />
          DesignForge <span className="text-ember">AI</span>
        </Link>
        <nav aria-label="Primary" className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-paper-dim hover:text-paper transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/my-kit" className="hidden sm:block text-sm text-paper-dim hover:text-paper transition-colors">
            My Kit
          </Link>
          <Button size="sm" asChild>
            <Link href="/library">Browse Components</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
