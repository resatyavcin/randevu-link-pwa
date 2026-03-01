"use client";

import { useEffect } from "react";

/**
 * PWA / standalone modda ekranı dikey (portrait) konumda kilitler.
 * Manifest'teki orientation: "portrait" ile birlikte kullanılır.
 */
export function OrientationLock() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const lock = async () => {
      try {
        if (
          "orientation" in screen &&
          typeof (screen as Screen & { orientation?: { lock?: (mode: string) => Promise<void> } }).orientation?.lock === "function"
        ) {
          const orientation = (screen as Screen & { orientation?: { lock: (mode: string) => Promise<void> } }).orientation;
          await orientation.lock("portrait");
        }
      } catch {
        // API desteklenmiyorsa veya izin yoksa sessizce geç (manifest portrait yine uygulanır)
      }
    };
    lock();
  }, []);

  return null;
}
