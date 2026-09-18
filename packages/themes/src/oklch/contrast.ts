/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { oklchToSrgb, type OklchColor, type SrgbColor } from './color';

export function getRelativeLuminance({ red, green, blue }: SrgbColor) {
  const [r, g, b] = [red, green, blue].map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

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
