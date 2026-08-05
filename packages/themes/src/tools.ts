/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// OKLCH regex — matches the string format emitted by @carbon/colors.
const OKLCH_RE = /^oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)$/;

/**
 * Parse an oklch() CSS string into its { l, c, h } components.
 * Returns null if the string is not in oklch() format.
 */
function parseOklch(token: string): { l: number; c: number; h: number } | null {
  const m = token.match(OKLCH_RE);
  if (!m) return null;
  return { l: +m[1], c: +m[2], h: +m[3] };
}

/**
 * Convert oklch { l, c, h } to a lowercase 7-character hex string.
 * Uses the standard Oklab → linear-sRGB → sRGB pipeline.
 */
function oklchToHex(l: number, c: number, h: number): string {
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;

  const lc = l_ * l_ * l_;
  const mc = m_ * m_ * m_;
  const sc = s_ * s_ * s_;

  const rLin = 4.0767416621 * lc - 3.3077115913 * mc + 0.2309699292 * sc;
  const gLin = -1.2684380046 * lc + 2.6097574011 * mc - 0.3413193965 * sc;
  const bLin = -0.0041960863 * lc - 0.7034186147 * mc + 1.707614701 * sc;

  const toSrgb = (x: number) =>
    x >= 0.0031308 ? 1.055 * Math.pow(x, 1 / 2.4) - 0.055 : 12.92 * x;
  const clamp = (v: number) => Math.max(0, Math.min(1, v));

  const r = Math.round(clamp(toSrgb(rLin)) * 255);
  const g = Math.round(clamp(toSrgb(gLin)) * 255);
  const bl = Math.round(clamp(toSrgb(bLin)) * 255);

  return (
    '#' +
    r.toString(16).padStart(2, '0') +
    g.toString(16).padStart(2, '0') +
    bl.toString(16).padStart(2, '0')
  );
}

/**
 * Adjust a given token's lightness by a specified percentage point.
 *
 * The token must be an oklch() string (the format used by @carbon/colors).
 * The shift is applied directly to the L channel (0–1 scale), so a shift
 * of +5 increases lightness by 0.05.
 *
 * Returns a lowercase hex string to preserve backward compatibility with
 * downstream v10 consumers that expect hex output.
 *
 * Example:
 *   adjustLightness('oklch(0.57 0.22 26)', 5)  →  '#...'  (lighter red)
 *   adjustLightness('oklch(0.57 0.22 26)', -5) →  '#...'  (darker red)
 */
export const adjustLightness = (token: string, shift: number): string => {
  const oklch = parseOklch(token);
  if (oklch) {
    const newL = Math.max(0, Math.min(1, oklch.l + shift / 100));
    return oklchToHex(newL, oklch.c, oklch.h);
  }

  // Fallback: assume hex — apply shift via HSL (legacy path).
  // This branch exists only for callers still passing hex strings.
  const r = parseInt(token.slice(1, 3), 16);
  const g = parseInt(token.slice(3, 5), 16);
  const b = parseInt(token.slice(5, 7), 16);
  const [h, s, l] = rgbToHsl(r / 255, g / 255, b / 255);
  const newL = Math.max(0, Math.min(1, l + shift / 100));
  const [nr, ng, nb] = hslToRgb(h, s, newL);
  return (
    '#' +
    Math.round(nr * 255)
      .toString(16)
      .padStart(2, '0') +
    Math.round(ng * 255)
      .toString(16)
      .padStart(2, '0') +
    Math.round(nb * 255)
      .toString(16)
      .padStart(2, '0')
  );
};

/**
 * Adjust a given token's alpha by a specified amount.
 * The token must be an oklch() string or a legacy hex/rgba string.
 * Returns an rgba() CSS string.
 */
export const adjustAlpha = (token: string, alpha: number): string => {
  const oklch = parseOklch(token);
  if (oklch) {
    const hRad = (oklch.h * Math.PI) / 180;
    const a_ = oklch.c * Math.cos(hRad);
    const b_ = oklch.c * Math.sin(hRad);
    const l_ = oklch.l + 0.3963377774 * a_ + 0.2158037573 * b_;
    const m_ = oklch.l - 0.1055613458 * a_ - 0.0638541728 * b_;
    const s_ = oklch.l - 0.0894841775 * a_ - 1.291485548 * b_;
    const lc = l_ * l_ * l_;
    const mc = m_ * m_ * m_;
    const sc = s_ * s_ * s_;
    const rLin = 4.0767416621 * lc - 3.3077115913 * mc + 0.2309699292 * sc;
    const gLin = -1.2684380046 * lc + 2.6097574011 * mc - 0.3413193965 * sc;
    const bLin = -0.0041960863 * lc - 0.7034186147 * mc + 1.707614701 * sc;
    const toSrgb = (x: number) =>
      x >= 0.0031308 ? 1.055 * Math.pow(x, 1 / 2.4) - 0.055 : 12.92 * x;
    const clamp = (v: number) => Math.max(0, Math.min(1, v));
    const r = Math.round(clamp(toSrgb(rLin)) * 255);
    const g = Math.round(clamp(toSrgb(gLin)) * 255);
    const b = Math.round(clamp(toSrgb(bLin)) * 255);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // Fallback for legacy hex strings
  if (token.startsWith('#')) {
    const r = parseInt(token.slice(1, 3), 16);
    const g = parseInt(token.slice(3, 5), 16);
    const b = parseInt(token.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // Already rgba/rgb — re-apply alpha
  const rgbaMatch = token.match(
    /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/
  );
  if (rgbaMatch) {
    return `rgba(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]}, ${alpha})`;
  }

  return token;
};

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

/**
 * Format a given token into the format expected in CSS/SCSS-based projects.
 */
export const formatTokenName = (token: string) => {
  let string = '';

  for (let i = 0; i < token.length; i++) {
    // If we run into a number, we hit the scale step at the end of a token name
    // and can safely truncate the rest of the token
    if (numbers.indexOf(token[i]) !== -1) {
      string += '-' + token.slice(i);
      break;
    }

    // When encountering an uppercase name, we will want to start adding `-`
    // between words
    if (token[i] === token[i].toUpperCase()) {
      // Check backwards to see if previous letter was also capitalized, if so
      // we are in a special case like UI where each piece should be connected
      if (token[i - 1] && token[i - 1] === token[i - 1].toUpperCase()) {
        string += token[i].toLowerCase();
        continue;
      }

      // Otherwise, just concatenate this new part on to the existing string
      string += '-' + token[i].toLowerCase();
      continue;
    }

    // By default, we add the current character to the output string
    string += token[i];
  }

  return string;
};

// ── HSL helpers (used only in the legacy hex fallback of adjustLightness) ───

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [h, s, l];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  if (s === 0) return [l, l, l];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hue2rgb = (t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [hue2rgb(h + 1 / 3), hue2rgb(h), hue2rgb(h - 1 / 3)];
}
