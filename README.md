# Randevu Link PWA

Next.js 16, TanStack Query, Zustand, shadcn/ui ve PWA (Serwist) ile kurulmuş proje.

## Kurulum

```bash
npm install
```

## Geliştirme

```bash
npm run dev
```

## Production Build

```bash
npm run build
npm start
```

## PWA İkonları

Uygulamanın ana ekrana eklenebilmesi için `public/icons/` klasörüne şu dosyaları ekleyin:

- `icon-192.png` (192x192 px)
- `icon-512.png` (512x512 px)

Manifest (`src/app/manifest.ts`) bu yolları kullanır.

## Teknolojiler

- **Next.js 16** (App Router, Turbopack)
- **TanStack Query** – API verisi (cache, refetch, stale, pagination, mutation) – `src/lib/query-client.ts`, `QueryProvider`
- **Zustand** – uygulama durumu (tema, auth token, modallar, filtre UI) – `src/store/use-app-store.ts`
- **shadcn/ui** – bileşen kütüphanesi (`npx shadcn@latest add <bileşen>`)
- **Serwist** – PWA (service worker, offline sayfa)

## Proje Yapısı

- `src/app/` – Sayfalar ve layout
- `src/components/` – React bileşenleri (ui, providers)
- `src/store/` – Zustand store’ları (use-app-store: tema, auth, modallar, sidebar)
- `src/lib/` – query-client, utils
