/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, cleanup } from '@carbon/test-utils/react';
import React, { useState } from 'react';
import { ErrorBoundary, ErrorBoundaryContext } from '../';

describe('ErrorBoundary', () => {
  afterEach(cleanup);

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

    const component = container.querySelector('[data-test-id="mock"]');
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

    const component = container.querySelector('[data-test-id="mock"]');
    const fallback = container.querySelector('[data-test-id="fallback"]');

    expect(component).toBe(null);
    expect(fallback).toBeDefined();
    expect(console.error).toHaveBeenCalled();
    expect(log).toHaveBeenCalled();

    console.error.mockRestore();
  });

  it('should reset from fallback if children have changed', () => {
    console.error = jest.spyOn(console, 'error').mockImplementation(() => {});

    let content = null;
    let fallback = null;
    let button = null;

    function ThrowError({ shouldThrowError }) {
      if (shouldThrowError) {
        throw new Error('test error');
      }
      return <span ref={element => (content = element)}>mock</span>;
    }

    function MockFallback() {
      return <span ref={element => (fallback = element)}>mock</span>;
    }

    function MockTest() {
      const [shouldThrow, setShouldThrow] = useState(false);

      function onClick() {
        setShouldThrow(!shouldThrow);
      }

      return (
        <ErrorBoundaryContext.Provider value={{ log: jest.fn() }}>
          <button ref={element => (button = element)} onClick={onClick}>
            Toggle
          </button>
          <ErrorBoundary fallback={<MockFallback />}>
            <ThrowError shouldThrowError={shouldThrow} />
          </ErrorBoundary>
        </ErrorBoundaryContext.Provider>
      );
    }

    render(<MockTest />);

    expect(content).toBeDefined();
    expect(fallback).toBe(null);

    button.click();

    expect(content).toBe(null);
    expect(fallback).toBeDefined();

    button.click();

    expect(content).toBeDefined();
    expect(fallback).toBe(null);

    console.error.mockRestore();
  });
});
