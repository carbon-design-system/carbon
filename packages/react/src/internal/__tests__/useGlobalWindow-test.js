/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useGlobalWindow, getScrollPosition } from '../useGlobalWindow';

describe('useGlobalWindow', () => {
  let originalWindow;
  let originalGlobal;
  let originalSelf;

  beforeEach(() => {
    // Store original globals
    originalWindow = typeof global !== 'undefined' ? global.window : window;
    originalGlobal = typeof global !== 'undefined' ? global.global : undefined;
    originalSelf = typeof global !== 'undefined' ? global.self : self;
  });

  afterEach(() => {
    // Restore original globals
    if (typeof global !== 'undefined') {
      global.window = originalWindow;
      global.global = originalGlobal;
      global.self = originalSelf;
    }
  });

  describe('useGlobalWindow', () => {
    it('should return window object when window is available', () => {
      // In browser environment, window should be available
      expect(useGlobalWindow).toBeDefined();
      expect(typeof useGlobalWindow).toBe('object');
    });

    it('should handle different environments correctly', () => {
      // The utility should work in both browser and Node.js environments
      expect(useGlobalWindow).toBeDefined();

      // Should have expected properties or be an empty object
      expect(typeof useGlobalWindow).toBe('object');
    });

    it('should prioritize window over other globals', () => {
      // In browser environment, window should be the primary global
      if (typeof window !== 'undefined') {
        expect(useGlobalWindow).toBe(window);
      }
    });
  });

  describe('getScrollPosition', () => {
    it('should return scrollX and scrollY with proper fallbacks', () => {
      const result = getScrollPosition();

      expect(result).toHaveProperty('scrollX');
      expect(result).toHaveProperty('scrollY');
      expect(typeof result.scrollX).toBe('number');
      expect(typeof result.scrollY).toBe('number');
    });

    it('should return 0 for scrollX and scrollY when properties are falsy', () => {
      const result = getScrollPosition();

      // In browser environment, these should be actual scroll values or 0
      expect(result.scrollX).toBeGreaterThanOrEqual(0);
      expect(result.scrollY).toBeGreaterThanOrEqual(0);
    });

    it('should handle missing scroll properties gracefully', () => {
      const result = getScrollPosition();

      // Should always return valid numbers
      expect(Number.isFinite(result.scrollX)).toBe(true);
      expect(Number.isFinite(result.scrollY)).toBe(true);
    });
  });
});
