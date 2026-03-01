"use client";

import { AppHeader } from "@/components/app-header";
import { BottomNav } from "@/components/bottom-nav";

export default function ProfilPage() {
  return (
    <div className="fixed inset-0 top-0 left-0 right-0 bottom-0 overflow-y-auto overflow-x-hidden overscroll-y-auto p-3 sm:px-5 sm:pt-2 pb-24 bg-background flex flex-col items-center gap-4">
      <AppHeader />
      <main className="w-full max-w-lg flex flex-col gap-4 flex-1">
        <h1 className="text-foreground font-extrabold tracking-tight text-xl">
          Profilim
        </h1>
        <p className="text-muted-foreground text-sm">
          Profil bilgileriniz ileride burada yer alacak.
        </p>
      </main>
      <BottomNav />
    </div>
  );
}
