/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { oklchToSrgb, type OklchColor, type SrgbColor } from './color';

/**
 * Computes WCAG 2.x relative luminance for a gamma-encoded sRGB color.
 * The coefficients (0.2126 / 0.7152 / 0.0722) are the ITU-R BT.709 primaries
 * linearized via the sRGB inverse transfer function.
 *
 * Reference: https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
export function getRelativeLuminance({ red, green, blue }: SrgbColor) {
  const [r, g, b] = [red, green, blue].map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Computes the WCAG 2.x contrast ratio between two OKLCH colors.
 * Returns a value ≥ 1 (identical colors) up to 21 (black vs white).
 *
 * Reference: https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 */
export function getContrastRatio(
  foreground: OklchColor,
  background: OklchColor
) {
  const foregroundLuminance = getRelativeLuminance(oklchToSrgb(foreground));
  const backgroundLuminance = getRelativeLuminance(oklchToSrgb(background));
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Binary-searches for the OKLCH lightness that achieves at least `target`:1
 * WCAG contrast against `background`, moving in the specified `direction`.
 *
 * Hue and chroma are held constant; only lightness varies.
 * 40 iterations achieve ~1e-12 lightness precision — well beyond perceptible
 * differences and far below any 8-bit display quantization.
 *
 * Throws if the absolute boundary (L=0 or L=1) cannot meet `target`. This
 * means the surface lightness and contrast target are incompatible; the caller
 * in `generate-theme.ts` catches and re-throws with an actionable message.
 */
export function findLightnessForContrast({
  background,
  target,
  direction,
  chroma,
  hue,
}: {
  background: OklchColor;
  target: number;
  direction: 'lighter' | 'darker';
  chroma: number;
  hue: number;
}): OklchColor {
  let passing = direction === 'lighter' ? 1 : 0;
  let failing = background.lightness;
  const boundaryColor = { lightness: passing, chroma, hue };

  if (getContrastRatio(boundaryColor, background) < target) {
    throw new Error(
      `Unable to reach a ${target}:1 contrast ratio by making the color ${direction}`
    );
  }

  for (let index = 0; index < 40; index++) {
    const candidateLightness = (passing + failing) / 2;
    const candidate = { lightness: candidateLightness, chroma, hue };

    if (getContrastRatio(candidate, background) >= target) {
      passing = candidateLightness;
    } else {
      failing = candidateLightness;
    }
  }

  return { lightness: passing, chroma, hue };
}
