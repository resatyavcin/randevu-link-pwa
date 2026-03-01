"use client";

import { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "./ui/sheet";
import { cn } from "../lib/utils";

const SCALE_OFFSET = 14;
const SCALE_TRANSITION = "transform 0.5s cubic-bezier(0.32, 0.72, 0, 1)";
/** Dark modda scale çerçevesinin belli olması için body – içerikten daha açık gri */
const SCALE_BG_DARK = "rgb(45, 45, 48)";

type NotificationSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function NotificationSheet({
  open,
  onOpenChange,
}: NotificationSheetProps) {
  useEffect(() => {
    const wrapper = document.querySelector("[data-scale-background-wrapper]");
    if (!wrapper || !(wrapper instanceof HTMLElement)) return;

    if (open) {
      const scale = (window.innerWidth - SCALE_OFFSET) / window.innerWidth;
      const translateY = `calc(env(safe-area-inset-top, 0px) + ${SCALE_OFFSET}px)`;
      const prevBg = document.body.style.background;
      const isDark = document.documentElement.classList.contains("dark");

      wrapper.style.transformOrigin = "top center";
      wrapper.style.transition = SCALE_TRANSITION;
      wrapper.style.borderRadius = "8px";
      wrapper.style.overflow = "hidden";
      wrapper.style.transform = `scale(${scale}) translate3d(0, ${translateY}, 0)`;
      if (isDark) {
        document.body.style.background = SCALE_BG_DARK;
        wrapper.style.boxShadow = "0 0 0 1px rgba(255,255,255,0.06)";
      } else {
        document.body.style.background = "black";
      }

      return () => {
        wrapper.style.transform = "";
        wrapper.style.transformOrigin = "";
        wrapper.style.transition = "";
        wrapper.style.borderRadius = "";
        wrapper.style.overflow = "";
        wrapper.style.boxShadow = "";
        document.body.style.background = prevBg;
      };
    } else {
      wrapper.style.transform = "";
      wrapper.style.transformOrigin = "";
      wrapper.style.transition = "";
      wrapper.style.borderRadius = "";
      wrapper.style.overflow = "";
      wrapper.style.boxShadow = "";
    }
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className={cn(
          "z-60 h-[90dvh] max-h-[90dvh] rounded-t-[10px] p-0",
          "pt-[max(env(safe-area-inset-top),0.75rem)] pb-[max(env(safe-area-inset-bottom),1rem)]",
        )}
      >
        <div className="mx-auto mt-2 h-1.5 w-12 shrink-0 rounded-full bg-muted-foreground/20" />
        <div className="flex shrink-0 flex-col gap-1.5 border-b border-border px-4 pb-3 pt-2">
          <SheetTitle className="text-lg font-semibold text-foreground">
            Bildirimler
          </SheetTitle>
        </div>
        <div className="flex-1 overflow-auto px-4 py-4">
          <p className="text-sm text-muted-foreground">
            Henüz bildirim yok. Randevu hatırlatmaları ve güncellemeler burada
            görünecek.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
