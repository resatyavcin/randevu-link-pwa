"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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

function formatPhoneDisplay(digits: string): string {
  const d = digits.replace(/\D/g, "").slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)} ${d.slice(3)}`;
  if (d.length <= 8) return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
  return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 8)} ${d.slice(8)}`;
}

function validatePhone(digits: string): boolean {
  return digits.length === 10 && digits[0] === "5";
}

const PHONE_ERROR_MSG = "Geçerli bir cep telefonu numarası girin (5XX XXX XX XX)";
const CODE_ERROR_MSG = "Lütfen 6 haneli doğrulama kodunu girin.";

type Step = "phone" | "code";

const PANEL_PATH = "/panel";
const ONBOARDING_PATH = "/onboarding";

export default function LoginPage() {
  const router = useRouter();
  const authToken = useAppStore((s) => s.authToken);
  const setAuthToken = useAppStore((s) => s.setAuthToken);
  const onboardingCompleted = useAppStore((s) => s.onboardingCompleted);
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [codeError, setCodeError] = useState<string | null>(null);
  const feedbackItems = useAppStore((s) => s.feedbackItems);

  useEffect(() => {
    if (authToken) {
      router.replace(onboardingCompleted ? PANEL_PATH : ONBOARDING_PATH);
    }
  }, [authToken, onboardingCompleted, router]);

  const digits = phone.replace(/\D/g, "").slice(0, 10);
  const isPhoneInvalid = phoneError !== null;
  const isCodeInvalid = codeError !== null;

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone(digits)) {
      setPhoneError(PHONE_ERROR_MSG);
      return;
    }
    setPhoneError(null);
    // TODO: API ile giriş SMS kodu gönder
    console.log("Login phone, send code:", `+90${digits}`);
    setStep("code");
    setCode("");
    setCodeError(null);
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = code.replace(/\D/g, "").slice(0, 6);
    if (cleanCode.length !== 6) {
      setCodeError(CODE_ERROR_MSG);
      return;
    }
    setCodeError(null);
    // TODO: API ile kodu doğrula; başarılıysa token dönüp setAuthToken(token) yapın
    console.log("Verify login code:", cleanCode);
    setAuthToken("demo-token");
    router.replace(ONBOARDING_PATH);
  };

  const backToPhone = () => {
    setStep("phone");
    setCode("");
    setCodeError(null);
  };

  if (authToken !== null) {
    return null;
  }

  return (
    <div
      className="min-h-screen p-3 sm:px-5 sm:pt-2 sm:pb-5 bg-background flex flex-col items-center gap-4 overscroll-none"
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
        className="relative w-full flex-1 min-h-0 rounded-3xl py-6 px-5 sm:py-8 sm:px-6 flex flex-col items-center gap-6 overflow-auto"
      >
        <section
          className="w-full flex justify-center shrink-0 opacity-90 pt-1.5"
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
            {step === "phone" ? "Giriş yap" : "Doğrulama kodu"}
          </h2>
          <p className="text-muted-foreground text-sm">
            {step === "phone"
              ? "Hesabınıza giriş yapmak için telefon numaranızı girin."
              : `${formatPhoneDisplay(phone)} numarasına gönderilen 6 haneli kodu girin.`}
          </p>
        </div>

        {step === "phone" ? (
          <form onSubmit={handlePhoneSubmit} noValidate className="w-full flex flex-col gap-4">
            <div className="space-y-1.5">
              <div
                className={`flex h-11 items-center overflow-hidden rounded-lg border bg-background/50 shadow-sm transition-[color,box-shadow] focus-within:ring-[3px] focus-within:outline-none dark:bg-input/20 ${
                  isPhoneInvalid
                    ? "border-destructive focus-within:border-destructive focus-within:ring-destructive/50"
                    : "border-input focus-within:border-ring focus-within:ring-ring/50"
                }`}
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
                  placeholder="5XX XXX XX XX"
                  value={formatPhoneDisplay(phone)}
                  onChange={(e) => {
                    const next = e.target.value.replace(/\D/g, "").slice(0, 10);
                    setPhone(next);
                    if (phoneError && validatePhone(next)) setPhoneError(null);
                  }}
                  onBlur={() => {
                    if (digits.length > 0 && !validatePhone(digits))
                      setPhoneError(PHONE_ERROR_MSG);
                  }}
                  className="h-11 flex-1 min-w-0 border-0 rounded-none bg-transparent px-3 py-2 text-base shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground"
                  aria-label="Telefon numarası"
                  aria-invalid={isPhoneInvalid}
                  aria-describedby={isPhoneInvalid ? "phone-error" : undefined}
                />
              </div>
              {isPhoneInvalid && (
                <p id="phone-error" className="text-sm text-destructive" role="alert">
                  {phoneError}
                </p>
              )}
            </div>
            <Button type="submit" size="lg" className="w-full">
              Kod gönder
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Hesabınız yoksa{" "}
              <Link
                href="/"
                className="text-foreground font-medium underline underline-offset-2 hover:text-foreground/90"
              >
                kayıt olun
              </Link>
              .
            </p>
          </form>
        ) : (
          <form onSubmit={handleCodeSubmit} noValidate className="w-full flex flex-col gap-4">
            <div className="space-y-1.5">
              <div
                className={`flex h-12 items-center justify-center gap-1.5 rounded-lg border bg-background/50 px-2 shadow-sm transition-[color,box-shadow] focus-within:ring-[3px] focus-within:outline-none dark:bg-input/20 ${
                  isCodeInvalid
                    ? "border-destructive focus-within:border-destructive focus-within:ring-destructive/50"
                    : "border-input focus-within:border-ring focus-within:ring-ring/50"
                }`}
                role="group"
              >
                <Input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="000000"
                  maxLength={6}
                  value={code.replace(/\D/g, "").slice(0, 6)}
                  onChange={(e) => {
                    const next = e.target.value.replace(/\D/g, "").slice(0, 6);
                    setCode(next);
                    if (codeError && next.length === 6) setCodeError(null);
                  }}
                  onBlur={() => {
                    const c = code.replace(/\D/g, "").slice(0, 6);
                    if (c.length > 0 && c.length !== 6) setCodeError(CODE_ERROR_MSG);
                  }}
                  className="h-11 w-full text-center text-xl font-semibold tabular-nums tracking-[0.35em] border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:tracking-normal placeholder:font-normal placeholder:text-muted-foreground"
                  aria-label="6 haneli doğrulama kodu"
                  aria-invalid={isCodeInvalid}
                  aria-describedby={isCodeInvalid ? "code-error" : undefined}
                />
              </div>
              {isCodeInvalid && (
                <p
                  id="code-error"
                  className="text-sm text-destructive text-center"
                  role="alert"
                >
                  {codeError}
                </p>
              )}
            </div>
            <Button type="submit" size="lg" className="w-full">
              Giriş yap
            </Button>
            <button
              type="button"
              onClick={backToPhone}
              className="text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground"
            >
              Numara değiştir
            </button>
          </form>
        )}
      </GlassCard>

      <footer className="shrink-0 py-4 text-center space-y-1">
        <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">
          Randevu Link · v0.1
        </p>
        <p className="text-[10px] text-muted-foreground dark:text-muted-foreground/50">
          © {new Date().getFullYear()} Tüm hakları saklıdır.
        </p>
      </footer>
    </div>
  );
}
