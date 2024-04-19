/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect, useState } from 'react';

const windowExists = typeof window !== `undefined`;

export const usePrefersDarkScheme = () => {
  const [prefersDark, setPrefersDark] = useState(false);

  const handleMatchMediaChange = (matchMedia) => {
    setPrefersDark(matchMedia.matches);
  };

  useEffect(() => {
    if (windowExists) {
      const prefersDarkMatchMedia = window.matchMedia(
        '(prefers-color-scheme: dark)'
      );
      prefersDarkMatchMedia.addEventListener('change', handleMatchMediaChange);

      setPrefersDark(prefersDarkMatchMedia.matches);

      return () =>
        prefersDarkMatchMedia.removeEventListener(
          'change',
          handleMatchMediaChange
        );
    }
  }, []);

  return prefersDark;
};
