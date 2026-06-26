/**
 * Copyright IBM Corp. 2016, 2026
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

  useWindowEvent('click', (event) => {
    if (!canUseDOM) return;

    const { target } = event;

    if (
      target instanceof Node &&
      ref.current &&
      !ref.current.contains(target)
    ) {
      savedCallback.current(event);
    }
  });
};
