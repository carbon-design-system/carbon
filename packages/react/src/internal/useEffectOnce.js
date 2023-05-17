/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useRef } from 'react';

/**
 * A custom hook which will call the given callback exactly once when your
 * component is initially rendered and effects are first called
 *
 * @param {Function} callback
 */
export function useEffectOnce(callback) {
  const savedCallback = useRef(callback);
  const effectGuard = useRef(false);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (effectGuard.current !== true) {
      effectGuard.current = true;
      savedCallback.current();
    }
  }, []);
}
