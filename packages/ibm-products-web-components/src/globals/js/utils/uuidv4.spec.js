/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import uuidv4 from './uuidv4';

describe('uuidv4', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Uses Math.random when window is not defined', () => {
    const { crypto } = window;
    delete window.crypto;
    const mockMath = Object.create(global.Math);
    const mockMathRandom = jest.fn().mockReturnValue(0.5);
    mockMath.random = mockMathRandom;
    global.Math = mockMath;

    expect(uuidv4()).toEqual('98888888-9888-4888-a888-988888888888');
    window.crypto = crypto;
  });

  it('Uses crypto from window when window is defined', () => {
    const mGetRandomValues = jest.fn().mockReturnValue(new Uint32Array(10));
    Object.defineProperty(window, 'crypto', {
      value: { getRandomValues: mGetRandomValues },
    });
    expect(uuidv4()).toEqual('10000000-1000-4000-8000-100000000000');
    expect(mGetRandomValues).toBeCalledWith(new Uint8Array(1));
  });
});
