/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { useDelayedState } from '../useDelayedState';

jest.useFakeTimers();

describe('useDelayedState', () => {
  afterEach(cleanup);

  it('should update the state after the given delayMs', () => {
    function TestComponent() {
      const [count, setCount] = useDelayedState(0);
      return (
        <>
          <span data-testid="count">{count}</span>
          <button
            type="button"
            onClick={() => {
              setCount((c) => c + 1, 1000);
            }}>
            increment
          </button>
        </>
      );
    }

    render(<TestComponent />);
    expect(screen.getByTestId('count').textContent).toBe('0');

    act(() => {
      userEvent.click(screen.getByText('increment'));
      jest.runOnlyPendingTimers();
    });

    expect(screen.getByTestId('count').textContent).toBe('1');
  });

  it('should cancel any pending state updates if called before delayMs has passed', () => {
    function TestComponent() {
      const [count, setCount] = useDelayedState(0);
      return (
        <>
          <span data-testid="count">{count}</span>
          <button
            type="button"
            onClick={() => {
              setCount((c) => c + 1, 1000);
            }}>
            increment
          </button>
        </>
      );
    }

    render(<TestComponent />);

    act(() => {
      userEvent.click(screen.getByText('increment'));
      jest.advanceTimersByTime(500);
      userEvent.click(screen.getByText('increment'));
      jest.runOnlyPendingTimers();
    });

    expect(screen.getByTestId('count').textContent).toBe('1');
  });

  it('should immediately call setState if no delay is given', () => {
    function TestComponent() {
      const [count, setCount] = useDelayedState(0);
      return (
        <>
          <span data-testid="count">{count}</span>
          <button
            type="button"
            onClick={() => {
              setCount(count + 1);
            }}>
            increment
          </button>
        </>
      );
    }

    render(<TestComponent />);
    expect(screen.getByTestId('count').textContent).toBe('0');
    userEvent.click(screen.getByText('increment'));
    expect(screen.getByTestId('count').textContent).toBe('1');
  });
});
