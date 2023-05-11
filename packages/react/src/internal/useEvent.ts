/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { type MutableRefObject, useEffect, useRef } from 'react';

type EventCallback = (event: Event) => void;

export function useEvent(
  elementOrRef: HTMLElement | MutableRefObject<HTMLElement | null>,
  eventName: keyof GlobalEventHandlersEventMap,
  callback: EventCallback
) {
  const savedCallback = useRef<EventCallback | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler: EventCallback = (event) => {
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
}

export function useWindowEvent(
  eventName: keyof WindowEventMap,
  callback: EventCallback
) {
  const savedCallback = useRef<EventCallback | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function handler(event: Event) {
      if (savedCallback.current) {
        savedCallback.current(event);
      }
    }

    window.addEventListener(eventName, handler);

    return () => {
      window.removeEventListener(eventName, handler);
    };
  }, [eventName]);
}
