/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('uniqueId', () => {
  let uniqueId;

  beforeEach(() => {
    jest.resetModules();
    uniqueId = require('../uniqueId').uniqueId;
  });

  it('increments unique id as expected', () => {
    const uniqueIdOne = uniqueId();
    const uniqueIdTwo = uniqueId();

    expect(uniqueIdOne).toEqual('id1');
    expect(uniqueIdTwo).toEqual('id2');
  });

  it('accepts a custom prefix', () => {
    const uniqueIdThree = uniqueId('customPrefix');

    expect(uniqueIdThree).toEqual('customPrefix1');
  });

  it('should return a numeric id when an empty prefix is provided', () => {
    const result = uniqueId('');

    expect(result).toEqual('1');
  });

  it('should fall back to default prefix when `undefined` is provided', () => {
    const result = uniqueId(undefined);

    expect(result.startsWith('id')).toBe(true);
  });

  it('should increment properly across multiple prefixes', () => {
    const first = uniqueId('a');
    const second = uniqueId('b');

    expect(first).toEqual('a1');
    expect(second).toEqual('b2');
  });
});
