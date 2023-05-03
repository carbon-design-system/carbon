/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { useMatchMedia } from '../useMatchMedia';

describe('useMatchMedia', () => {
  let Browser;
  let listeners;

  beforeEach(() => {
    listeners = new Set();
    Browser = {
      width: 640,
      setDimensions(width) {
        Browser.width = width;

        for (const { eventType, listener, match } of listeners) {
          if (eventType === 'change') {
            listener({
              matches: match(),
            });
          }
        }
      },
    };

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => {
        const MIN_WIDTH_REGEX = /\(min-width: (\d+)px\)/;
        const [_match, rawWidth] = query.match(MIN_WIDTH_REGEX);
        const width = parseInt(rawWidth, 10);

        function match() {
          return Browser.width >= width;
        }

        return {
          matches: match(),
          media: query,
          onchange: jest.fn(),
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: (eventType, listener) => {
            listeners.add({
              eventType,
              listener,
              match,
            });
          },
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        };
      }),
    });
  });

  afterEach(() => {
    listeners.clear();
    delete window.matchMedia;
  });

  it('should return true if mediaQueryList matches', () => {
    Browser.setDimensions(768);

    let matches;

    function Test() {
      matches = useMatchMedia('(min-width: 768px)');
      return null;
    }

    render(<Test />);
    expect(matches).toBe(true);
  });

  it('should keep state in sync when mediaQueryString is changed', () => {
    Browser.setDimensions(768);

    let matches;

    function Test(props) {
      matches = useMatchMedia(props.query);
      return null;
    }

    const { rerender } = render(<Test query="(min-width: 768px)" />);
    expect(matches).toBe(true);

    rerender(<Test query="(min-width: 900px)" />);
    expect(matches).toBe(false);
  });

  it('should update the match value if the query no longer applies', () => {
    Browser.setDimensions(640);

    let matches = null;

    function TestComponent() {
      matches = useMatchMedia('(min-width: 640px)');
      return null;
    }

    render(<TestComponent />);
    expect(matches).toBe(true);

    act(() => {
      Browser.setDimensions(320);
    });

    expect(matches).toBe(false);
  });
});
