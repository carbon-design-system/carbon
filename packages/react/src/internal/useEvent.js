/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useRef } from 'react';

export function useEvent(elementOrRef, eventName, callback) {
  const savedCallback = useRef(null);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function handler(event) {
      if (savedCallback.current) {
        savedCallback.current(event);
      }
    }

    const element = elementOrRef.current ?? elementOrRef;
    element.addEventListener(eventName, handler);

    return () => {
      element.removeEventListener(eventName, handler);
    };
  }, [elementOrRef, eventName]);
}

export function useWindowEvent(eventName, callback) {
  const savedCallback = useRef(null);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function handler(event) {
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
