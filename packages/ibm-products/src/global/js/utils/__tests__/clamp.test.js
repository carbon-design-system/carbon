/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { clamp } from '../clamp';

describe('clamp', () => {
  it('should return the given number if in range', () => {
    const clampedNumber = clamp(10, 5, 15);
    expect(clampedNumber).toEqual(10);
  });
  it('should return the lower bound if value is lower than the min', () => {
    const clampedNumber = clamp(1, 5, 15);
    expect(clampedNumber).toEqual(5);
  });
  it('should return the upper bound if value is higher than the max', () => {
    const clampedNumber = clamp(20, 5, 15);
    expect(clampedNumber).toEqual(15);
  });
  it('should not return anything if anything other than a number is provided', () => {
    const clampedNumber = clamp('a', 1, 3);
    expect(clampedNumber).toBeUndefined();
  });
  it('should always return the greater of the bounding numbers', () => {
    // Even if min bound is greater than max bound
    expect(clamp(100, 50, 20)).toEqual(50);
    expect(clamp(100, 20, 50)).toEqual(50);
  });
});
