/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState, useEffect } from 'react';

/**
 * Listens to changes in a media query and returns whether it matches.
 * @param mediaQuery - The media query to listen to. For example, `(min-width: 600px)`.
 * @param defaultState - The initial state to return before the media query is evaluated. Defaults to `false`.
 * @returns Whether the media query matches.
 */
export const useMatchMedia = (mediaQuery: string, defaultState = false) => {
  const [matches, setMatches] = useState(defaultState);

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
