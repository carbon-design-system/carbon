/**
 * Copyright IBM Corp. 2018, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Converts a DTCG duration $value object `{ value: N, unit: "ms" }` into the
 * CSS string `"Nms"`.
 *
 * The DTCG spec stores duration as a composite object rather than a bare
 * string; Style Dictionary does not know this shape natively, so we resolve
 * it here before the value reaches any format.
 *
 * Examples:
 *   { value: 70,  unit: 'ms' } → '70ms'
 *   { value: 400, unit: 'ms' } → '400ms'
 */
module.exports = {
  name: 'carbon/motion-duration',
  type: 'value',
  transitive: true,
  filter(token) {
    return token.$type === 'duration' || token.type === 'duration';
  },
  transform(token) {
    const v = token.value !== undefined ? token.value : token.$value;

    if (v && typeof v === 'object' && 'value' in v && 'unit' in v) {
      return `${v.value}${v.unit}`;
    }

    // Already a resolved string (e.g. from a transitive pass) — pass through.
    return v;
  },
};
