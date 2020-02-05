/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Color from 'color';

/**
 * Adjust a given token's lightness by a specified percentage
 * @param {string} token
 * @param {integer} percentage The amount by which to lighten or darkn the token. Accepts values -100% and 100% (inclusive).
 * @returns {string}
 */
export function adjustLightness(token, percentage) {
  return Color(token)
    .lighten(token, parseInt(percentage, 10))
    .hex()
    .toLowerCase();
}
