/**
 * Glassmorphism customization utilities
 * @see https://github.com/crenspire/glass-ui
 */

import type { CSSProperties } from "react";

export interface GlassCustomization {
  /** Background color (e.g. "rgba(255,255,255,0.1)"). Default: --glass-bg */
  color?: string;
  /** Opacity 0–1, overrides alpha in color */
  transparency?: number;
  /** Blur in px. Default: --blur (20px) */
  blur?: number | string;
  /** Border color. Default: --glass-border */
  outline?: string;
  /** Border width. Default: 1px */
  outlineWidth?: number | string;
  /** Box shadow. Default: --glass-shadow */
  shadow?: string;
  /** Inner glow color (inset shadow) */
  innerGlow?: string;
  /** Inner glow blur. Default: 20px */
  innerGlowBlur?: number | string;
}

export function getGlassStyles(
  customization?: GlassCustomization
): CSSProperties {
  if (!customization) return {};

  const styles: CSSProperties = {};

  if (customization.color || customization.transparency !== undefined) {
    let bgColor = customization.color ?? "rgba(255, 255, 255, 0.1)";
    if (customization.transparency !== undefined) {
      const rgbaMatch = bgColor.match(
        /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/
      );
      if (rgbaMatch) {
        const [, r, g, b] = rgbaMatch;
        bgColor = `rgba(${r}, ${g}, ${b}, ${customization.transparency})`;
      } else if (bgColor.startsWith("#")) {
        const hex = bgColor.replace("#", "");
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        bgColor = `rgba(${r}, ${g}, ${b}, ${customization.transparency})`;
      } else {
        bgColor = `${bgColor}${customization.transparency}`;
      }
    }
    styles.backgroundColor = bgColor;
  }

  if (customization.blur !== undefined) {
    const blurValue =
      typeof customization.blur === "number"
        ? `${customization.blur}px`
        : customization.blur;
    styles.backdropFilter = `blur(${blurValue})`;
    styles.WebkitBackdropFilter = `blur(${blurValue})`;
  }

  if (customization.outline !== undefined) {
    const width = customization.outlineWidth ?? "1px";
    styles.borderColor = customization.outline;
    styles.borderWidth =
      typeof width === "number" ? `${width}px` : width;
    styles.borderStyle = "solid";
  } else if (
    !customization.outline &&
    (customization.color ||
      customization.transparency !== undefined ||
      customization.blur !== undefined)
  ) {
    styles.borderColor = "rgba(255, 255, 255, 0.3)";
    styles.borderWidth = "1px";
    styles.borderStyle = "solid";
  }

  const shadows: string[] = [];
  if (customization.shadow !== undefined) {
    shadows.push(customization.shadow);
  } else if (
    customization.color ||
    customization.transparency !== undefined ||
    customization.blur !== undefined
  ) {
    shadows.push(
      "0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)"
    );
  }
  if (customization.innerGlow !== undefined) {
    const glowBlur =
      customization.innerGlowBlur !== undefined
        ? typeof customization.innerGlowBlur === "number"
          ? `${customization.innerGlowBlur}px`
          : customization.innerGlowBlur
        : "20px";
    shadows.push(`inset 0 0 ${glowBlur} ${customization.innerGlow}`);
  }
  if (shadows.length > 0) {
    styles.boxShadow = shadows.join(", ");
  }

  return styles;
}
