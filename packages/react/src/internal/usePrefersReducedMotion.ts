/**
 * Copyright IBM Corp. 2021, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useMatchMedia } from './useMatchMedia';

/**
 * Returns `true` when the user has requested reduced motion via the
 * `prefers-reduced-motion: reduce` media query.
 */
export const usePrefersReducedMotion = (): boolean =>
  useMatchMedia('(prefers-reduced-motion: reduce)');
