"use client";

import { Moon, Sun } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { useAppStore } from "@/store";

export function AppHeader() {
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="flex w-full shrink-0 items-center pt-2">
      <div className="flex-1 min-w-0" aria-hidden />
      <Logo className="shrink-0" />
      <div className="flex flex-1 min-w-0 items-center justify-end">
        <button
          type="button"
          onClick={toggleTheme}
          className="flex size-10 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10 dark:hover:text-foreground"
          aria-label={theme === "dark" ? "Açık tema" : "Koyu tema"}
        >
          {theme === "dark" ? (
            <Sun className="size-5" />
          ) : (
            <Moon className="size-5" />
          )}
        </button>
      </div>
    </header>
  );
}
