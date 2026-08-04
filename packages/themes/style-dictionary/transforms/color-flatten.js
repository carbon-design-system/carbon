/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 *
 * Converts the DTCG color $value object shapes used by this codebase into
 * plain CSS color strings, after Style Dictionary has already resolved any
 * alias references.
 *
 * Input shapes (post-alias-resolution, i.e. $value is already an object):
 *
 *   Shape A — solid inline object
 *     { colorSpace: 'srgb', components: [...], hex: '#rrggbb' }
 *     → '#rrggbb'
 *
 *   Shape B — alpha inline object (components + alpha, no hex)
 *     { colorSpace: 'srgb', components: [r, g, b], alpha: 0.5 }
 *     → 'rgba(r, g, b, 0.5)'
 *
 * Plain strings and non-sRGB objects are passed through unchanged.
 *
 * NOTE: The alias+alphaModifier case (Shape C) is handled upstream by the
 * carbon/alpha-modifier transform, which runs first (transitive: true ensures
 * the resolved alias value is already in scope when this transform fires).
 */

module.exports = {
  name: 'carbon/color-flatten',
  type: 'value',
  transitive: true,
  filter(token) {
    return token.$type === 'color' || token.type === 'color';
  },
  transform(token) {
    // SD v5 stores the post-alias-resolution value in token.$value (the DTCG
    // field), NOT in token.value.  token.value is only set after transforms run.
    // The golden-master test sets both; in that context token.value is preferred
    // so the test can simulate resolution without running full SD.
    const v = token.value !== undefined ? token.value : token.$value;

    if (typeof v === 'string') {
      // Already a plain string (e.g. '#0f62fe' or 'rgba(...)') — pass through.
      return v;
    }

    if (v === null || typeof v !== 'object') {
      return v;
    }

    // SD v5 can resolve an alias to the full token node instead of its value
    // when the alias points to a sibling token (e.g. {syntax.value} resolving
    // to the syntax.value token object). Unwrap one level.
    if ('$value' in v) {
      const inner = v.$value;
      if (typeof inner === 'string') return inner;
      if (inner?.hex) return inner.hex;
    }

    if (v.colorSpace !== 'srgb' || !Array.isArray(v.components)) {
      return v;
    }

    // Shape A — solid: hex present
    if (typeof v.hex === 'string') {
      return v.hex;
    }

    // Shape B — alpha: derive rgba from 0–1 component floats
    const [r, g, b] = v.components.map((c) => Math.round(c * 255));
    const alpha = v.alpha !== undefined ? v.alpha : 1;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  },
};
