"use client";

import { AppHeader } from "@/components/app-header";
import { BottomNav } from "@/components/bottom-nav";

export default function ProfilPage() {
  return (
    <div className="min-h-screen p-3 sm:px-5 sm:pt-2 sm:pb-24 bg-background flex flex-col items-center gap-4">
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
