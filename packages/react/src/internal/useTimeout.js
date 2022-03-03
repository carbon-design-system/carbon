/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useCallback, useEffect, useRef } from 'react';

/**
 * `useTimeout` provides a single function: `timeout` that allows you to
 * schedule code to run at a later point in time without worrying about cleaning
 * up code if your component unmounts.
 *
 * @example
 * function CustomComponent() {
 *   const timeout = useTimeout();
 *
 *   function onClick() {
 *     timeout(() => {
 *       console.log('Callback has been called');
 *     }, 250);
 *   }
 *
 *   return (
 *     <button type="button" onClick={onClick}>
 *       Content
 *     </button>
 *   );
 * }
 *
 * @returns {Function}
 */
export function useTimeout() {
  const timeoutId = useRef(null);
  const timeout = useCallback((callback, timeoutMs) => {
    timeoutId.current = setTimeout(() => {
      callback();
      timeoutId.current = null;
    }, timeoutMs);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  return [timeout];
}
