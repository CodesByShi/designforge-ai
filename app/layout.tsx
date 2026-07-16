import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "@/components/ui/toast";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://designforge.dev"),
  title: {
    default: "DesignForge AI — React Component Library & Playground",
    template: "%s · DesignForge AI",
  },
  description:
    "A premium, accessible React + Tailwind component library with a live playground, AI-assisted variant generation, and a copy-paste-first workflow.",
  keywords: ["React components", "Tailwind CSS", "component library", "design system", "AI UI generator"],
  openGraph: {
    title: "DesignForge AI",
    description: "Explore, customize, and copy production-ready React components — with an AI assistant built in.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DesignForge AI",
    description: "Explore, customize, and copy production-ready React components — with an AI assistant built in.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
