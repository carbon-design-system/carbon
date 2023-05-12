// @ts-check
/* eslint-disable jsdoc/check-tag-names */
/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useRef } from 'react';

/**
 * @typedef {(event: Event) => void} EventCallback
 */

/**
 * @template T
 * @typedef {import('react').MutableRefObject<T>} MutableRefObject<T>
 */

/**
 * @param {HTMLElement | MutableRefObject<HTMLElement | null>} elementOrRef
 * @param {keyof GlobalEventHandlersEventMap} eventName
 * @param {EventCallback} callback
 */
export function useEvent(elementOrRef, eventName, callback) {
  /**
   * @type {MutableRefObject<EventCallback | null>}
   */
  const savedCallback = useRef(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    /**
     * @type {EventCallback}
     */
    const handler = (event) => {
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

/**
 * @param {keyof WindowEventMap} eventName
 * @param {EventCallback} callback
 */
export function useWindowEvent(eventName, callback) {
  /**
   * @type {MutableRefObject<EventCallback | null>}
   */
  const savedCallback = useRef(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    /**
     * @type {EventCallback}
     */
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
