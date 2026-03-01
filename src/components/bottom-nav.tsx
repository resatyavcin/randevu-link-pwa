"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Building2, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store";

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

function BottomNavAvatar({
  imageUrl,
  displayName,
  active,
}: BottomNavAvatarProps & { active?: boolean }) {
  const name = displayName ?? "Reşat Yavçin";
  const initials = getInitials(name);

  return (
    <Link
      href="/panel/profil"
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
        "bg-foreground text-background border border-foreground/30",
        "outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        active && "ring-2 ring-primary ring-offset-2 ring-offset-background",
      )}
      aria-label="Profilim"
      aria-current={active ? "page" : undefined}
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

const navLinkBase =
  "shrink-0 flex size-8 items-center justify-center rounded-lg outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function BottomNav({
  avatar,
  className,
}: {
  avatar?: BottomNavAvatarProps;
  className?: string;
}) {
  const pathname = usePathname();
  const setNotificationSheetOpen = useAppStore(
    (s) => s.setNotificationSheetOpen,
  );
  const notificationSheetOpen = useAppStore(
    (s) => s.notificationSheetOpen,
  );

  const isSirketim = pathname === "/panel/sirketim" || pathname.startsWith("/panel/sirketim/");
  const isPanel = pathname === "/panel";
  const isProfil = pathname === "/panel/profil" || pathname.startsWith("/panel/profil/");

  return (
    <nav
      role="navigation"
      aria-label="Alt menü"
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 flex items-center",
        "px-2 py-3 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80",
        "border-t border-border pb-[max(0.75rem,env(safe-area-inset-bottom))]",
        className,
      )}
    >
      <div className="flex flex-1 min-w-0 justify-center">
        <Link
          href="/panel/sirketim"
          className={cn(
            navLinkBase,
            isSirketim
              ? "text-primary bg-primary/10"
              : "text-foreground hover:bg-muted",
          )}
          aria-label="Şirketim"
          aria-current={isSirketim ? "page" : undefined}
        >
          <Building2 className="size-5" strokeWidth={2} />
        </Link>
      </div>
      <div className="flex flex-1 min-w-0 justify-center">
        <Link
          href="/panel"
          className={cn(
            navLinkBase,
            isPanel
              ? "text-primary bg-primary/10"
              : "text-foreground hover:bg-muted",
          )}
          aria-label="Ana sayfa"
          aria-current={isPanel ? "page" : undefined}
        >
          <Home className="size-5" strokeWidth={2} />
        </Link>
      </div>
      <div className="flex flex-1 min-w-0 justify-center">
        <button
          type="button"
          onClick={() => setNotificationSheetOpen(true)}
          className={cn(
            navLinkBase,
            notificationSheetOpen
              ? "text-primary bg-primary/10"
              : "text-foreground hover:bg-muted",
          )}
          aria-label="Bildirimler"
          aria-current={notificationSheetOpen ? "true" : undefined}
        >
          <Bell className="size-5" strokeWidth={2} />
        </button>
      </div>
      <div className="flex flex-1 min-w-0 justify-center">
        <BottomNavAvatar
          imageUrl={avatar?.imageUrl}
          displayName={avatar?.displayName}
          active={isProfil}
        />
      </div>
    </nav>
  );
}
