import { create } from "zustand";
import type { FeedbackItem } from "@/components/ui/feedback-carousel";

export type { FeedbackItem };

export type Theme = "light" | "dark" | "system";

const INITIAL_FEEDBACK_ITEMS: FeedbackItem[] = [
  {
    name: "Güzellik Evi",
    avatar: "/avatars/uifaces-human-avatar.jpg",
    feedback:
      "Çok güzeldi, bayıldım. Gerçekten iyi bir uygulama, herkese tavsiye ederim.",
  },
  {
    name: "Elit Kuaför",
    avatar: "/avatars/uifaces-human-avatar%20(1).jpg",
    feedback: "Randevu almak hiç bu kadar kolay olmamıştı. Süper deneyim.",
  },
  {
    name: "Şık Saç Salonu",
    avatar: "/avatars/uifaces-human-avatar%20(2).jpg",
    feedback: "Arayüz çok sade ve hızlı. Mobilde de kusursuz çalışıyor.",
  },
  {
    name: "Princess Güzellik",
    avatar: "/avatars/uifaces-human-avatar%20(3).jpg",
    feedback:
      "Bayıldım! Hem hızlı hem güvenilir. Kesinlikle kullanmaya devam edeceğim.",
  },
  {
    name: "Star Kuaför",
    avatar: "/avatars/uifaces-human-avatar%20(4).jpg",
    feedback: "İyi uygulama, çok memnun kaldım. Ekip tebrikleri hak ediyor.",
  },
  {
    name: "Moda Kuaför",
    avatar: "/avatars/uifaces-human-avatar%20(5).jpg",
    feedback: "Çok güzel bir deneyim. Randevu linki paylaşmak çok pratik.",
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
}

export const useAppStore = create<AppState>((set) => ({
  theme: "system",
  setTheme: (theme) => set({ theme }),

  authToken: null,
  setAuthToken: (token) => set({ authToken: token }),

  openModalId: null,
  openModal: (id) => set({ openModalId: id }),
  closeModal: () => set({ openModalId: null }),

  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

  feedbackItems: INITIAL_FEEDBACK_ITEMS,
  setFeedbackItems: (items) => set({ feedbackItems: items }),
}));
