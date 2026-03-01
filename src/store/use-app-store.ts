import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FeedbackItem } from "@/components/ui/feedback-carousel";
import { slugify } from "@/lib/utils";

const SALON_STORAGE_KEY = "randevu-link-salon";

export type { FeedbackItem };

export type Theme = "light" | "dark" | "system";

const isDev = typeof process !== "undefined" && process.env.NODE_ENV === "development";

/** Development'ta giriş/onboarding atlanır, salon + örnek veriler dolu gelir */
const DEV_INITIAL = {
  authToken: "demo-token" as string | null,
  onboardingCompleted: true,
  salonName: "Elit Kuaför",
  salonLogoUrl: null as string | null,
  salonSlug: "elit-kufor",
  bookingLinkEnabled: true,
  services: [
    { id: "dev-s1", name: "Saç kesimi", durationMinutes: 30, price: 150 },
    { id: "dev-s2", name: "Sakal tıraşı", durationMinutes: 15, price: 75 },
    { id: "dev-s3", name: "Manikür", durationMinutes: 45, price: 120 },
  ] as { id: string; name: string; durationMinutes?: number; price?: number }[],
  employees: [
    { id: "dev-e1", name: "Ayşe Yılmaz", role: "Kuaför" },
    { id: "dev-e2", name: "Mehmet Kaya", role: "Stilist" },
  ] as { id: string; name: string; role?: string }[],
};

const INITIAL_FEEDBACK_ITEMS: FeedbackItem[] = [
  {
    name: "Güzellik Evi",
    avatar: "/avatars/uifaces-human-avatar.jpg",
    feedback:
      "Çok güzeldi, bayıldım. Gerçekten iyi bir uygulama, herkese tavsiye ederim.",
    link: "/r/guzellik-evi",
  },
  {
    name: "Elit Kuaför",
    avatar: "/avatars/uifaces-human-avatar%20(1).jpg",
    feedback: "Randevu almak hiç bu kadar kolay olmamıştı. Süper deneyim.",
    link: "/r/elit-kufor",
  },
  {
    name: "Şık Saç Salonu",
    avatar: "/avatars/uifaces-human-avatar%20(2).jpg",
    feedback: "Arayüz çok sade ve hızlı. Mobilde de kusursuz çalışıyor.",
    link: "/r/sik-sac-salonu",
  },
  {
    name: "Princess Güzellik",
    avatar: "/avatars/uifaces-human-avatar%20(3).jpg",
    feedback:
      "Bayıldım! Hem hızlı hem güvenilir. Kesinlikle kullanmaya devam edeceğim.",
    link: "/r/princess-guzellik",
  },
  {
    name: "Star Kuaför",
    avatar: "/avatars/uifaces-human-avatar%20(4).jpg",
    feedback: "İyi uygulama, çok memnun kaldım. Ekip tebrikleri hak ediyor.",
    link: "/r/star-kufor",
  },
  {
    name: "Moda Kuaför",
    avatar: "/avatars/uifaces-human-avatar%20(5).jpg",
    feedback: "Çok güzel bir deneyim. Randevu linki paylaşmak çok pratik.",
    link: "/r/moda-kufor",
  },
];

interface AppState {
  // Tema
  theme: Theme;
  setTheme: (theme: Theme) => void;

  // Auth (token client-side örnek; gerçekte httpOnly cookie tercih edin)
  authToken: string | null;
  setAuthToken: (token: string | null) => void;

  // Modal açık/kapalı
  openModalId: string | null;
  openModal: (id: string) => void;
  closeModal: () => void;

  // Filtre / UI state örneği
  sidebarOpen: boolean;
  toggleSidebar: () => void;

  // Geri bildirimler (carousel)
  feedbackItems: FeedbackItem[];
  setFeedbackItems: (items: FeedbackItem[]) => void;

  // Bildirimler sheet (header + bottom nav)
  notificationSheetOpen: boolean;
  setNotificationSheetOpen: (open: boolean) => void;

  // Okunmamış bildirim sayısı (badge; 99+ gösterimi header’da)
  notificationCount: number;
  setNotificationCount: (count: number) => void;

  onboardingCompleted: boolean;
  setOnboardingCompleted: (completed: boolean) => void;
  salonName: string;
  salonLogoUrl: string | null;
  /** İsimden üretilen İngilizce URL parçası (örn. elit-kufor) */
  salonSlug: string;
  setSalon: (name: string, logoUrl: string | null) => void;

  /** Randevu linki açık mı; kapalıyken müşteriler linki kullanamaz */
  bookingLinkEnabled: boolean;
  setBookingLinkEnabled: (enabled: boolean) => void;

  /** Şirket servisleri (örn. Saç kesimi, Manikür) */
  services: { id: string; name: string; durationMinutes?: number; price?: number }[];
  addService: (service: { name: string; durationMinutes?: number; price?: number }) => void;
  removeService: (id: string) => void;

  /** Çalışanlar */
  employees: { id: string; name: string; role?: string }[];
  addEmployee: (employee: { name: string; role?: string }) => void;
  removeEmployee: (id: string) => void;
}

const getInitialSalonState = () => ({
  salonName: isDev ? DEV_INITIAL.salonName : "",
  salonLogoUrl: isDev ? DEV_INITIAL.salonLogoUrl : null as string | null,
  salonSlug: isDev ? DEV_INITIAL.salonSlug : "",
  bookingLinkEnabled: isDev ? DEV_INITIAL.bookingLinkEnabled : true,
  services: isDev ? DEV_INITIAL.services : [] as { id: string; name: string; durationMinutes?: number; price?: number }[],
  employees: isDev ? DEV_INITIAL.employees : [] as { id: string; name: string; role?: string }[],
});

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme) => set({ theme }),

      authToken: isDev ? DEV_INITIAL.authToken : null,
      setAuthToken: (token) => set({ authToken: token }),

      openModalId: null,
      openModal: (id) => set({ openModalId: id }),
      closeModal: () => set({ openModalId: null }),

      sidebarOpen: true,
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

      feedbackItems: INITIAL_FEEDBACK_ITEMS,
      setFeedbackItems: (items) => set({ feedbackItems: items }),

      notificationSheetOpen: false,
      setNotificationSheetOpen: (open) => set({ notificationSheetOpen: open }),

      notificationCount: 0,
      setNotificationCount: (count) => set({ notificationCount: count }),

      onboardingCompleted: isDev ? DEV_INITIAL.onboardingCompleted : false,
      setOnboardingCompleted: (completed) => set({ onboardingCompleted: completed }),

      ...getInitialSalonState(),
      setBookingLinkEnabled: (enabled) => set({ bookingLinkEnabled: enabled }),
      setSalon: (name, logoUrl) =>
        set({
          salonName: name.trim(),
          salonLogoUrl: logoUrl,
          salonSlug: slugify(name.trim()) || "salon",
        }),

      addService: (s) =>
        set((state) => ({
          services: [
            ...state.services,
            { id: crypto.randomUUID(), name: s.name.trim(), durationMinutes: s.durationMinutes, price: s.price },
          ],
        })),
      removeService: (id) => set((state) => ({ services: state.services.filter((x) => x.id !== id) })),

      addEmployee: (e) =>
        set((state) => ({
          employees: [
            ...state.employees,
            { id: crypto.randomUUID(), name: e.name.trim(), role: e.role?.trim() || undefined },
          ],
        })),
      removeEmployee: (id) => set((state) => ({ employees: state.employees.filter((x) => x.id !== id) })),
    }),
    {
      name: SALON_STORAGE_KEY,
      partialize: (state) => ({
        salonName: state.salonName,
        salonLogoUrl: state.salonLogoUrl,
        salonSlug: state.salonSlug,
        bookingLinkEnabled: state.bookingLinkEnabled,
        services: state.services,
        employees: state.employees,
      }),
    },
  ),
);
