/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useCallback, useEffect, useRef } from 'react';

/**
 * Provide a stable reference for a callback that is passed as a prop to a
 * component. This is helpful when you want access to the latest version of a
 * callback prop but don't want it to be added to the dependency array of an
 * effect.
 *
 * @param {Function} callback
 * @returns {Function}
 */
export function useSavedCallback(callback) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  });

  return useCallback(() => {
    if (savedCallback.current) {
      return savedCallback.current();
    }
  }, []);
}
