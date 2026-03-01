"use client";

import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/app-header";
import { BottomNav } from "@/components/bottom-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store";
import { cn } from "@/lib/utils";

/** İleride auth/API'den gelecek */
const PROFILE_NAME = "Reşat Yavçin";
const PROFILE_IMAGE_URL: string | null = null;

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return parts[0]?.slice(0, 2).toUpperCase() ?? "";
}

const listItemClass =
  "flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-medium text-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export default function ProfilPage() {
  const router = useRouter();
  const setAuthToken = useAppStore((s) => s.setAuthToken);

  const handleLogout = () => {
    setAuthToken(null);
    router.push("/");
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-background">
      <header className="shrink-0 px-3 sm:px-5 pt-2 pb-2 bg-background/70 dark:bg-background/60 backdrop-blur-md">
        <AppHeader />
      </header>
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-y-auto p-3 sm:px-5 sm:pt-2 pb-24 flex flex-col items-center gap-4">
      <main className="w-full max-w-lg flex flex-col gap-6 flex-1">
        <div className="flex items-center gap-3">
          <Avatar className="size-14 shrink-0">
            {PROFILE_IMAGE_URL ? (
              <AvatarImage src={PROFILE_IMAGE_URL} alt={PROFILE_NAME} />
            ) : null}
            <AvatarFallback className="bg-foreground text-background text-lg font-semibold">
              {getInitials(PROFILE_NAME)}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-foreground font-extrabold tracking-tight text-xl">
            {PROFILE_NAME}
          </h1>
        </div>

        <ul className="flex w-full flex-col gap-0.5 rounded-xl border border-border bg-card overflow-hidden" role="list">
          <li>
            <button
              type="button"
              onClick={handleLogout}
              className={cn(listItemClass, "text-destructive hover:bg-destructive/10 hover:text-destructive")}
            >
              Çıkış yap
            </button>
          </li>
        </ul>
      </main>
      </div>
      <BottomNav />
    </div>
  );
}
