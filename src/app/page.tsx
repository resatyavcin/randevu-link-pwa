"use client";

import { useState } from "react";
import { AppHeader } from "@/components/app-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FeedbackCarousel } from "@/components/ui/feedback-carousel";
import { useAppStore } from "@/store";

const CAROUSEL_INITIAL = {
  initialDelay: 2500,
  slotStagger: 150,
  cycleInterval: 4000,
} as const;

/** 10 haneli numarayı "545 454 54 54" formatına çevirir */
function formatPhoneDisplay(digits: string): string {
  const d = digits.replace(/\D/g, "").slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)} ${d.slice(3)}`;
  if (d.length <= 8) return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
  return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 8)} ${d.slice(8)}`;
}

export default function RegisterPage() {
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const feedbackItems = useAppStore((s) => s.feedbackItems);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API ile telefon doğrulama / kayıt (+90 + 10 hane)
    const digits = phone.replace(/\D/g, "").slice(0, 10);
    console.log("Register phone:", digits ? `+90${digits}` : "");
  };

  return (
    <div
      className="min-h-screen px-5 pt-2 pb-5 bg-background flex flex-col items-center gap-4"
      style={{
        backgroundImage: [
          "radial-gradient(ellipse 80% 80% at 30% 55%, rgba(120, 80, 200, 0.42), transparent 45%)",
          "radial-gradient(ellipse 70% 70% at 80% 50%, rgba(80, 150, 255, 0.38), transparent 42%)",
          "radial-gradient(ellipse 90% 60% at 50% 100%, rgba(200, 150, 255, 0.32), transparent 48%)",
          "radial-gradient(ellipse 60% 80% at 70% 85%, rgba(100, 180, 220, 0.28), transparent 30%)",
        ].join(", "),
      }}
    >
      <AppHeader />

      <GlassCard
        variant="glass"
        className="w-full flex-1 min-h-0 rounded-[20px] py-6 px-5 sm:py-8 sm:px-6 flex flex-col items-center gap-6 overflow-auto"
      >
        <section
          className="w-full flex justify-center shrink-0 opacity-90"
          aria-label="Geri bildirimler"
        >
          <FeedbackCarousel
            items={feedbackItems}
            initialDelay={CAROUSEL_INITIAL.initialDelay}
            slotStagger={CAROUSEL_INITIAL.slotStagger}
            cycleInterval={CAROUSEL_INITIAL.cycleInterval}
            variant="dark"
            ariaLabel="Kullanıcı geri bildirimleri"
            maxSlots={1}
          />
        </section>
        <div className="w-full text-left space-y-1">
          <h2 className="text-foreground font-extrabold tracking-tight text-lg">
            Kayıt Ol
          </h2>
          <p className="text-muted-foreground text-sm">
            Kayıt sadece şirket ve işletme sahipleri içindir.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div
            className="flex h-11 items-center overflow-hidden rounded-lg border border-input bg-background/50 shadow-sm transition-[color,box-shadow] focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] focus-within:outline-none dark:bg-input/20"
            role="group"
          >
            <span
              className="flex shrink-0 items-center gap-2 border-r border-input bg-muted/30 px-3 py-2 text-sm text-foreground"
              aria-hidden
            >
              <img
                src="/turkey.png"
                alt=""
                className="size-5 object-contain"
                width={20}
                height={20}
              />
              <span className="font-semibold tabular-nums">+90</span>
            </span>
            <Input
              type="tel"
              inputMode="numeric"
              placeholder="545 454 54 54"
              value={formatPhoneDisplay(phone)}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                setPhone(digits);
              }}
              className="h-11 flex-1 min-w-0 border-0 rounded-none bg-transparent px-3 py-2 text-base shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground"
              required
              aria-label="Telefon numarası"
            />
          </div>
          <label className="flex cursor-pointer items-start gap-3 text-left">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 size-4 shrink-0 rounded border-input accent-primary"
              required
              aria-describedby="consent-label"
            />
            <span
              id="consent-label"
              className="text-muted-foreground text-sm leading-relaxed"
            >
              <a
                href="/gizlilik"
                className="text-foreground/90 underline underline-offset-2 hover:text-foreground"
              >
                Gizlilik politikası
              </a>
              {" ve "}
              <a
                href="/kvkk"
                className="text-foreground/90 underline underline-offset-2 hover:text-foreground"
              >
                KVKK aydınlatma metni
              </a>
              {"ni okudum, kabul ediyorum."}
            </span>
          </label>
          <Button
            type="submit"
            size="lg"
            className="w-full mt-1"
            disabled={!consent}
          >
            Kayıt ol
          </Button>
        </form>
      </GlassCard>
    </div>
  );
}
