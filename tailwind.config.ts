import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core forge palette — named tokens, referenced everywhere instead of raw hex.
        ink: {
          DEFAULT: "#0B0D10", // primary background — near-black steel
          soft: "#101317",
        },
        graphite: {
          DEFAULT: "#15181D", // panel / card surface
          light: "#1C2027",
          border: "#262B33",
        },
        paper: {
          DEFAULT: "#ECE9E4", // primary text on dark
          dim: "#9AA1AC",
          faint: "#5B616C",
        },
        ember: {
          DEFAULT: "#FF6A39", // forge-fire orange — primary accent
          hot: "#FF8A5C",
          dim: "#B84A24",
        },
        copper: {
          DEFAULT: "#C9823D", // secondary warm accent
          light: "#E0A868",
        },
        blueprint: {
          DEFAULT: "#4FD8C4", // cool schematic teal — data/code accent
          dim: "#2E9C8C",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "forge-grid":
          "linear-gradient(rgba(236,233,228,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(236,233,228,0.035) 1px, transparent 1px)",
        "ember-glow":
          "radial-gradient(600px circle at var(--x,50%) var(--y,0%), rgba(255,106,57,0.16), transparent 60%)",
      },
      backgroundSize: {
        grid: "36px 36px",
      },
      boxShadow: {
        ember: "0 0 0 1px rgba(255,106,57,0.4), 0 8px 30px -8px rgba(255,106,57,0.35)",
        panel: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 40px -20px rgba(0,0,0,0.6)",
      },
      keyframes: {
        spark: {
          "0%": { transform: "translateY(0) scale(1)", opacity: "1" },
          "100%": { transform: "translateY(-40px) scale(0.3)", opacity: "0" },
        },
        "pulse-glow": {
          "0%,100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        "seam-flow": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        spark: "spark 1.4s ease-out infinite",
        "pulse-glow": "pulse-glow 2.4s ease-in-out infinite",
        "seam-flow": "seam-flow 3s linear infinite",
      },
      borderRadius: {
        sf: "10px",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

export default config;
