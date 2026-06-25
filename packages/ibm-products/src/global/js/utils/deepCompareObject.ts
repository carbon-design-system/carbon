/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const deepCompareObject = (a, b): boolean => {
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (!deepCompareObject(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }
  if (typeof a === 'object' && a !== null && b !== null) {
    if (!(typeof b === 'object')) {
      return false;
    }
    const keys = Object.keys(a);
    if (keys.length !== Object.keys(b).length) {
      return false;
    }
    for (const key in a) {
      if (!deepCompareObject(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return a === b;
};
