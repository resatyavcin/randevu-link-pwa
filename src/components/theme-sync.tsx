"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store";

export function ThemeSync() {
  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;
    const resolved =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;
    root.classList.toggle("dark", resolved === "dark");
  }, [theme]);

  return null;
}
