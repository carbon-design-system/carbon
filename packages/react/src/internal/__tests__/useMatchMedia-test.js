/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { useMatchMedia } from '../useMatchMedia';

function resizeBrowserWidth(width) {}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: query === '(min-width: 768px)' ? true : false,
    media: query,
    onchange: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('useMatchMedia', () => {
  afterEach(cleanup);

  it('should return true if mediaQueryList matches', () => {
    const query = '(min-width: 768px)';
    let matches;
    function Test() {
      matches = useMatchMedia(query);
      return <span>test</span>;
    }
    render(<Test />);
    expect(matches).toBe(true);
  });
  it.only('should update the match value if the query no longer applies', () => {
    let matches = null;

    function TestComponent() {
      matches = useMatchMedia('(min-width: 320px)');
      return null;
    }

    render(<TestComponent />);
    expect(matches).toBe(true);

    resiveBrowserWidth(960);

    expect(matches).toBe(false);
  });
  it('should keep state in sync when mediaQueryString is changed', () => {
    const query1 = '(min-width: 768px)';
    const query2 = '(min-width: 900px)';
    let matches;

    function Test(props) {
      matches = useMatchMedia(props.query);
      return <span>test</span>;
    }

    const { rerender } = render(<Test query={query1} />);
    expect(matches).toBe(true);
    rerender(<Test query={query2} />);
    expect(matches).toBe(false);
  });
});
