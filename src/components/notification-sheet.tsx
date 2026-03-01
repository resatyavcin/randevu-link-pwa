"use client";

import { BottomSheet } from "@/components/bottom-sheet";

type NotificationSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function NotificationSheet({
  open,
  onOpenChange,
}: NotificationSheetProps) {
  return (
    <BottomSheet
      open={open}
      onOpenChange={onOpenChange}
      title="Bildirimler"
      scaleBackground
      showHandle
      showCloseButton={false}
      height="90dvh"
    >
      <p className="text-sm text-muted-foreground">
        Henüz bildirim yok. Randevu hatırlatmaları ve güncellemeler burada
        görünecek.
      </p>
    </BottomSheet>
  );
}
