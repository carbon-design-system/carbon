/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import { adjustLightness } from '../tools';
import { blue60 } from '@carbon/colors';

// blue60 is 'oklch(0.5565 0.2430 261.95)' — parse L for baseline
function parseL(oklchString) {
  const m = oklchString.match(/^oklch\(([\d.]+)/);
  return m ? +m[1] : null;
}

// adjustLightness returns a hex string — convert back to oklch L via the
// same inline math used in tools.ts to verify the shift was applied.
function hexToOklchL(hex) {
  const { converter } = require('culori');
  const toOklch = converter('oklch');
  return toOklch(hex).l;
}

describe('tools', () => {
  describe('adjustLightness', () => {
    const SHIFT_AMOUNT = 5;
    const baseL = parseL(blue60); // OKLCH L of blue60

    it('should increase lightness by a specified amount', () => {
      const result = adjustLightness(blue60, SHIFT_AMOUNT);
      const newL = hexToOklchL(result);
      // L shifted by SHIFT_AMOUNT/100 in OKLCH space.
      // Precision 1 (±0.05) accounts for hex quantisation on the round-trip.
      expect(newL).toBeCloseTo(baseL + SHIFT_AMOUNT / 100, 1);
      expect(newL).toBeGreaterThan(baseL);
    });

    it('should decrease lightness by a specified amount when given a negative shift', () => {
      const result = adjustLightness(blue60, SHIFT_AMOUNT * -1);
      const newL = hexToOklchL(result);
      expect(newL).toBeCloseTo(baseL - SHIFT_AMOUNT / 100, 1);
      expect(newL).toBeLessThan(baseL);
    });
  });
});
