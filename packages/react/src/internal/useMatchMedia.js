/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState, useEffect } from 'react';
import { canUseDOM } from './environment';

export function useMatchMedia(mediaQueryString) {
  const [matches, setMatches] = useState(() => {
    if (canUseDOM) {
      const mediaQueryList = window.matchMedia(mediaQueryString);
      return mediaQueryList.matches;
    }
    return false;
  });

  useEffect(() => {
    function listener(event) {
      setMatches(event.matches);
    }

    const mediaQueryList = window.matchMedia(mediaQueryString);
    // Support fallback to `addListener` for broader browser support
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', listener);
    } else {
      mediaQueryList.addListener(listener);
    }

    // Make sure the media query list is in sync with the matches state
    setMatches(mediaQueryList.matches);

    return () => {
      if (mediaQueryList.addEventListener) {
        mediaQueryList.removeEventListener('change', listener);
      } else {
        mediaQueryList.removeListener(listener);
      }
    };
  }, [mediaQueryString]);

  return matches;
}
