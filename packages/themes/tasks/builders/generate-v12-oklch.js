/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * OKLCH Algorithmic Theming Engine for Carbon V12
 *
 * Implements the single-knob theming strategy:
 * - Brand Hue (H) = 262° (derived from IBM Blue 60 #0f62fe)
 * - Chroma (C) = 0.004 (subtle cool brand tint for neutrals)
 * - Lightness (L) is the primary variable driving all layers, surfaces, borders, text, and states
 */

const BRAND_HUE = 262.0;
const NEUTRAL_CHROMA = 0.004;

/**
 * Format OKLCH CSS color string
 * @param {number} l - Lightness [0, 1]
 * @param {number} c - Chroma [0, ~0.4]
 * @param {number} h - Hue [0, 360]
 * @returns {string}
 */
function formatOklch(l, c = NEUTRAL_CHROMA, h = BRAND_HUE) {
  const lFormatted = Number(l.toFixed(4));
  const cFormatted = Number(c.toFixed(4));
  const hFormatted = Number(h.toFixed(2));
  return `oklch(${lFormatted} ${cFormatted} ${hFormatted})`;
}

/**
 * Pure mathematical conversion from OKLCH -> linear sRGB -> sRGB Hex
 * Used to generate @supports not (color: oklch(0 0 0)) fallbacks without external dependencies
 *
 * @param {number} L - Lightness in [0, 1]
 * @param {number} C - Chroma
 * @param {number} H - Hue in degrees [0, 360]
 * @returns {string} e.g. "#0f62fe"
 */
function oklchToHex(L, C, H) {
  // 1. OKLCH -> OKLab
  const hRad = (H * Math.PI) / 180;
  const a = C * Math.cos(hRad);
  const b = C * Math.sin(hRad);

  // 2. OKLab -> LMS
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;

  // 3. LMS -> linear sRGB
  let rLin = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  let gLin = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  let bLin = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  // 4. Transfer function (gamma compression)
  const transfer = (c) => {
    const clamped = Math.max(0, Math.min(1, c));
    return clamped <= 0.0031308
      ? 12.92 * clamped
      : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
  };

  const r = Math.round(transfer(rLin) * 255);
  const g = Math.round(transfer(gLin) * 255);
  const bByte = Math.round(transfer(bLin) * 255);

  const toHex = (n) => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(bByte)}`;
}

/**
 * Generate complete V12 theme tokens mathematically
 * @param {'light'|'dark'} mode
 * @param {object} [overrides]
 * @returns {Record<string, string>}
 */
function generateV12OklchTheme(mode = 'light', overrides = {}) {
  const isLight = mode === 'light';
  const hue = overrides.hue ?? BRAND_HUE;
  const chroma = overrides.chroma ?? NEUTRAL_CHROMA;

  // 1. Anchors
  const brand = formatOklch(0.5565, 0.243, hue); // IBM Blue 60
  const base = formatOklch(0.16, chroma, hue); // Shell anchor

  // 2. Surface Ramps
  const surfaceBaseL = isLight ? 0.97 : 0.2;
  const surfaceLightL = isLight ? 1.0 : 0.24;
  const surfaceDarkL = isLight ? 0.94 : 0.16;

  const surface = formatOklch(surfaceBaseL, chroma, hue);
  const surfaceLight = isLight
    ? '#ffffff'
    : formatOklch(surfaceLightL, chroma, hue);
  const surfaceDark = formatOklch(surfaceDarkL, chroma, hue);

  // 3. Contextual Component Ramps (01 = surface, 02 = surface-light, 03 = surface-dark)
  const field01L = isLight ? surfaceBaseL - 0.03 : surfaceBaseL - 0.04;
  const field02L = isLight ? surfaceLightL - 0.03 : surfaceLightL - 0.04;
  const field03L = isLight ? surfaceDarkL - 0.03 : surfaceDarkL - 0.04;

  // Accent Layers (Option A floor: min 0.08 in dark mode)
  const accent01L = isLight
    ? surfaceBaseL - 0.06
    : Math.max(0.08, surfaceBaseL - 0.08);
  const accent02L = isLight
    ? surfaceLightL - 0.06
    : Math.max(0.08, surfaceLightL - 0.08);
  const accent03L = isLight
    ? surfaceDarkL - 0.06
    : Math.max(0.08, surfaceDarkL - 0.08);

  // Skeleton Backgrounds (Option A floor: min 0.14 in dark mode)
  const skeletonBg01L = isLight ? surfaceBaseL - 0.04 : surfaceBaseL - 0.06;
  const skeletonBg02L = isLight ? surfaceLightL - 0.04 : surfaceLightL - 0.06;
  const skeletonBg03L = isLight
    ? surfaceDarkL - 0.04
    : Math.max(0.14, surfaceDarkL - 0.06);

  // Skeleton Elements (Bone)
  const skeletonEl01L = isLight ? skeletonBg01L - 0.1 : skeletonBg01L + 0.08;
  const skeletonEl02L = isLight ? skeletonBg02L - 0.1 : skeletonBg02L + 0.08;
  const skeletonEl03L = isLight
    ? skeletonBg03L - 0.1
    : Math.max(0.2, skeletonBg03L + 0.06);

  // 4. Text & Icons (WCAG AA 4.5:1 Targets for contextual)
  const textPrimary = formatOklch(isLight ? 0.24 : 0.94, chroma, hue);
  const textSecondary = formatOklch(isLight ? 0.48 : 0.72, chroma, hue);
  const iconPrimary = textPrimary;
  const iconSecondary = textSecondary;

  const textHelper01L = isLight ? 0.5465 : 0.596;
  const textHelper02L = isLight ? 0.567 : 0.62;
  const textHelper03L = isLight ? 0.5255 : 0.5781;

  // 5. Borders (3:1 contrast target for strong, fixed delta for subtle)
  const borderStrong01L = isLight ? 0.647 : 0.5;
  const borderStrong02L = isLight ? 0.669 : 0.52;
  const borderStrong03L = isLight ? 0.624 : 0.483;

  const borderSubtle01L = isLight ? surfaceBaseL - 0.09 : surfaceBaseL + 0.12;
  const borderSubtle02L = isLight ? surfaceLightL - 0.09 : surfaceLightL + 0.12;
  const borderSubtle03L = isLight ? surfaceDarkL - 0.09 : surfaceDarkL + 0.12;

  const borderInteractive = isLight ? brand : formatOklch(0.647, 0.189, hue); // Accessible blue in dark mode

  const borderInverse = formatOklch(isLight ? 0.28 : 0.92, chroma, hue);

  return {
    // Brand & Base
    brand,
    base,

    // Surfaces
    surface,
    'surface-light': surfaceLight,
    'surface-dark': surfaceDark,
    'layer-01': surface,
    'layer-02': formatOklch(surfaceLightL, chroma, hue),
    'layer-03': formatOklch(surfaceDarkL, chroma, hue),

    // Fields
    'field-01': formatOklch(field01L, chroma, hue),
    'field-02': formatOklch(field02L, chroma, hue),
    'field-03': formatOklch(field03L, chroma, hue),

    // Accent Layers
    'layer-accent-01': formatOklch(accent01L, chroma, hue),
    'layer-accent-02': formatOklch(accent02L, chroma, hue),
    'layer-accent-03': formatOklch(accent03L, chroma, hue),

    // Skeletons
    'skeleton-background': formatOklch(skeletonBg01L, chroma, hue),
    'skeleton-element': formatOklch(skeletonEl01L, chroma, hue),
    'skeleton-background-01': formatOklch(skeletonBg01L, chroma, hue),
    'skeleton-background-02': formatOklch(skeletonBg02L, chroma, hue),
    'skeleton-background-03': formatOklch(skeletonBg03L, chroma, hue),
    'skeleton-element-01': formatOklch(skeletonEl01L, chroma, hue),
    'skeleton-element-02': formatOklch(skeletonEl02L, chroma, hue),
    'skeleton-element-03': formatOklch(skeletonEl03L, chroma, hue),

    // Text
    'text-primary': textPrimary,
    'text-secondary': textSecondary,
    'text-helper': formatOklch(textHelper01L, chroma, hue),
    'text-placeholder': formatOklch(textHelper01L, chroma, hue),
    'text-helper-01': formatOklch(textHelper01L, chroma, hue),
    'text-helper-02': formatOklch(textHelper02L, chroma, hue),
    'text-helper-03': formatOklch(textHelper03L, chroma, hue),
    'text-placeholder-01': formatOklch(textHelper01L, chroma, hue),
    'text-placeholder-02': formatOklch(textHelper02L, chroma, hue),
    'text-placeholder-03': formatOklch(textHelper03L, chroma, hue),

    // Icons
    'icon-primary': iconPrimary,
    'icon-secondary': iconSecondary,
    'icon-helper': formatOklch(textHelper01L, chroma, hue),
    'icon-placeholder': formatOklch(textHelper01L, chroma, hue),
    'icon-helper-01': formatOklch(textHelper01L, chroma, hue),
    'icon-helper-02': formatOklch(textHelper02L, chroma, hue),
    'icon-helper-03': formatOklch(textHelper03L, chroma, hue),
    'icon-placeholder-01': formatOklch(textHelper01L, chroma, hue),
    'icon-placeholder-02': formatOklch(textHelper02L, chroma, hue),
    'icon-placeholder-03': formatOklch(textHelper03L, chroma, hue),

    // Borders
    'border-strong-01': formatOklch(borderStrong01L, chroma, hue),
    'border-strong-02': formatOklch(borderStrong02L, chroma, hue),
    'border-strong-03': formatOklch(borderStrong03L, chroma, hue),
    'border-subtle-01': formatOklch(borderSubtle01L, chroma, hue),
    'border-subtle-02': formatOklch(borderSubtle02L, chroma, hue),
    'border-subtle-03': formatOklch(borderSubtle03L, chroma, hue),
    'border-interactive': borderInteractive,
    'border-inverse': borderInverse,
  };
}

/**
 * Generate fallback hex map for any OKLCH theme token dictionary
 * @param {Record<string, string>} oklchThemeMap
 * @returns {Record<string, string>}
 */
function generateHexFallbackTheme(oklchThemeMap) {
  const hexMap = {};
  const oklchRegex = /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/;

  for (const [key, value] of Object.entries(oklchThemeMap)) {
    if (typeof value === 'string') {
      const match = value.match(oklchRegex);
      if (match) {
        const [, l, c, h] = match;
        hexMap[key] = oklchToHex(parseFloat(l), parseFloat(c), parseFloat(h));
      } else {
        hexMap[key] = value;
      }
    } else {
      hexMap[key] = value;
    }
  }

  return hexMap;
}

module.exports = {
  BRAND_HUE,
  NEUTRAL_CHROMA,
  formatOklch,
  oklchToHex,
  generateV12OklchTheme,
  generateHexFallbackTheme,
};
