"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type NotificationSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function NotificationSheet({ open, onOpenChange }: NotificationSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        showCloseButton={true}
        className={cn(
          "inset-x-0 top-0 bottom-0 h-full max-h-none w-full rounded-none border-0 border-t pt-[max(env(safe-area-inset-top),0.75rem)] pb-[max(env(safe-area-inset-bottom),1rem)]",
        )}
      >
        <SheetHeader className="flex flex-row items-center justify-between border-b border-border pb-3">
          <SheetTitle className="text-lg font-semibold">Bildirimler</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-auto px-1 py-4">
          <p className="text-sm text-muted-foreground">
            Henüz bildirim yok. Randevu hatırlatmaları ve güncellemeler burada
            görünecek.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
