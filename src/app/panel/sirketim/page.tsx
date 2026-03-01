"use client";

import { useEffect, useState } from "react";
import { Copy, Check, Plus, Trash2, Scissors, User, Eye } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { BottomNav } from "@/components/bottom-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GlassCard } from "@/components/ui/glass-card";
import { BottomSheet } from "@/components/bottom-sheet";
import { useAppStore } from "@/store";
import { cn } from "@/lib/utils";

export default function SirketimPage() {
  const [copied, setCopied] = useState(false);
  const [bookingLink, setBookingLink] = useState("");
  const [showAddService, setShowAddService] = useState(false);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [newServiceName, setNewServiceName] = useState("");
  const [newServiceDuration, setNewServiceDuration] = useState("");
  const [newServicePrice, setNewServicePrice] = useState("");
  const [newEmployeeName, setNewEmployeeName] = useState("");
  const [newEmployeeRole, setNewEmployeeRole] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  const salonName = useAppStore((s) => s.salonName);
  const salonLogoUrl = useAppStore((s) => s.salonLogoUrl);
  const salonSlug = useAppStore((s) => s.salonSlug);
  const bookingLinkEnabled = useAppStore((s) => s.bookingLinkEnabled);
  const setBookingLinkEnabled = useAppStore((s) => s.setBookingLinkEnabled);
  const services = useAppStore((s) => s.services);
  const addService = useAppStore((s) => s.addService);
  const removeService = useAppStore((s) => s.removeService);
  const employees = useAppStore((s) => s.employees);
  const addEmployee = useAppStore((s) => s.addEmployee);
  const removeEmployee = useAppStore((s) => s.removeEmployee);

  useEffect(() => {
    if (typeof window === "undefined" || !salonSlug) return;
    setBookingLink(`${window.location.origin}/r/${salonSlug}`);
  }, [salonSlug]);

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

  const handleAddService = () => {
    const name = newServiceName.trim();
    if (!name) return;
    addService({
      name,
      durationMinutes: newServiceDuration
        ? parseInt(newServiceDuration, 10)
        : undefined,
      price: newServicePrice
        ? parseFloat(newServicePrice.replace(",", "."))
        : undefined,
    });
    setNewServiceName("");
    setNewServiceDuration("");
    setNewServicePrice("");
    setShowAddService(false);
  };

  const handleAddEmployee = () => {
    const name = newEmployeeName.trim();
    if (!name) return;
    addEmployee({ name, role: newEmployeeRole.trim() || undefined });
    setNewEmployeeName("");
    setNewEmployeeRole("");
    setShowAddEmployee(false);
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-background">
      <header className="shrink-0 px-3 sm:px-5 pt-2 pb-2 bg-background/70 dark:bg-background/60 backdrop-blur-md">
        <AppHeader />
      </header>
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-y-auto p-3 sm:px-5 sm:pt-2 pb-24 flex flex-col items-center gap-4">
        <main className="w-full max-w-lg flex flex-col gap-6 flex-1">
          <h1 className="text-foreground font-extrabold tracking-tight text-xl">
            Şirketim
          </h1>

          {/* Salon + Randevu linki tek kart — arkada spot gradient */}
          <div
            className="relative rounded-2xl p-px"
            style={{
              background:
                "radial-gradient(ellipse 90% 70% at 50% 40%, rgba(124, 58, 237, 0.18), transparent 65%)",
            }}
          >
            <GlassCard variant="glass" className="flex flex-col gap-4 p-4 rounded-2xl">
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4">
              <Avatar className="size-16 sm:size-20 rounded-xl shrink-0 ring-2 ring-border/50">
                {salonLogoUrl ? (
                  <AvatarImage
                    src={salonLogoUrl}
                    alt={salonName || "Salon logosu"}
                  />
                ) : (
                  <AvatarFallback className="rounded-xl bg-primary/10 text-primary text-lg font-semibold">
                    {salonName ? salonName.slice(0, 2).toUpperCase() : "—"}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex flex-col gap-0.5 text-center sm:text-left min-w-0 flex-1">
                <p className="font-semibold text-foreground text-lg truncate">
                  {salonName || "Salon adı yok"}
                </p>
              </div>
            </div>
            <div className="border-t border-border pt-4 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Randevu linki
                </p>
                <Switch
                  checked={bookingLinkEnabled}
                  onCheckedChange={setBookingLinkEnabled}
                  aria-label={
                    bookingLinkEnabled
                      ? "Link açık, müşteriler randevu alabilir"
                      : "Link kapalı"
                  }
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {bookingLinkEnabled
                  ? "Link açık — Müşteriler bu linkle randevu alabilir."
                  : "Link kapalı — Müşteriler randevu alamaz."}
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex flex-col gap-1 min-w-0 flex-1">
                    <p
                      className={cn(
                        "font-mono text-sm break-all",
                        bookingLinkEnabled
                          ? "text-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      {bookingLink || "—"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="gap-1.5"
                      onClick={() => setPreviewOpen(true)}
                      disabled={!salonSlug}
                      aria-label="Müşteri görünümünü önizle"
                    >
                      <Eye className="size-4" />
                      Önizle
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleCopy}
                      disabled={!bookingLink}
                      className="gap-2 bg-linear-to-r from-[#7c3aed] to-violet-600 text-white border-0 hover:opacity-90"
                    >
                      {copied ? (
                        <>
                          <Check className="size-4" />
                          Kopyalandı
                        </>
                      ) : (
                        <>
                          <Copy className="size-4" />
                          Kopyala
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
          </div>

          {/* Servisler */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Scissors className="size-4 text-primary" />
                Servisler
              </h2>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="gap-1.5 text-primary hover:text-primary"
                onClick={() => setShowAddService((v) => !v)}
              >
                <Plus className="size-4" />
                Servis ekle
              </Button>
            </div>
            {showAddService && (
              <div className="flex flex-col gap-2 p-3 rounded-xl bg-muted/30 border border-dashed border-border">
                <Input
                  placeholder="Servis adı (örn. Saç kesimi)"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  className="bg-background"
                />
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Süre (dk)"
                    value={newServiceDuration}
                    onChange={(e) => setNewServiceDuration(e.target.value)}
                    className="bg-background flex-1"
                  />
                  <Input
                    type="text"
                    placeholder="Fiyat (₺)"
                    value={newServicePrice}
                    onChange={(e) => setNewServicePrice(e.target.value)}
                    className="bg-background flex-1"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowAddService(false);
                      setNewServiceName("");
                      setNewServiceDuration("");
                      setNewServicePrice("");
                    }}
                  >
                    İptal
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleAddService}
                    disabled={!newServiceName.trim()}
                    className="gap-1.5 bg-linear-to-r from-[#7c3aed] to-violet-600 text-white border-0"
                  >
                    <Plus className="size-4" />
                    Ekle
                  </Button>
                </div>
              </div>
            )}
            <div
              className="relative rounded-2xl p-px"
              style={{
                background:
                  "radial-gradient(ellipse 90% 70% at 50% 40%, rgba(124, 58, 237, 0.18), transparent 65%)",
              }}
            >
              <ul className="flex flex-col gap-2">
                {services.length === 0 && !showAddService && (
                  <li>
                    <GlassCard variant="glassSubtle" className="py-2.5 px-3 rounded-xl text-sm text-muted-foreground">
                      Henüz servis yok. &quot;Servis ekle&quot; ile ekleyin.
                    </GlassCard>
                  </li>
                )}
                {services.map((s) => (
                  <li key={s.id} className="group">
                    <GlassCard variant="glass" className="flex flex-row items-center justify-between gap-2 py-2.5 px-3 rounded-xl">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-foreground truncate">
                          {s.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {[
                            s.durationMinutes != null && `${s.durationMinutes} dk`,
                            s.price != null && `${s.price} ₺`,
                          ]
                            .filter(Boolean)
                            .join(" · ") || "—"}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className="shrink-0 text-muted-foreground hover:text-destructive opacity-70 group-hover:opacity-100"
                        onClick={() => removeService(s.id)}
                        aria-label="Servisi sil"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </GlassCard>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Çalışanlar */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <User className="size-4 text-primary" />
                Çalışanlar
              </h2>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="gap-1.5 text-primary hover:text-primary"
                onClick={() => setShowAddEmployee((v) => !v)}
              >
                <Plus className="size-4" />
                Çalışan ekle
              </Button>
            </div>
            {showAddEmployee && (
              <div className="flex flex-col gap-2 p-3 rounded-xl bg-muted/30 border border-dashed border-border">
                <Input
                  placeholder="Ad soyad"
                  value={newEmployeeName}
                  onChange={(e) => setNewEmployeeName(e.target.value)}
                  className="bg-background"
                />
                <Input
                  placeholder="Ünvan (örn. Kuaför, Stilist)"
                  value={newEmployeeRole}
                  onChange={(e) => setNewEmployeeRole(e.target.value)}
                  className="bg-background"
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowAddEmployee(false);
                      setNewEmployeeName("");
                      setNewEmployeeRole("");
                    }}
                  >
                    İptal
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleAddEmployee}
                    disabled={!newEmployeeName.trim()}
                    className="gap-1.5 bg-linear-to-r from-[#7c3aed] to-violet-600 text-white border-0"
                  >
                    <Plus className="size-4" />
                    Ekle
                  </Button>
                </div>
              </div>
            )}
            <div
              className="relative rounded-2xl p-px"
              style={{
                background:
                  "radial-gradient(ellipse 90% 70% at 50% 40%, rgba(124, 58, 237, 0.18), transparent 65%)",
              }}
            >
              <ul className="flex flex-col gap-2">
                {employees.length === 0 && !showAddEmployee && (
                  <li>
                    <GlassCard variant="glassSubtle" className="py-2.5 px-3 rounded-xl text-sm text-muted-foreground">
                      Henüz çalışan yok. &quot;Çalışan ekle&quot; ile ekleyin.
                    </GlassCard>
                  </li>
                )}
                {employees.map((e) => (
                  <li key={e.id} className="group">
                    <GlassCard variant="glass" className="flex flex-row items-center justify-between gap-2 py-2.5 px-3 rounded-xl">
                      <div className="min-w-0 flex-1 flex items-center gap-2">
                        <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-xs font-medium text-primary">
                            {e.name.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-foreground truncate">
                            {e.name}
                          </p>
                          {e.role && (
                            <p className="text-xs text-muted-foreground truncate">
                              {e.role}
                            </p>
                          )}
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className="shrink-0 text-muted-foreground hover:text-destructive opacity-70 group-hover:opacity-100"
                        onClick={() => removeEmployee(e.id)}
                        aria-label="Çalışanı sil"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </GlassCard>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </main>
      </div>
      <BottomNav />

      {/* Önizleme — müşteri görünümü, URL'ye gitmeden */}
      <BottomSheet
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        title="Önizleme — Müşteri görünümü"
        showCloseButton
        scaleBackground
        height="95dvh"
        contentClassName="p-4"
      >
        <div className="max-w-md mx-auto flex flex-col gap-4 p-4 rounded-2xl bg-muted/40 border border-border shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4">
            <Avatar className="size-16 sm:size-20 rounded-xl shrink-0 ring-2 ring-border/50">
              {salonLogoUrl ? (
                <AvatarImage
                  src={salonLogoUrl}
                  alt={salonName || "Salon logosu"}
                />
              ) : (
                <AvatarFallback className="rounded-xl bg-primary/10 text-primary text-lg font-semibold">
                  {salonName ? salonName.slice(0, 2).toUpperCase() : "—"}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-col gap-0.5 text-center sm:text-left min-w-0 flex-1">
              <p className="font-semibold text-foreground text-lg truncate">
                {salonName || "Salon adı yok"}
              </p>
            </div>
          </div>
          {!bookingLinkEnabled ? (
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
                  Bu link ile randevu alabilirsiniz. Servis ve saat seçimi
                  aşağıda.
                </p>
              </div>
              {services.length > 0 && (
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
                        <span className="font-medium text-foreground text-sm">
                          {s.name}
                        </span>
                        <span className="text-xs text-muted-foreground shrink-0">
                          {[
                            s.durationMinutes != null &&
                              `${s.durationMinutes} dk`,
                            s.price != null && `${s.price} ₺`,
                          ]
                            .filter(Boolean)
                            .join(" · ") || "—"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {employees.length > 0 && (
                <div className="border-t border-border pt-4 flex flex-col gap-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                    <User className="size-3.5" />
                    Çalışanlar
                  </p>
                  <ul className="flex flex-col gap-2">
                    {employees.map((e) => (
                      <li
                        key={e.id}
                        className="flex items-center gap-2 py-2 px-3 rounded-xl bg-background/60 border border-border text-left"
                      >
                        <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-xs font-medium text-primary">
                            {e.name.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-foreground text-sm truncate">
                            {e.name}
                          </p>
                          {e.role && (
                            <p className="text-xs text-muted-foreground truncate">
                              {e.role}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {services.length === 0 && employees.length === 0 && (
                <p className="text-xs text-muted-foreground border-t border-border pt-4">
                  Servis ve saat seçimi yakında eklenecek.
                </p>
              )}
            </>
          )}
        </div>
      </BottomSheet>
    </div>
  );
}
