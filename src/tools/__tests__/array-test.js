/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { equals } from '../array';

describe('array utilities', () => {
  it('should return false when one or more arguments are not an array', () => {
    expect(equals([])).toBe(false);
    expect(equals()).toBe(false);
    expect(equals([], 1)).toBe(false);
  });
  it('should return false when the arrays are different', () => {
    expect(equals([1], [1, 2])).toBe(false);
    expect(equals([1, 2], [3, 4])).toBe(false);
  });
  it('should return true when the arrays are identical', () => {
    const arr1 = [1, 2, 3];
    expect(equals(arr1, arr1)).toBe(true);
    expect(equals([1, 2, 3], arr1)).toBe(true);
  });
});
