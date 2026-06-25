/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { deepCompareObject } from '../deepCompareObject';

describe('deepCompareObject', () => {
  const objA = {
    a: {
      b: 123,
    },
  };
  const objB = {
    a: {
      b: 123,
    },
  };
  const objC = {
    a: {
      b: 123,
    },
    c: 456,
  };
  const objD = {
    a: {
      b: 456,
    },
  };
  it('should check equality of two nested objects', () => {
    expect(deepCompareObject(objA, objB)).toBe(true);
  });
  it('should return false if b is not an object', () => {
    expect(deepCompareObject(objA, 1)).toBe(false);
  });
  it('should return false if one obj has more keys than the other', () => {
    expect(deepCompareObject(objA, objC)).toBe(false);
  });
  it('should return false if objects are not equal', () => {
    expect(deepCompareObject(objA, objD)).toBe(false);
  });

  const arrA = [1, 2, 3];
  const arrB = [1, 2, 3, 4];
  const arrC = [1, 2, 4];
  it('should return false if second value is not an array but first is', () => {
    expect(deepCompareObject(arrA, 1)).toBe(false);
  });
  it('should return false if both are arrays but of different lengths', () => {
    expect(deepCompareObject(arrA, arrB)).toBe(false);
  });
  it('should return false if both are same length but different not equal', () => {
    expect(deepCompareObject(arrA, arrC)).toBe(false);
  });
  it('should return tru if both arrays are equal', () => {
    expect(deepCompareObject(arrA, [1, 2, 3])).toBe(true);
  });
});
