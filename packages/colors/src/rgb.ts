/**
 * Copyright IBM Corp. 2018, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Parses a color value — either a hex string ("#rrggbb") or an oklch()
 * string ("oklch(L C H)") — and returns an RGBA CSS string with the given
 * opacity.
 *
 * oklch() is the source of truth in @carbon/colors (GitHub #22660).  Hex
 * strings are accepted for backward compatibility with any callers that have
 * not yet migrated.
 */
export const rgba = (color: string, opacity: number): string => {
  // oklch(L C H) — parse via canvas-free math
  const oklchMatch = color.match(/^oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)$/);
  if (oklchMatch) {
    const [r, g, b] = oklchToSrgb(
      +oklchMatch[1],
      +oklchMatch[2],
      +oklchMatch[3]
    );
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  // Legacy hex "#rrggbb"
  const values = [
    color.substring(1, 3),
    color.substring(3, 5),
    color.substring(5, 7),
  ].map((string) => parseInt(string, 16));
  return `rgba(${values[0]}, ${values[1]}, ${values[2]}, ${opacity})`;
};

// ---------------------------------------------------------------------------
// Minimal OKLCH → sRGB conversion (no external deps)
// Implements the Oklab / OKLCH → linear-sRGB → sRGB pipeline exactly as
// specified in https://bottosson.github.io/posts/oklab/
// ---------------------------------------------------------------------------

function oklchToSrgb(
  L: number,
  C: number,
  H: number
): [number, number, number] {
  const hRad = (H * Math.PI) / 180;
  const a = C * Math.cos(hRad);
  const b = C * Math.sin(hRad);

  // Oklab → linear sRGB (matrix from the Oklab spec)
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  const rLin = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const gLin = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bLin = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  return [
    Math.round(clamp(linearToSrgb(rLin)) * 255),
    Math.round(clamp(linearToSrgb(gLin)) * 255),
    Math.round(clamp(linearToSrgb(bLin)) * 255),
  ];
}

function linearToSrgb(c: number): number {
  return c >= 0.0031308 ? 1.055 * Math.pow(c, 1 / 2.4) - 0.055 : 12.92 * c;
}

function clamp(v: number): number {
  return Math.max(0, Math.min(1, v));
}
