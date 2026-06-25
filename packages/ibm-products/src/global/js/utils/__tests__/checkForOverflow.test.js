/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { checkWidthOverflow, checkHeightOverflow } from '../checkForOverflow';

const normalElm = {
  offsetWidth: 200,
  scrollWidth: 100,
  offsetHeight: 200,
  scrollHeight: 100,
};

const overflowElm = {
  offsetWidth: 100,
  scrollWidth: 200,
  offsetHeight: 100,
  scrollHeight: 200,
};

describe('checkForOverflow', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('detects width overflow', () => {
    expect(checkWidthOverflow(normalElm)).toBe(false);
    expect(checkWidthOverflow(overflowElm)).toBe(true);
    expect(checkWidthOverflow()).toBe(false);
  });

  it('detects height overflow', () => {
    expect(checkHeightOverflow(normalElm)).toBe(false);
    expect(checkHeightOverflow(overflowElm)).toBe(true);
    expect(checkHeightOverflow()).toBe(false);
  });
});
