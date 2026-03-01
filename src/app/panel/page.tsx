"use client";

import { AppHeader } from "@/components/app-header";
import { BottomNav } from "@/components/bottom-nav";

export default function PanelPage() {
  return (
    <div className="fixed inset-0 flex flex-col bg-background">
      <header className="shrink-0 px-3 sm:px-5 pt-2 pb-0 bg-background">
        <AppHeader />
      </header>
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-y-auto p-3 sm:px-5 sm:pt-2 pb-24 flex flex-col items-center gap-4">
      <main className="w-full max-w-lg flex flex-col gap-4 flex-1">
        <h1 className="text-foreground font-extrabold tracking-tight text-xl">
          Panel
        </h1>
        <p className="text-muted-foreground text-sm">
          Hesabınıza hoş geldiniz. Randevu ve işletme yönetimi buradan
          yapılacak.
        </p>
      </main>
      </div>
      <BottomNav />
    </div>
  );
}
