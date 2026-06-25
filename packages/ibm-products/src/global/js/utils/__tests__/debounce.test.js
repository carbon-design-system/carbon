/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { debounce } from '../debounce';

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern');
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should call debounce function as expected given specified delay', () => {
    const callback = jest.fn();
    const debouncedFn = debounce(callback, 100, false);

    debouncedFn();
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(50);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should immediately call debounce function when leading option is set', () => {
    const callback = jest.fn();
    const debouncedFn = debounce(callback, 100);

    debouncedFn();
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(50);
    debouncedFn();
    expect(callback).toHaveBeenCalledTimes(2);
  });
});
