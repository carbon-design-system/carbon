/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment jsdom
 */

import { getNextIndex } from '../navigation';

const tests = [
  [
    'increments the index forward',
    {
      key: 'ArrowRight',
      index: 0,
      length: 3,
    },
    1,
  ],
  [
    'increments the index backward',
    {
      key: 'ArrowLeft',

      index: 1,
      length: 3,
    },
    0,
  ],
  [
    'loops last index to first',
    {
      key: 'ArrowRight',
      index: 3,
      length: 3,
    },
    1,
  ],
  [
    'loops first index to last',
    {
      key: 'ArrowLeft',
      index: 0,
      length: 3,
    },
    2,
  ],
];

test.each(tests)('%s', (_, { key, index, length }, expected) => {
  expect(getNextIndex(key, index, length)).toBe(expected);
});
