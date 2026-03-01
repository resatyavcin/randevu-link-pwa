"use client";

import { AppHeader } from "@/components/app-header";
import { BottomNav } from "@/components/bottom-nav";
import { useAppStore } from "@/store";

export default function PanelPage() {
  const authToken = useAppStore((s) => s.authToken);
  const setAuthToken = useAppStore((s) => s.setAuthToken);

  return (
    <div className="min-h-screen p-3 sm:px-5 sm:pt-2 sm:pb-24 bg-background flex flex-col items-center gap-4">
      <AppHeader />
      <main className="w-full max-w-lg flex flex-col gap-4 flex-1">
        <h1 className="text-foreground font-extrabold tracking-tight text-xl">
          Panel
        </h1>
        <p className="text-muted-foreground text-sm">
          Hesabınıza hoş geldiniz. Randevu ve işletme yönetimi buradan
          yapılacak.
        </p>
        {authToken !== null && (
          <button
            type="button"
            onClick={() => setAuthToken(null)}
            className="text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground"
          >
            Çıkış yap
          </button>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
