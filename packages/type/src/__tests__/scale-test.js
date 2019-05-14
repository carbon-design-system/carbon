/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import { getTypeSize, scale } from '../scale';

describe('scale', () => {
  it('should export the type scale', () => {
    expect(scale).toMatchSnapshot();
  });

  describe('getTypeSize', () => {
    it('should return the base font for steps <= 1', () => {
      expect(getTypeSize(1)).toBe(12);
      expect(getTypeSize(0)).toBe(12);
    });

    it('should support steps greater than 1', () => {
      expect(() => {
        getTypeSize(2);
        getTypeSize(10);
        getTypeSize(20);
      }).not.toThrow();
    });
  });
});
