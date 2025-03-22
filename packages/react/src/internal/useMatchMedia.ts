/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState, useEffect } from 'react';
import { canUseDOM } from './environment';

// TODO: When can support for `addListener` be removed?
/**
 * Listens to changes in a media query's evaluation.
 *
 * This hook handles both the modern `addEventListener` method and the legacy
 * `addListener` method for attaching event listeners, ensuring compatibility
 * with many browsers.
 */
export const useMatchMedia = (mediaQuery: string) => {
  const [matches, setMatches] = useState(() => {
    if (canUseDOM) {
      const mediaQueryList = window.matchMedia(mediaQuery);
      return mediaQueryList.matches;
    }
    return false;
  });

  useEffect(() => {
    const listener = (event: MediaQueryListEvent | MediaQueryList) => {
      setMatches(event.matches);
    };

    const mediaQueryList = window.matchMedia(mediaQuery);

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', listener);
    } else {
      mediaQueryList.addListener(listener);
    }

    setMatches(mediaQueryList.matches);

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', listener);
      } else {
        mediaQueryList.removeListener(listener);
      }
    };
  }, [mediaQuery]);

  return matches;
};
