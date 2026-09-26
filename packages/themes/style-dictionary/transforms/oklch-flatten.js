/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Flatten generated DTCG OKLCH color values to CSS color strings.
 */
module.exports = {
  name: 'carbon/oklch-flatten',
  type: 'value',
  transitive: true,
  filter(token) {
    return token.$type === 'color' || token.type === 'color';
  },
  transform(token) {
    let value = token.value !== undefined ? token.value : token.$value;

    if (value && typeof value === 'object' && '$value' in value) {
      value = value.$value;
    }

    if (
      value?.colorSpace !== 'oklch' ||
      !Array.isArray(value.components) ||
      value.components.length !== 3
    ) {
      return value;
    }

    const [lightness, chroma, hue] = value.components;
    const alpha = value.alpha ?? 1;
    return alpha === 1
      ? `oklch(${lightness} ${chroma} ${hue})`
      : `oklch(${lightness} ${chroma} ${hue} / ${alpha})`;
  },
};
