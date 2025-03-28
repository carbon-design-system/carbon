/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useRef, type MutableRefObject } from 'react';

export const useEvent = <E extends keyof GlobalEventHandlersEventMap>(
  elementOrRef: HTMLElement | MutableRefObject<HTMLElement | null>,
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
    const handler = (event: GlobalEventHandlersEventMap[E]) => {
      if (savedCallback.current) {
        savedCallback.current(event);
      }
    };

    const element =
      'current' in elementOrRef ? elementOrRef.current : elementOrRef;
    element?.addEventListener(eventName, handler);

    return () => {
      element?.removeEventListener(eventName, handler);
    };
  }, [elementOrRef, eventName]);
};

export const useWindowEvent = <E extends keyof WindowEventMap>(
  eventName: E,
  callback: (event: WindowEventMap[E]) => void
) => {
  const savedCallback = useRef<((event: WindowEventMap[E]) => void) | null>(
    null
  );

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (event: WindowEventMap[E]) => {
      if (savedCallback.current) {
        savedCallback.current(event);
      }
    };

    window.addEventListener(eventName, handler);

    return () => {
      window.removeEventListener(eventName, handler);
    };
  }, [eventName]);
};
