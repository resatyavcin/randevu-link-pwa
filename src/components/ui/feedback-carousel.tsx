"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// ── Types ───────────────────────────────────────────────────────────

export interface FeedbackItem {
  /** Salon / işletme adı */
  name: string;
  /** Avatar görsel URL'i */
  avatar: string;
  /** Geri bildirim / yorum metni */
  feedback: string;
  /** Salon linki (opsiyonel, varsa ad tıklanabilir olur) */
  link?: string;
}

export type CarouselVariant = "muted" | "dark";

export interface FeedbackCarouselProps {
  /** Geri bildirim listesi (name, avatar, feedback) */
  items: FeedbackItem[];
  /** Slot genişliği (px). Varsayılan: 280 */
  slotWidth?: number;
  /** İlk döngü öncesi gecikme (ms). Varsayılan: 2500 */
  initialDelay?: number;
  /** Sütunlar arası gecikme (ms). Varsayılan: 150 */
  slotStagger?: number;
  /** Kart değişim aralığı (ms). Varsayılan: 3000 */
  cycleInterval?: number;
  className?: string;
  variant?: CarouselVariant;
  /** Bölge etiketi (erişilebilirlik) */
  ariaLabel?: string;
  /** Maksimum sütun sayısı (1 = tek sütun). Verilmezse responsive (1/2/3) */
  maxSlots?: number;
}

// ── Defaults ───────────────────────────────────────────────────────

const DEFAULT_SLOT_WIDTH = 280;
const DEFAULT_INITIAL_DELAY = 2500;
const DEFAULT_SLOT_STAGGER = 150;
const DEFAULT_CYCLE_INTERVAL = 3000;

// ── Hooks ───────────────────────────────────────────────────────────

function useSlotCount(): number {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const mqMd = window.matchMedia("(min-width: 768px)");
    const mqLg = window.matchMedia("(min-width: 1024px)");

    const update = () => {
      if (mqLg.matches) setCount(3);
      else if (mqMd.matches) setCount(2);
      else setCount(1);
    };

    update();
    mqMd.addEventListener("change", update);
    mqLg.addEventListener("change", update);

    return () => {
      mqMd.removeEventListener("change", update);
      mqLg.removeEventListener("change", update);
    };
  }, []);

  return count;
}

function useImagesPreloaded(srcs: readonly string[]): boolean {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    Promise.all(
      srcs.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new window.Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = src;
          }),
      ),
    ).then(() => {
      if (!cancelled) setLoaded(true);
    });

    return () => {
      cancelled = true;
    };
  }, [srcs]);

  return loaded;
}

function useFeedbackCycle(
  items: FeedbackItem[],
  initialDelay: number,
  cycleInterval: number,
  enabled: boolean,
) {
  const [step, setStep] = useState(0);
  const current = items[step % items.length];

  useEffect(() => {
    if (!enabled || items.length === 0) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let startedAt = 0;
    let remaining = step === 0 ? initialDelay : cycleInterval;

    const schedule = (delay: number) => {
      remaining = delay;
      startedAt = Date.now();
      timeoutId = setTimeout(() => setStep((s) => s + 1), delay);
    };

    const pause = () => {
      if (timeoutId != null) {
        clearTimeout(timeoutId);
        timeoutId = null;
        remaining = Math.max(0, remaining - (Date.now() - startedAt));
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) pause();
      else schedule(remaining);
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    if (!document.hidden) schedule(remaining);

    return () => {
      if (timeoutId != null) clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [enabled, step, initialDelay, cycleInterval, items.length]);

  return { current, hasCycled: step > 0 };
}

// ── FeedbackSlot ────────────────────────────────────────────────────

const variantStyles: Record<
  CarouselVariant,
  { name: string; feedback: string }
> = {
  muted: {
    name: "text-gray-500 dark:text-[#f5f5f5] font-extrabold tracking-tight text-sm",
    feedback:
      "text-gray-500 dark:text-[#f5f5f5] text-sm sm:text-base font-medium",
  },
  dark: {
    name: "text-[#5c5868] dark:text-[#f5f5f5] font-extrabold tracking-tight text-sm",
    feedback:
      "text-[#6d6878] dark:text-[#f5f5f5] text-sm sm:text-base font-medium",
  },
};

function FeedbackSlot({
  items,
  slotIndex,
  enabled,
  variant = "muted",
  slotWidth,
  initialDelay,
  slotStagger,
  cycleInterval,
}: {
  items: FeedbackItem[];
  slotIndex: number;
  enabled: boolean;
  variant?: CarouselVariant;
  slotWidth: number;
  initialDelay: number;
  slotStagger: number;
  cycleInterval: number;
}) {
  const reducedMotion = useReducedMotion();
  const { current: item, hasCycled } = useFeedbackCycle(
    items,
    initialDelay + slotIndex * slotStagger,
    cycleInterval,
    enabled,
  );

  const styles = variantStyles[variant];

  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={item.name}
      className="overflow-hidden flex flex-1 min-w-0 items-stretch justify-center min-h-[120px]"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={`${item.name}-${item.feedback.slice(0, 20)}`}
          initial={
            !hasCycled
              ? false
              : reducedMotion
                ? { opacity: 0 }
                : { y: 20, opacity: 0, filter: "blur(8px)" }
          }
          animate={
            reducedMotion
              ? { opacity: 1 }
              : { y: 0, opacity: 1, filter: "blur(0px)" }
          }
          exit={
            reducedMotion
              ? { opacity: 0 }
              : { y: -20, opacity: 0, filter: "blur(8px)" }
          }
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={cn(
            "flex w-full items-start gap-4 text-left will-change-[filter] backface-hidden",
          )}
        >
          <Avatar size="lg" className="size-12 shrink-0">
            <AvatarImage src={item.avatar} alt={item.name} />
            <AvatarFallback className="text-sm">
              {item.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <p className={cn("line-clamp-3", styles.feedback)}>
              &ldquo;{item.feedback}&rdquo;
            </p>
            {item.link ? (
              <a
                href={item.link}
                className={cn(
                  "line-clamp-1 underline-offset-2 hover:underline",
                  styles.name
                )}
              >
                {item.name}, {new Date().getFullYear()}
              </a>
            ) : (
              <span className={cn("line-clamp-1", styles.name)}>
                {item.name}, {new Date().getFullYear()}
              </span>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── FeedbackCarousel ─────────────────────────────────────────────────

export function FeedbackCarousel({
  items,
  slotWidth = DEFAULT_SLOT_WIDTH,
  initialDelay = DEFAULT_INITIAL_DELAY,
  slotStagger = DEFAULT_SLOT_STAGGER,
  cycleInterval = DEFAULT_CYCLE_INTERVAL,
  className,
  variant = "muted",
  ariaLabel = "Kullanıcı geri bildirimleri",
  maxSlots,
}: FeedbackCarouselProps) {
  const avatarSrcs = useMemo(() => items.map((i) => i.avatar), [items]);
  const allLoaded = useImagesPreloaded(avatarSrcs);
  const responsiveSlots = useSlotCount();
  const slotCount =
    maxSlots != null ? Math.min(responsiveSlots, maxSlots) : responsiveSlots;

  const slotItems = useMemo(
    () =>
      Array.from({ length: slotCount }, (_, slot) =>
        items.filter((_, i) => i % slotCount === slot),
      ),
    [slotCount, items],
  );

  if (items.length === 0) return null;

  return (
    <motion.div
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      initial={{ opacity: 0 }}
      animate={{ opacity: allLoaded ? 1 : 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn("flex w-full items-stretch gap-4", className)}
    >
      {slotItems.map((slotItemList, i) => (
        <FeedbackSlot
          key={i}
          items={slotItemList}
          slotIndex={i}
          enabled={allLoaded}
          variant={variant}
          slotWidth={slotWidth}
          initialDelay={initialDelay}
          slotStagger={slotStagger}
          cycleInterval={cycleInterval}
        />
      ))}
    </motion.div>
  );
}
