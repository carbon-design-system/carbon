/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState, useEffect } from 'react';
import { canUseDOM } from './environment';

/** Listens to changes in a media query and returns whether it matches. */
export const useMatchMedia = (mediaQuery: string) => {
  const [matches, setMatches] = useState(() => {
    if (canUseDOM) {
      const mediaQueryList = window.matchMedia(mediaQuery);
      return mediaQueryList.matches;
    }
    return false;
  });

  useEffect(() => {
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    const mediaQueryList = window.matchMedia(mediaQuery);

    mediaQueryList.addEventListener('change', listener);

    setMatches(mediaQueryList.matches);

    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, [mediaQuery]);

  return matches;
};
