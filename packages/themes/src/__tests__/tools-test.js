/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import Color from 'color';
import { adjustLightness } from '../tools';
import { blue60 } from '@carbon/colors';

describe('tools', () => {
  describe('adjustLightness', () => {
    it('should shift lightness by a specified amount', () => {
      const SHIFT_AMOUNT = 5;

      const baseColor = Color(blue60);
      const baseLightness = baseColor
        .hsl()
        .round()
        .object().l;

      const newColor = Color(adjustLightness(blue60, SHIFT_AMOUNT));
      const newLightness = newColor
        .hsl()
        .round()
        .object().l;

      expect(newLightness).toEqual(baseLightness + SHIFT_AMOUNT);
    });
  });
});
