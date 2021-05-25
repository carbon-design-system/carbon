/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * `useDelayedState` mirrors `useState` but also allows you to add a delay to
 * when your state updates. You can provide a second argument to `setState`,
 * `delayMs`, which will be the time in milliseconds after which the state is
 * updated.
 *
 * This hook will clean up pending timers in `useEffect` and will cancel any
 * pending timers when a `setState` is called before the state is updated from
 * a previous call
 */
export function useDelayedState(initialState) {
  const [state, setState] = useState(initialState);
  const timeoutId = useRef(null);
  // We use `useCallback` to match the signature of React's `useState` which will
  // always return the same reference for the `setState` updater
  const setStateWithDelay = useCallback((stateToSet, delayMs = 0) => {
    clearTimeout(timeoutId.current);
    timeoutId.current = null;

    if (delayMs === 0) {
      setState(stateToSet);
      return;
    }

    timeoutId.current = setTimeout(() => {
      setState(stateToSet);
      timeoutId.current = null;
    }, delayMs);
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId.current);
    };
  }, []);

  return [state, setStateWithDelay];
}
