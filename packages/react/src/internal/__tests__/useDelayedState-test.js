/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { useDelayedState } from '../useDelayedState';

jest.useFakeTimers();
const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

describe('useDelayedState', () => {
  it('should update the state after the given delayMs', async () => {
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
    expect(screen.getByTestId('count')).toHaveTextContent('0');

    await act(async () => {
      await user.click(screen.getByText('increment'));
      jest.runOnlyPendingTimers();
    });

    expect(screen.getByTestId('count')).toHaveTextContent('1');
  });

  it('should cancel any pending state updates if called before delayMs has passed', async () => {
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

    await act(async () => {
      await user.click(screen.getByText('increment'));
      jest.advanceTimersByTime(500);
      await user.click(screen.getByText('increment'));
      jest.runOnlyPendingTimers();
    });

    expect(screen.getByTestId('count')).toHaveTextContent('1');
  });

  it('should immediately call setState if no delay is given', async () => {
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

    expect(screen.getByTestId('count')).toHaveTextContent('0');

    await act(async () => {
      await user.click(screen.getByText('increment'));
    });

    expect(screen.getByTestId('count')).toHaveTextContent('1');
  });
});
