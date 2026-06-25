/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import wait from '../wait';

const duration = 1000;
let isFetching = true;
const mockFn = jest.fn();

const simulateWait = async () => {
  await wait(duration);
  mockFn();
  isFetching = false;
};

describe('wait util', () => {
  it('should utilize wait helper', async () => {
    jest.useFakeTimers();
    simulateWait();

    expect(mockFn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(duration);
    await Promise.resolve();

    expect(isFetching).toBeFalsy();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
