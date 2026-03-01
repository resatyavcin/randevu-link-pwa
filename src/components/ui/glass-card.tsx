"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  getGlassStyles,
  type GlassCustomization,
} from "@/lib/glass-utils";

const glassVariantClasses = {
  glass: cn(
    "text-foreground border border-white/20 dark:border-white/10",
    "bg-white/15 dark:bg-white/5 backdrop-blur-md",
    "shadow-[0_4px_16px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04),0_0_0_0.5px_rgba(255,255,255,0.08)_inset]",
    "dark:shadow-[0_4px_16px_rgba(0,0,0,0.3),0_1px_4px_rgba(0,0,0,0.15),0_0_0_0.5px_rgba(255,255,255,0.12)_inset]"
  ),
  glassSubtle: cn(
    "text-foreground border border-white/15 dark:border-white/10",
    "bg-white/10 dark:bg-white/5 backdrop-blur-sm opacity-90",
    "shadow-[0_2px_8px_rgba(0,0,0,0.06),0_0_0_0.5px_rgba(255,255,255,0.06)_inset]",
    "dark:shadow-[0_2px_8px_rgba(0,0,0,0.25),0_0_0_0.5px_rgba(255,255,255,0.1)_inset]"
  ),
  frosted: cn(
    "text-foreground border border-white/30 dark:border-white/25",
    "bg-white/25 dark:bg-white/12 backdrop-blur-xl",
    "shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08),0_0_0_0.5px_rgba(255,255,255,0.15)_inset]",
    "dark:shadow-[0_8px_32px_rgba(0,0,0,0.5),0_2px_8px_rgba(0,0,0,0.3),0_0_0_0.5px_rgba(255,255,255,0.2)_inset]"
  ),
  fluted: cn(
    "text-foreground border border-white/20 dark:border-white/10",
    "bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.08)_0px,rgba(255,255,255,0.14)_4px,rgba(255,255,255,0.08)_8px,rgba(255,255,255,0.02)_10px,rgba(255,255,255,0.08)_12px)] dark:bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.11)_4px,rgba(255,255,255,0.05)_8px,rgba(255,255,255,0.01)_10px,rgba(255,255,255,0.05)_12px)]",
    "backdrop-blur-md",
    "shadow-[0_4px_16px_rgba(0,0,0,0.08),0_0_0_0.5px_rgba(255,255,255,0.08)_inset]",
    "dark:shadow-[0_4px_16px_rgba(0,0,0,0.3),0_0_0_0.5px_rgba(255,255,255,0.12)_inset]"
  ),
  crystal: cn(
    "text-foreground relative border border-white/30 dark:border-white/30",
    "bg-white/30 dark:bg-white/10 backdrop-blur-[2px]",
    "bg-gradient-to-br from-white/20 to-transparent bg-[length:200%_200%]",
    "shadow-[0_0_20px_rgba(0,0,0,0.2),0_0_30px_rgba(255,255,255,0.1)]",
    "dark:shadow-[0_0_20px_rgba(0,0,0,0.4),0_0_30px_rgba(255,255,255,0.15)]",
    "transition-all duration-300 ease-out",
    "hover:shadow-[0_0_25px_rgba(0,0,0,0.3),0_0_35px_rgba(255,255,255,0.15)]",
    "dark:hover:shadow-[0_0_25px_rgba(0,0,0,0.5),0_0_35px_rgba(255,255,255,0.2)]",
    "hover:bg-[position:100%_100%]"
  ),
};

export type GlassCardVariant =
  | "glass"
  | "glassSubtle"
  | "frosted"
  | "fluted"
  | "crystal";

function GlassCard({
  className,
  variant = "glass",
  glass,
  style,
  ...props
}: React.ComponentProps<"div"> & {
  variant?: GlassCardVariant;
  glass?: GlassCustomization;
}) {
  const hasCustomGlass = glass !== undefined;
  const variantClass = hasCustomGlass
    ? glassVariantClasses.glass
    : glassVariantClasses[variant] ?? glassVariantClasses.glass;
  const glassStyles = getGlassStyles(glass);

  return (
    <div
      data-slot="glass-card"
      className={cn(
        "flex flex-col gap-6 rounded-xl py-6",
        variantClass,
        className
      )}
      style={{
        ...glassStyles,
        ...style,
      }}
      {...props}
    />
  );
}

function GlassCardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="glass-card-header"
      className={cn(
        "grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=glass-card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  );
}

function GlassCardTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="glass-card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function GlassCardDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="glass-card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function GlassCardAction({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="glass-card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

function GlassCardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="glass-card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function GlassCardFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="glass-card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  GlassCard,
  GlassCardHeader,
  GlassCardFooter,
  GlassCardTitle,
  GlassCardAction,
  GlassCardDescription,
  GlassCardContent,
};
