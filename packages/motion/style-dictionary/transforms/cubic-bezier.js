/**
 * Copyright IBM Corp. 2018, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Converts a DTCG cubicBezier $value array `[x1, y1, x2, y2]` into the CSS
 * string `"cubic-bezier(x1, y1, x2, y2)"`.
 *
 * Style Dictionary v5 does not perform this conversion for cubicBezier tokens
 * automatically, so we handle it here.
 *
 * Examples:
 *   [0.2, 0, 0.38, 0.9] → 'cubic-bezier(0.2, 0, 0.38, 0.9)'
 *   [0, 0, 0.3, 1]       → 'cubic-bezier(0, 0, 0.3, 1)'
 */
module.exports = {
  name: 'carbon/motion-cubic-bezier',
  type: 'value',
  transitive: true,
  filter(token) {
    return token.$type === 'cubicBezier' || token.type === 'cubicBezier';
  },
  transform(token) {
    const v = token.value !== undefined ? token.value : token.$value;

    if (Array.isArray(v) && v.length === 4) {
      return `cubic-bezier(${v.join(', ')})`;
    }

    // Already a resolved string — pass through.
    return v;
  },
};
