/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { clamp } from '../clamp';

describe('clamp', () => {
  it('should return the value unmodified when it is within the bounds', () => {
    expect(clamp(5, 1, 10)).toBe(5);
    expect(clamp(1, 1, 10)).toBe(1);
    expect(clamp(10, 1, 10)).toBe(10);
  });

  it('should clamp the value to the lower bound when below min', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(5, 10, 20)).toBe(10);
  });

  it('should clamp the value to the upper bound when above max', () => {
    expect(clamp(15, 0, 10)).toBe(10);
    expect(clamp(5, 0, 2)).toBe(2);
  });

  it('should return `NaN` if any argument is not a number', () => {
    expect(clamp('a', 0, 10)).toBeNaN();
    expect(clamp(5, 'a', 10)).toBeNaN();
    expect(clamp(5, 0, 'a')).toBeNaN();
  });

  it('should handle cases where the lower bound is greater than the upper bound', () => {
    expect(clamp(5, 10, 1)).toBe(1);
    expect(clamp(15, 10, 1)).toBe(1);
    expect(clamp(-5, 10, 1)).toBe(1);
  });

  it('should return the bound when lower and upper bounds are equal', () => {
    expect(clamp(-5, 1, 1)).toBe(1);
    expect(clamp(0, 1, 1)).toBe(1);
    expect(clamp(5, 1, 1)).toBe(1);
  });

  it('should handle explicit `Infinity` and `-Infinity` bounds', () => {
    expect(clamp(Infinity, 0, 10)).toBe(10);
    expect(clamp(-Infinity, 0, 10)).toBe(0);
    expect(clamp(5, 0, Infinity)).toBe(5);
    expect(clamp(5, -Infinity, 10)).toBe(5);
    expect(clamp(5, -Infinity, Infinity)).toBe(5);
  });

  it('should return `NaN` when bounds are `NaN`', () => {
    expect(clamp(5, NaN, 10)).toBeNaN();
    expect(clamp(5, 0, NaN)).toBeNaN();
    expect(clamp(5, NaN, NaN)).toBeNaN();
  });

  it('should work with decimal values', () => {
    expect(clamp(5.5, 1.2, 10.8)).toBe(5.5);
    expect(clamp(0.5, 1.2, 10.8)).toBe(1.2);
    expect(clamp(11.5, 1.2, 10.8)).toBe(10.8);
  });
});
