/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useRef, RefObject } from 'react';

export const useEvent = <E extends keyof GlobalEventHandlersEventMap>(
  elementOrRef: HTMLElement | RefObject<Element | null>,
  eventName: E,
  callback: (event: GlobalEventHandlersEventMap[E]) => void
) => {
  const savedCallback = useRef<
    ((event: GlobalEventHandlersEventMap[E]) => void) | null
  >(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const element =
      'current' in elementOrRef ? elementOrRef.current : elementOrRef;
    if (!element) {
      return;
    }

    const handler = (event: GlobalEventHandlersEventMap[E]) => {
      if (savedCallback.current) {
        savedCallback.current(event);
      }
    };

    element.addEventListener(eventName, handler as EventListener);

    return () => {
      element.removeEventListener(eventName, handler as EventListener);
    };
  }, [elementOrRef, eventName]);
};
