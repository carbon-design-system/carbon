/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export function percent(total, value) {
  return Math.round((value / total) * 100) + '%';
}

export function percentChanged(x1, x2) {
  const value = Math.round(((x2 - x1) / x1) * 100);
  if (value > 0) {
    return {
      type: 'increase',
      value: value + '%',
    };
  }

  if (value < 0) {
    return {
      type: 'decrease',
      value: value + '%',
    };
  }

  return {
    type: 'neutral',
    value: value + '%',
  };
}
