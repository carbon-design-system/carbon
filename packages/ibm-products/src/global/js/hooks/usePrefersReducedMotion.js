/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// safety checks for remix env
// https://remix.run/docs/en/main/guides/gotchas#typeof-window-checks

import { useState } from 'react';
import { useIsomorphicEffect } from './useIsomorphicEffect';

export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useIsomorphicEffect(() => {
    const mediaQueryList = window.matchMedia(
      '(prefers-reduced-motion: no-preference)'
    );
    const { matches } = window.matchMedia(
      '(prefers-reduced-motion: no-preference)'
    );
    setPrefersReducedMotion(!matches);
    const listener = (event) => {
      setPrefersReducedMotion(!event.matches);
    };
    mediaQueryList.addEventListener('change', listener);
    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, []);

  return prefersReducedMotion;
};
