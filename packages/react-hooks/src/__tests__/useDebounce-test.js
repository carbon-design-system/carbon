/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, cleanup } from '@carbon/test-utils/react';
import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';
import { useDebounce } from '../useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  afterEach(cleanup);

  it('should debounce updating based on the received value', () => {
    let count;
    let updateCount;
    let debouncedValue;

    function Component() {
      [count, updateCount] = useState(0);
      [debouncedValue] = useDebounce(count, 100);

      return (
        <button onClick={() => updateCount(count + 1)}>{debouncedValue}</button>
      );
    }

    const { container } = render(<Component />);
    const button = container.querySelector('button');

    expect(debouncedValue).toBe(count);
    button.click();
    expect(debouncedValue).not.toBe(count);

    act(() => {
      jest.runAllTimers();
    });

    expect(debouncedValue).toBe(count);
  });

  it('should stop updates until some time after the value has settled', () => {
    let count;
    let updateCount;
    let debouncedValue;

    function Component() {
      [count, updateCount] = useState(0);
      [debouncedValue] = useDebounce(count, 100);

      return (
        <button onClick={() => updateCount(count + 1)}>{debouncedValue}</button>
      );
    }

    const { container } = render(<Component />);
    const intervalId = setInterval(() => {
      act(() => {
        const button = container.querySelector('button');
        button.click();
      });
    }, 100);

    expect(debouncedValue).toBe(count);
    jest.advanceTimersByTime(100);
    jest.advanceTimersByTime(100);
    jest.advanceTimersByTime(100);
    expect(debouncedValue).not.toBe(count);
    clearInterval(intervalId);

    act(() => {
      jest.runAllTimers();
    });
    expect(debouncedValue).toBe(count);
  });

  it('should update immediately if leading is set', () => {
    let count;
    let updateCount;
    let debouncedValue;

    function Component() {
      [count, updateCount] = useState(0);
      [debouncedValue] = useDebounce(count, 100, {
        leading: true,
      });

      return (
        <button onClick={() => updateCount(count + 1)}>{debouncedValue}</button>
      );
    }

    const { container } = render(<Component />);
    expect(debouncedValue).toBe(count);

    const button = container.querySelector('button');
    act(() => {
      button.click();
    });
    expect(debouncedValue).toBe(count);
  });
});
