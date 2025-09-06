/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useCallback, useEffect, useRef } from 'react';

/**
 * Returns a stable callback reference that always points to the latest version
 * of a callback. This is useful when you want to avoid including the callback
 * in dependency arrays while still ensuring the latest callback implementation
 * is used.
 *
 * @param callback - The callback to track.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
export const useSavedCallback = <T extends (...args: any[]) => any>(
  callback: T | undefined
) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  return useCallback(
    (...args: Parameters<T>): ReturnType<T> | undefined =>
      savedCallback.current ? savedCallback.current(...args) : undefined,
    []
  );
};
