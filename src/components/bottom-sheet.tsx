"use client";

import { useEffect } from "react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const SCALE_OFFSET = 14;
const SCALE_TRANSITION = "transform 0.5s cubic-bezier(0.32, 0.72, 0, 1)";
const SCALE_BG_DARK = "rgb(45, 45, 48)";

export type BottomSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Başlık; gösterilmezse handle bar yine gösterilir (showHandle true ise) */
  title?: React.ReactNode;
  children: React.ReactNode;
  /** Sağ üstte X butonu */
  showCloseButton?: boolean;
  /** Arkadaki içeriği küçültme efekti (bildirimler için) */
  scaleBackground?: boolean;
  /** Üstte sürüklenebilir çubuk */
  showHandle?: boolean;
  /** Yükseklik (örn. 90dvh, 85dvh) */
  height?: string;
  /** İçerik için ek className */
  contentClassName?: string;
};

export function BottomSheet({
  open,
  onOpenChange,
  title,
  children,
  showCloseButton = false,
  scaleBackground = false,
  showHandle = true,
  height = "90dvh",
  contentClassName,
}: BottomSheetProps) {
  useEffect(() => {
    if (!scaleBackground) return;
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
  }, [open, scaleBackground]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        showCloseButton={showCloseButton}
        className={cn(
          "z-60 flex flex-col gap-0 rounded-t-[10px] p-0 overflow-hidden",
          "pt-[max(env(safe-area-inset-top),0.75rem)] pb-[max(env(safe-area-inset-bottom),1rem)]",
        )}
        style={{ height: height, maxHeight: height }}
      >
        {showHandle && (
          <div className="mx-auto mt-2 h-1.5 w-12 shrink-0 rounded-full bg-muted-foreground/20" />
        )}
        {title != null && (
          <div className="flex shrink-0 flex-col gap-1.5 border-b border-border px-4 pb-3 pt-2">
            <SheetTitle className="text-lg font-semibold text-foreground">
              {title}
            </SheetTitle>
          </div>
        )}
        <div
          className={cn(
            "min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-4 py-4 touch-pan-y",
            contentClassName,
          )}
        >
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
}
