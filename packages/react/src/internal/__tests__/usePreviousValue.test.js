/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';
import { usePreviousValue } from '../usePreviousValue';

const TestComponent = () => {
  const [a, setA] = useState(10);
  const prevA = usePreviousValue(a);
  const [b, setB] = useState(20);

  return (
    <>
      A: <span data-testid="a">{a}</span>
      prevA: <span data-testid="prevA">{prevA}</span>
      B: <span data-testid="b">{b}</span>
      <button
        onClick={() => {
          setA(a + 1);
        }}>
        increment a
      </button>
      <button
        onClick={() => {
          setB(b + 1);
        }}>
        increment b
      </button>
    </>
  );
};

describe('usePreviousValue', () => {
  it('returns undefined for the first render', () => {
    render(<TestComponent />);

    expect(screen.getByTestId('a')).toHaveTextContent('10');
    expect(screen.getByTestId('prevA')).toHaveTextContent('');
  });

  it('returns the previous value on subsequent render', async () => {
    render(<TestComponent />);

    await userEvent.click(screen.getByRole('button', { name: 'increment a' }));
    expect(screen.getByTestId('a')).toHaveTextContent('11');
    expect(screen.getByTestId('prevA')).toHaveTextContent('10');
  });

  it('returns the new value on the next next render', async () => {
    render(<TestComponent />);

    await userEvent.click(screen.getByRole('button', { name: 'increment a' }));
    expect(screen.getByTestId('a')).toHaveTextContent('11');
    expect(screen.getByTestId('prevA')).toHaveTextContent('10');

    // After value is updated, there should only be one render where prevValue !== value.
    // After that, both value and prevValue should be the same again.
    await userEvent.click(screen.getByRole('button', { name: 'increment b' }));
    expect(screen.getByTestId('b')).toHaveTextContent('21');
    expect(screen.getByTestId('a')).toHaveTextContent('11');
    expect(screen.getByTestId('prevA')).toHaveTextContent('11');
  });
});
