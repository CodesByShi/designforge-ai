"use client";

import * as React from "react";
import { useTheme } from "@/hooks/useTheme";

const accentMap = {
  ember: "#FF6A39",
  blueprint: "#4FD8C4",
  copper: "#C9823D",
};

/** Applies the persisted theme (mode, accent, font scale) to <html> on mount and on change. */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { mode, accent, fontScale } = useTheme();

  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", mode === "light");
    root.style.setProperty("--brand-accent", accentMap[accent]);
    root.style.fontSize = `${fontScale * 100}%`;
  }, [mode, accent, fontScale]);

  return <>{children}</>;
}
