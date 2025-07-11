/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { uniqueIdDeprecationMessage } from '../uniqueId';

describe('uniqueId', () => {
  let uniqueId;
  let deprecationWarning;

  beforeEach(() => {
    jest.resetModules();
    uniqueId = require('../uniqueId').uniqueId;
    deprecationWarning = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => {});
  });

  afterEach(() => {
    deprecationWarning.mockRestore();
  });

  it('increments unique id as expected', () => {
    const uniqueIdOne = uniqueId();
    const uniqueIdTwo = uniqueId();

    expect(uniqueIdOne).toEqual('id1');
    expect(uniqueIdTwo).toEqual('id2');

    expect(deprecationWarning).toHaveBeenLastCalledWith(
      `Warning: ${uniqueIdDeprecationMessage}`
    );
  });

  it('accepts a custom prefix', () => {
    const uniqueIdThree = uniqueId('customPrefix');

    expect(uniqueIdThree).toEqual('customPrefix1');

    expect(deprecationWarning).toHaveBeenLastCalledWith(
      `Warning: ${uniqueIdDeprecationMessage}`
    );
  });

  it('should return a numeric id when an empty prefix is provided', () => {
    const result = uniqueId('');

    expect(result).toEqual('1');

    expect(deprecationWarning).toHaveBeenLastCalledWith(
      `Warning: ${uniqueIdDeprecationMessage}`
    );
  });

  it('should fall back to default prefix when `undefined` is provided', () => {
    const result = uniqueId(undefined);

    expect(result.startsWith('id')).toBe(true);

    expect(deprecationWarning).toHaveBeenLastCalledWith(
      `Warning: ${uniqueIdDeprecationMessage}`
    );
  });

  it('should increment properly across multiple prefixes', () => {
    const first = uniqueId('a');
    const second = uniqueId('b');

    expect(first).toEqual('a1');
    expect(second).toEqual('b2');

    expect(deprecationWarning).toHaveBeenLastCalledWith(
      `Warning: ${uniqueIdDeprecationMessage}`
    );
  });
});
