/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState, useEffect } from 'react';
import { canUseDOM } from './environment';

export function useMatchMedia(mediaQueryString) {
  const [matches, setMatches] = useState(() => {
    if (canUseDOM) {
      const mql = window.matchMedia(mediaQueryString);
      return mql.matches;
    }
    return false;
  });

  useEffect(() => {
    function listener() {
      setMatches(mediaQueryList.matches);
    }

    const mediaQueryList = window.matchMedia(mediaQueryString);
    mediaQueryList.addEventListener('change', listener);

    // make sure media query list and matches state are synced
    setMatches(mediaQueryList.matches);

    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, [mediaQueryString]);

  return matches;
}
