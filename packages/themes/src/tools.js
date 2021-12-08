/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Color from 'color';

/**
 * Adjust a given token's lightness by a specified percentage
 * Example: token = hsl(10, 10, 10);
 * adjustLightness(token, 5) === hsl(10, 10, 15);
 * adjustLightness(token, -5) === hsl(10, 10, 5);
 * @param {string} token
 * @param {integer} shift The number of percentage points (positive or negative) by which to shift the lightness of a token.
 * @returns {string}
 */
export function adjustLightness(token, shift) {
  const original = Color(token).hsl().object();

  return Color({ ...original, l: (original.l += shift) })
    .round()
    .hex()
    .toLowerCase();
}

/**
 * Adjust a given token's alpha by a specified percentage
 * Example: token = rgba(10, 10, 10, 1.0);
 * adjustAlpha(token, 0.5) === rgba(10, 10, 10, 0.5);
 * @param {string} token
 * @param {integer} alpha The number of percentage points by which to shift the opacity of a token.
 * @returns {string}
 */
export function adjustAlpha(token, alpha) {
  return Color(token).rgb().alpha(alpha).string();
}
