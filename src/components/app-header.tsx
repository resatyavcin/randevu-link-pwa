"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Moon, Sun } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { useAppStore } from "@/store";

const NotificationSheet = dynamic(
  () =>
    import("@/components/notification-sheet").then((m) => ({
      default: m.NotificationSheet,
    })),
  { ssr: false },
);

function useResolvedDark() {
  const theme = useAppStore((s) => s.theme);
  const [resolvedDark, setResolvedDark] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      setResolvedDark(true);
      return;
    }
    if (theme === "light") {
      setResolvedDark(false);
      return;
    }
    const m = window.matchMedia("(prefers-color-scheme: dark)");
    setResolvedDark(m.matches);
    const fn = () => setResolvedDark(m.matches);
    m.addEventListener("change", fn);
    return () => m.removeEventListener("change", fn);
  }, [theme]);

  return resolvedDark;
}

const ICON_SIZE = "size-10";

const iconButtonClass =
  "flex shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground dark:text-muted-foreground dark:hover:bg-white/10 dark:hover:text-foreground";

export function AppHeader() {
  const pathname = usePathname();
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);
  const resolvedDark = useResolvedDark();
  const [notificationOpen, setNotificationOpen] = useState(false);

  const isAuthPage =
    pathname === "/" ||
    pathname === "/login" ||
    pathname.startsWith("/login/") ||
    pathname === "/register" ||
    pathname.startsWith("/register/");
  const showNotification = !isAuthPage;

  const toggleTheme = () => {
    setTheme(resolvedDark ? "light" : "dark");
  };

  return (
    <header className="flex h-12 w-full shrink-0 items-center pt-2">
      <div className="flex min-w-0 flex-1 items-center justify-start">
        <button
          type="button"
          onClick={toggleTheme}
          className={`${iconButtonClass} ${ICON_SIZE}`}
          aria-label={resolvedDark ? "Açık tema" : "Koyu tema"}
        >
          {resolvedDark ? (
            <Sun className="size-5" />
          ) : (
            <Moon className="size-5" />
          )}
        </button>
      </div>
      <Link
        href="/panel"
        className="flex shrink-0 items-center justify-center outline-none rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label="Panele git"
      >
        <Logo className="shrink-0" />
      </Link>
      <div className="flex min-w-0 flex-1 items-center justify-end">
        {showNotification ? (
          <button
            type="button"
            onClick={() => setNotificationOpen(true)}
            className={`${iconButtonClass} ${ICON_SIZE}`}
            aria-label="Bildirimler"
          >
            <Bell className="size-5" />
          </button>
        ) : (
          <div className={ICON_SIZE} aria-hidden />
        )}
      </div>
      <NotificationSheet
        open={notificationOpen}
        onOpenChange={setNotificationOpen}
      />
    </header>
  );
}
