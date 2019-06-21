/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * @jest-environment jsdom
 */
import { getNextIndex } from '../keyboard-navigation';

describe('getNextIndex', () => {
  let indexToTest;
  test('increments the index forward', () => {
    indexToTest = getNextIndex('ArrowRight', 0, 3);
    expect(indexToTest).toEqual(1);
  });
  test('increments the index backward', () => {
    indexToTest = getNextIndex('ArrowLeft', 1, 3);
    expect(indexToTest).toEqual(0);
  });
  test('loops last index to first', () => {
    indexToTest = getNextIndex('ArrowRight', 3, 3);
    expect(indexToTest).toEqual(1);
  });
  test('loops first index to last', () => {
    indexToTest = getNextIndex('ArrowLeft', 0, 3);
    expect(indexToTest).toEqual(2);
  });
});
