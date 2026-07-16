"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeMode = "dark" | "light";
export type BrandAccent = "ember" | "blueprint" | "copper";

interface ThemeState {
  mode: ThemeMode;
  accent: BrandAccent;
  fontScale: number; // 0.9 - 1.15
  setMode: (m: ThemeMode) => void;
  setAccent: (a: BrandAccent) => void;
  setFontScale: (s: number) => void;
}

/**
 * Theme engine — dark/light mode, brand accent swap, and font scale.
 * Persisted to localStorage so preferences survive reloads (no backend required).
 */
export const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      mode: "dark",
      accent: "ember",
      fontScale: 1,
      setMode: (mode) => set({ mode }),
      setAccent: (accent) => set({ accent }),
      setFontScale: (fontScale) => set({ fontScale }),
    }),
    { name: "designforge-theme" }
  )
);
