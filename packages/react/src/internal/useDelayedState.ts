/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

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

export type DispatchWithDelay<A> = (value: A, delayMS?: number) => void;

export function useDelayedState<S>(
  initialState: S
): [S, DispatchWithDelay<SetStateAction<S>>] {
  const [state, setState] = useState<S>(initialState);
  const timeoutId = useRef<number | null>(null);
  // We use `useCallback` to match the signature of React's `useState` which will
  // always return the same reference for the `setState` updater
  const setStateWithDelay = useCallback((stateToSet, delayMs = 0) => {
    window.clearTimeout(timeoutId.current ?? undefined);
    timeoutId.current = null;

    if (delayMs === 0) {
      setState(stateToSet);
      return;
    }

    timeoutId.current = window.setTimeout(() => {
      setState(stateToSet);
      timeoutId.current = null;
    }, delayMs);
  }, []);

  useEffect(() => {
    return () => {
      window.clearTimeout(timeoutId.current ?? undefined);
    };
  }, []);

  return [state, setStateWithDelay];
}
