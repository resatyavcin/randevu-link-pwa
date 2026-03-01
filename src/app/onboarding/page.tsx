"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store";
import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

const TOTAL_STEPS = 1;
const PANEL_PATH = "/panel";
const LOGIN_PATH = "/login";

export default function OnboardingPage() {
  const router = useRouter();
  const authToken = useAppStore((s) => s.authToken);
  const onboardingCompleted = useAppStore((s) => s.onboardingCompleted);
  const setOnboardingCompleted = useAppStore((s) => s.setOnboardingCompleted);
  const setSalon = useAppStore((s) => s.setSalon);

  const [step, setStep] = useState(1);
  const [salonName, setSalonName] = useState("");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (authToken === null) {
      router.replace(LOGIN_PATH);
      return;
    }
    if (onboardingCompleted) {
      router.replace(PANEL_PATH);
    }
  }, [authToken, onboardingCompleted, router]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file?.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setLogoPreview(url);
  };

  const handleFinish = () => {
    const name = salonName.trim();
    if (!name) return;
    setSalon(name, logoPreview);
    setOnboardingCompleted(true);
    router.replace(PANEL_PATH);
  };

  if (authToken === null || onboardingCompleted) {
    return null;
  }

  return (
    <div className="fixed inset-0 overflow-y-auto overflow-x-hidden p-3 sm:px-5 sm:pt-2 pb-8 bg-background flex flex-col items-center gap-6">
      <AppHeader />
      <main className="w-full max-w-lg flex flex-col gap-8 flex-1">
        <div className="flex items-center gap-2">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => (
            <div
              key={s}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                s <= step ? "bg-primary" : "bg-muted",
              )}
              aria-hidden
            />
          ))}
        </div>
        <h1 className="text-foreground font-extrabold tracking-tight text-xl">
          Şirketinizi ekleyin
        </h1>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-3">
            <label className="text-sm font-medium text-foreground">
              Salon logosu
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={onFileChange}
              aria-label="Logo yükle"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-muted-foreground/30 bg-muted/30 hover:bg-muted/50 transition-colors p-6 w-full max-w-[160px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <Avatar className="size-20 rounded-xl overflow-hidden">
                {logoPreview ? (
                  <AvatarImage src={logoPreview} alt="Salon logosu" />
                ) : (
                  <AvatarFallback className="rounded-xl bg-muted text-muted-foreground">
                    <Camera className="size-8" />
                  </AvatarFallback>
                )}
              </Avatar>
              <span className="text-xs text-muted-foreground">
                {logoPreview ? "Değiştir" : "Logo ekle"}
              </span>
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="salon-name" className="text-sm font-medium text-foreground">
              Salon ismi
            </label>
            <Input
              id="salon-name"
              type="text"
              placeholder="Örn. Elit Kuaför"
              value={salonName}
              onChange={(e) => setSalonName(e.target.value)}
              className="w-full"
              autoComplete="organization"
            />
          </div>
        </div>

        <Button
          className="w-full"
          onClick={handleFinish}
          disabled={!salonName.trim()}
        >
          Tamamla
        </Button>
      </main>
    </div>
  );
}
