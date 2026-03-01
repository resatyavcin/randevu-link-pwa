import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Salon/isim → İngilizce URL slug (küçük harf, tire, Türkçe karakterler dönüştürülür) */
export function slugify(text: string): string {
  const trMap: Record<string, string> = {
    ç: "c", Ç: "c", ğ: "g", Ğ: "g", ı: "i", İ: "i", I: "i", ö: "o", Ö: "o",
    ş: "s", Ş: "s", ü: "u", Ü: "u",
  }
  let s = text.trim()
  for (const [tr, en] of Object.entries(trMap)) s = s.replaceAll(tr, en)
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-") || "salon"
}
