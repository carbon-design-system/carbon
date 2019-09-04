/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useRef } from 'react';
import { useForceUpdate } from './useForceUpdate';

let shouldUsePassive = null;

export function isPassiveSupported() {
  if (shouldUsePassive !== null) {
    return shouldUsePassive;
  }

  try {
    // Test via a getter in the options object to see if the passive property is accessed
    var opts = Object.defineProperty({}, 'passive', {
      // eslint-disable-next-line getter-return
      get: function() {
        shouldUsePassive = true;
      },
    });
    window.addEventListener('testPassive', null, opts);
    window.removeEventListener('testPassive', null, opts);
  } catch {
    shouldUsePassive = false;
  }

  return shouldUsePassive;
}

/**
 * Retrieves information about the current environment and if it supports
 * passive event listeners.
 *
 * @example
 * function MyComponent() {
 *   const passiveIsSupported = usePassive();
 *   ...
 * }
 */
export function usePassive() {
  const passive = useRef(shouldUsePassive);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    if (passive.current === null) {
      passive.current = isPassiveSupported();
      forceUpdate();
    }
  }, [forceUpdate]);

  return passive.current;
}
