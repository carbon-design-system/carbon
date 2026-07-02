/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { ErrorBoundary, ErrorBoundaryContext } from '../';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('ErrorBoundary', () => {
  it('should render children and not a fallback if no error is caught', () => {
    function MockComponent() {
      return <span data-test-id="mock">mock</span>;
    }

    function MockFallback() {
      return <span data-test-id="fallback">mock</span>;
    }

    const { container } = render(
      <ErrorBoundary fallback={<MockFallback />}>
        <MockComponent />
      </ErrorBoundary>
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const component = container.querySelector('[data-test-id="mock"]');
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const fallback = container.querySelector('[data-test-id="fallback"]');

    expect(component).toBeDefined();
    expect(fallback).toBe(null);
  });

  it('should render a fallback if an error is caught', () => {
    console.error = jest.spyOn(console, 'error').mockImplementation(() => {});

    function MockComponent() {
      throw new Error('test error');
    }

    function MockFallback() {
      return <span data-test-id="fallback">mock</span>;
    }

    const log = jest.fn();

    const { container } = render(
      <ErrorBoundaryContext.Provider value={{ log }}>
        <ErrorBoundary fallback={<MockFallback />}>
          <MockComponent />
        </ErrorBoundary>
      </ErrorBoundaryContext.Provider>
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const component = container.querySelector('[data-test-id="mock"]');
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const fallback = container.querySelector('[data-test-id="fallback"]');

    expect(component).toBe(null);
    expect(fallback).toBeDefined();
    expect(console.error).toHaveBeenCalled();
    expect(log).toHaveBeenCalled();

    console.error.mockRestore();
  });

  it('should reset from fallback if children have changed', async () => {
    console.error = jest.spyOn(console, 'error').mockImplementation(() => {});

    function ThrowError({ shouldThrowError }) {
      if (shouldThrowError) {
        throw new Error('test error');
      }
      return <span>no error span</span>;
    }

    function MockFallback() {
      return <span>fallback</span>;
    }

    function MockTest() {
      const [shouldThrow, setShouldThrow] = useState(false);

      function onClick() {
        setShouldThrow(!shouldThrow);
      }

      return (
        <ErrorBoundaryContext.Provider value={{ log: jest.fn() }}>
          <button type="button" onClick={onClick}>
            Toggle
          </button>
          <ErrorBoundary fallback={<MockFallback />}>
            <ThrowError shouldThrowError={shouldThrow} />
          </ErrorBoundary>
        </ErrorBoundaryContext.Provider>
      );
    }

    render(<MockTest />);

    expect(screen.getByText('no error span')).toBeInTheDocument();
    expect(screen.queryByText('fallback')).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByText('fallback')).toBeInTheDocument();
    expect(screen.queryByText('no error span')).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('Toggle'));

    expect(screen.getByText('no error span')).toBeInTheDocument();
    expect(screen.queryByText('fallback')).not.toBeInTheDocument();

    console.error.mockRestore();
  });
});
