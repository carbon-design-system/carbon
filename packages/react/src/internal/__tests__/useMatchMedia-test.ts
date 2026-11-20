/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { renderHook } from '@testing-library/react';
import { act } from 'react';

import { useMatchMedia } from '../useMatchMedia';

const MIN_WIDTH_REGEX = /\(min-width: (\d+)px\)/;

describe('useMatchMedia', () => {
  const originalMatchMedia = window.matchMedia;
  let Browser: { width: number; setDimensions: (width: number) => void };
  let listeners: Set<{
    eventType: string;
    listener: (event: { matches: boolean }) => void;
    match: () => boolean;
  }>;

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

    const mockMatchMedia = jest.fn((query: string) => {
      const rawWidth = query.match(MIN_WIDTH_REGEX)?.[1];

      if (typeof rawWidth === 'undefined') {
        throw new Error(`Unexpected media query: ${query}`);
      }

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
        addEventListener: (
          eventType: string,
          listener: (event: { matches: boolean }) => void
        ) => {
          listeners.add({
            eventType,
            listener,
            match,
          });
        },
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };
    });
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    });
  });

  afterEach(() => {
    listeners.clear();
    Object.defineProperty(window, 'matchMedia', {
      value: originalMatchMedia,
    });
  });

  it('should return true if mediaQueryList matches', () => {
    Browser.setDimensions(768);

    const { result } = renderHook(() => useMatchMedia('(min-width: 768px)'));
    expect(result.current).toBe(true);
  });

  it('should keep state in sync when mediaQueryString is changed', () => {
    Browser.setDimensions(768);

    const { result, rerender } = renderHook(
      ({ query }) => useMatchMedia(query),
      { initialProps: { query: '(min-width: 768px)' } }
    );
    expect(result.current).toBe(true);

    rerender({ query: '(min-width: 900px)' });
    expect(result.current).toBe(false);
  });

  it('should update the match value if the query no longer applies', () => {
    Browser.setDimensions(640);

    const { result } = renderHook(() => useMatchMedia('(min-width: 640px)'));
    expect(result.current).toBe(true);

    act(() => {
      Browser.setDimensions(320);
    });

    expect(result.current).toBe(false);
  });
});
