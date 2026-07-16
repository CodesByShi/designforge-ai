import Link from "next/link";
import { Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Hammer className="h-8 w-8 text-ember" aria-hidden="true" />
      <h1 className="mt-4 font-display text-2xl font-semibold">{"This page hasn't been forged yet."}</h1>
      <p className="mt-2 text-paper-dim">{"The page you're looking for doesn't exist or may have moved."}</p>
      <Button asChild className="mt-6">
        <Link href="/">Back to home</Link>
      </Button>
    </main>
  );
}
