"use client";

import { useParams } from "next/navigation";
import { useAppStore } from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Scissors, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PublicBookingPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const salonName = useAppStore((s) => s.salonName);
  const salonLogoUrl = useAppStore((s) => s.salonLogoUrl);
  const salonSlug = useAppStore((s) => s.salonSlug);
  const bookingLinkEnabled = useAppStore((s) => s.bookingLinkEnabled);
  const services = useAppStore((s) => s.services);
  const employees = useAppStore((s) => s.employees);

  const isOwnSalon = slug && slug === salonSlug;
  const isClosed = isOwnSalon && !bookingLinkEnabled;
  const displayName = isOwnSalon ? salonName : (slug.replace(/-/g, " ") || "Salon");

  return (
    <div className="min-h-screen p-4 sm:p-6 flex flex-col items-center bg-background">
      <div className="w-full max-w-md flex flex-col gap-6">
        {/* Salon kartı — Şirketim ile aynı bilgiler */}
        <div className="flex flex-col gap-4 p-4 rounded-2xl bg-muted/40 border border-border shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4">
            <Avatar className="size-16 sm:size-20 rounded-xl shrink-0 ring-2 ring-border/50">
              {isOwnSalon && salonLogoUrl ? (
                <AvatarImage src={salonLogoUrl} alt={salonName || "Salon logosu"} />
              ) : (
                <AvatarFallback className="rounded-xl bg-primary/10 text-primary text-lg font-semibold">
                  {displayName ? displayName.slice(0, 2).toUpperCase() : "—"}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-col gap-0.5 text-center sm:text-left min-w-0 flex-1">
              <p className="font-semibold text-foreground text-lg truncate">
                {displayName || "Salon"}
              </p>
            </div>
          </div>

          {isClosed ? (
            <p className="border-t border-border pt-4 text-sm text-muted-foreground">
              Şu an hizmet dışı
            </p>
          ) : (
            <>
              <div className="border-t border-border pt-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  Randevu linki açık
                </p>
                <p className="text-xs text-muted-foreground">
                  Bu link ile randevu alabilirsiniz. Servis ve saat seçimi aşağıda.
                </p>
              </div>

              {isOwnSalon && services.length > 0 && (
                <div className="border-t border-border pt-4 flex flex-col gap-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                    <Scissors className="size-3.5" />
                    Servisler
                  </p>
                  <ul className="flex flex-col gap-2">
                    {services.map((s) => (
                      <li
                        key={s.id}
                        className="flex items-center justify-between gap-2 py-2 px-3 rounded-xl bg-background/60 border border-border text-left"
                      >
                        <span className="font-medium text-foreground text-sm">{s.name}</span>
                        <span className="text-xs text-muted-foreground shrink-0">
                          {[s.durationMinutes != null && `${s.durationMinutes} dk`, s.price != null && `${s.price} ₺`]
                            .filter(Boolean)
                            .join(" · ") || "—"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {isOwnSalon && employees.length > 0 && (
                <div className="border-t border-border pt-4 flex flex-col gap-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                    <User className="size-3.5" />
                    Çalışanlar
                  </p>
                  <ul className="flex flex-col gap-2">
                    {employees.map((e) => (
                      <li
                        key={e.id}
                        className={cn(
                          "flex items-center gap-2 py-2 px-3 rounded-xl bg-background/60 border border-border text-left",
                        )}
                      >
                        <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-xs font-medium text-primary">
                            {e.name.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-foreground text-sm truncate">{e.name}</p>
                          {e.role && (
                            <p className="text-xs text-muted-foreground truncate">{e.role}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {isOwnSalon && services.length === 0 && employees.length === 0 && (
                <p className="text-xs text-muted-foreground border-t border-border pt-4">
                  Servis ve saat seçimi yakında eklenecek.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
