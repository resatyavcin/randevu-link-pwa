"use client";

import Link from "next/link";
import { Home } from "lucide-react";
import { cn } from "@/lib/utils";

/** İsimden baş harfleri: "Reşat Yavçin" → "RY". İleride auth'dan gelecek. */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    const first = parts[0];
    const last = parts[parts.length - 1];
    return (first[0] + last[0]).toUpperCase();
  }
  if (parts[0].length >= 2) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return parts[0].slice(0, 1).toUpperCase();
}

export type BottomNavAvatarProps = {
  /** İleride auth'dan gelecek; yoksa initials kullanılır */
  imageUrl?: string | null;
  /** İleride auth'dan gelecek */
  displayName?: string | null;
};

function BottomNavAvatar({ imageUrl, displayName }: BottomNavAvatarProps) {
  const name = displayName ?? "Reşat Yavçin";
  const initials = getInitials(name);

  return (
    <Link
      href="/panel/profil"
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
        "bg-foreground text-background border border-foreground/30",
        "outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
      aria-label="Profilim"
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="size-full rounded-full object-cover"
        />
      ) : (
        <span>{initials}</span>
      )}
    </Link>
  );
}

export function BottomNav({
  avatar,
  className,
}: {
  avatar?: BottomNavAvatarProps;
  className?: string;
}) {
  return (
    <nav
      role="navigation"
      aria-label="Alt menü"
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between",
        "px-4 py-3 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80",
        "border-t border-border pb-[max(0.75rem,env(safe-area-inset-bottom))]",
        className,
      )}
    >
      <div className="flex-1 min-w-0" aria-hidden />
      <Link
        href="/panel"
        className="shrink-0 flex size-8 items-center justify-center rounded-lg outline-none text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label="Ana sayfa"
      >
        <Home className="size-5" strokeWidth={2} />
      </Link>
      <div className="flex flex-1 min-w-0 items-center justify-end">
        <BottomNavAvatar
          imageUrl={avatar?.imageUrl}
          displayName={avatar?.displayName}
        />
      </div>
    </nav>
  );
}
