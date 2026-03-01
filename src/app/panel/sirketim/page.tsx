"use client";

import { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { BottomNav } from "@/components/bottom-nav";
import { Button } from "@/components/ui/button";

export default function SirketimPage() {
  const [copied, setCopied] = useState(false);
  const [bookingLink, setBookingLink] = useState("");

  useEffect(() => {
    setBookingLink(
      typeof window !== "undefined"
        ? `${window.location.origin}/r/sirketim`
        : "",
    );
  }, []);

  const handleCopy = async () => {
    if (!bookingLink) return;
    try {
      await navigator.clipboard.writeText(bookingLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = bookingLink;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 top-0 left-0 right-0 bottom-0 overflow-y-auto overflow-x-hidden overscroll-y-auto p-3 sm:px-5 sm:pt-2 pb-24 bg-background flex flex-col items-center gap-4">
      <AppHeader />
      <main className="w-full max-w-lg flex flex-col gap-4 flex-1">
        <h1 className="text-foreground font-extrabold tracking-tight text-xl">
          Şirketim
        </h1>
        <p className="text-muted-foreground text-sm">
          Şirket ve işletme bilgileriniz ileride burada yer alacak.
        </p>

        <div className="flex flex-col gap-3">
          <p className="font-mono text-sm text-foreground break-all">
            {bookingLink || "—"}
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopy}
            disabled={!bookingLink}
            className="w-fit gap-2"
          >
            {copied ? (
              <>
                <Check className="size-4" />
                Kopyalandı!
              </>
            ) : (
              <>
                <Copy className="size-4" />
                Kopyala
              </>
            )}
          </Button>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
