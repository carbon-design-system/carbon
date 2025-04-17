/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useRef, type RefObject } from 'react';
import { canUseDOM } from './environment';
import { useWindowEvent } from './useEvent';

export const useOutsideClick = <T extends HTMLElement | null>(
  ref: RefObject<T>,
  callback: (event: MouseEvent) => void
) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // We conditionally guard the `useEvent` hook for SSR. `canUseDOM` can be
  // treated as a constant as it will be false when executed in a Node.js
  // environment and true when executed in the browser
  if (canUseDOM) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useWindowEvent('click', (event) => {
      const { target } = event;

      if (
        target instanceof Node &&
        ref.current &&
        !ref.current.contains(target)
      ) {
        savedCallback.current(event);
      }
    });
  }
};
