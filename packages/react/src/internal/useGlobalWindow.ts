/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Get the global window object safely for SSR compatibility.
 * This utility provides access to the global object across different environments:
 * - Browser: returns `window`
 * - Node.js: returns `global`
 * - Web Workers: returns `self`
 * - Fallback: returns empty object
 */
export const useGlobalWindow = (() => {
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  if (typeof self !== 'undefined') return self;
  return {} as Window;
})();

/**
 * Get scroll position safely with fallbacks for non-browser environments.
 * Returns 0 for scrollX/scrollY in SSR environments where these properties don't exist.
 */
export const getScrollPosition = () => ({
  scrollX: (useGlobalWindow as any).scrollX || 0,
  scrollY: (useGlobalWindow as any).scrollY || 0,
});
