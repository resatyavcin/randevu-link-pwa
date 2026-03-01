"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type NotificationSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/** Dark modda scale arka planının belli olması için body rengi */
const SCALE_BG_DARK = "rgb(23, 23, 23)";

export function NotificationSheet({
  open,
  onOpenChange,
}: NotificationSheetProps) {
  const [Drawer, setDrawer] = useState<typeof import("vaul").Drawer | null>(
    null,
  );

  useEffect(() => {
    import("vaul").then((m) => setDrawer(() => m.Drawer));
  }, []);

  useEffect(() => {
    if (!open) return;
    const isDark = document.documentElement.classList.contains("dark");
    if (!isDark) return;
    let prev: string | undefined;
    const id = setTimeout(() => {
      prev = document.body.style.background;
      document.body.style.background = SCALE_BG_DARK;
    }, 50);
    return () => {
      clearTimeout(id);
      if (prev !== undefined) document.body.style.background = prev;
    };
  }, [open]);

  if (!Drawer) return null;

  return (
    <Drawer.Root
      open={open}
      onOpenChange={onOpenChange}
      direction="bottom"
      shouldScaleBackground
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[60] bg-black/50 dark:bg-black/70" />
        <Drawer.Content
          className={cn(
            "flex flex-col bg-background outline-none z-[60]",
            "fixed bottom-0 left-0 right-0 h-[90dvh] max-h-[90dvh]",
            "rounded-t-[10px] border-t border-border",
            "pt-[max(env(safe-area-inset-top),0.75rem)] pb-[max(env(safe-area-inset-bottom),1rem)]",
          )}
        >
          <div className="mx-auto mt-2 h-1.5 w-12 shrink-0 rounded-full bg-muted-foreground/20" />
          <div className="flex shrink-0 flex-col gap-1.5 border-b border-border px-4 pb-3 pt-2">
            <Drawer.Title className="text-lg font-semibold text-foreground">
              Bildirimler
            </Drawer.Title>
          </div>
          <div className="flex-1 overflow-auto px-4 py-4">
            <p className="text-sm text-muted-foreground">
              Henüz bildirim yok. Randevu hatırlatmaları ve güncellemeler burada
              görünecek.
            </p>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
