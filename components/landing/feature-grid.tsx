"use client";

import { motion } from "framer-motion";
import { Blocks, Sparkles, SlidersHorizontal, Palette, ShieldCheck, PackageSearch } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

const features = [
  { icon: <Blocks className="h-5 w-5" />, title: "30+ components", description: "Buttons, forms, navigation, cards, feedback, and data display — all typed and themeable." },
  { icon: <SlidersHorizontal className="h-5 w-5" />, title: "Live playground", description: "Tune variants, sizes, and colors and watch the preview and code update instantly." },
  { icon: <Sparkles className="h-5 w-5" />, title: "AI variant generator", description: "Describe a style in plain English — get back working JSX and Tailwind classes." },
  { icon: <Palette className="h-5 w-5" />, title: "Theme engine", description: "Swap accent colors, font scale, and dark/light mode with a live token preview." },
  { icon: <ShieldCheck className="h-5 w-5" />, title: "Accessible by default", description: "Keyboard navigation, ARIA labels, and visible focus states on every component." },
  { icon: <PackageSearch className="h-5 w-5" />, title: "My Kit", description: "Favorite components, build collections, and export a ZIP — no account required." },
];

export function FeatureGrid() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="font-display text-3xl font-semibold md:text-4xl">Everything a component library should be</h2>
        <p className="mt-3 text-paper-dim">Built like a real product, not a demo — because your portfolio deserves the difference.</p>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <GlassCard title={f.title} description={f.description} icon={f.icon} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
