/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useLayoutEffect } from 'react';

// Custom hook that uses either `useLayoutEffect` or `useEffect` based on the environment (client-side or server-side).
export const useIsomorphicEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
