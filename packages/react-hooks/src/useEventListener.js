/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useRef } from 'react';

/**
 * Given a reference to an HTMLElement, specify an event and callback to invoke
 * whenever the event occurs. Optionally, you can specify options for the event
 * handler.
 *
 * @example
 * function MyComponent() {
 *   useEventListener(window, 'click', () => {
 *     // Window was clicked
 *   });
 * }
 *
 * @param {HTMLElement} element - the element for which the event occurs
 * @param {string} name - the name of the event
 * @param {Function} callback - the callback invoked by the listener
 * @param {object?} options - configuration object for the listener
 */
export function useEventListener(element, name, callback, options) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!element || !element.addEventListener) {
      return;
    }

    function handler(event) {
      if (savedCallback.current) {
        savedCallback.current(event);
      }
    }

    element.addEventListener(name, handler, options);
    return () => {
      element.removeEventListener(name, handler);
    };
  }, [element, name, options]);
}
