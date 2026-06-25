/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useRef } from 'react';
import { useIsomorphicEffect } from '../../../global/js/hooks';
import { COACHMARK_OVERLAY_KIND } from './enums';

/**
 * Detects when a user clicks outside of the element
 * @param {object} coachmarkRef - The ref to the React element for the Coachmark to detect when the user clicks outside of its bounds.
 * @param {object} overlayRef - The ref to the React element for the CoachmarkOverlay to detect when the user clicks outside of its bounds.
 * @param {string} overlayKind - The overlayKind prop from the Coachmark. @see COACHMARK_OVERLAY_KIND
 * @param {Function} callback The callback to call when the user mouses down.
 */

function useClickOutsideElement(
  coachmarkRef,
  overlayRef,
  overlayKind,
  callback
) {
  const cb = useRef(undefined);
  const isTooltip = overlayKind === COACHMARK_OVERLAY_KIND.TOOLTIP;
  useIsomorphicEffect(() => {
    cb.current = callback;
  }, [callback]);
  useIsomorphicEffect(() => {
    function handleClickOutside(event) {
      const isOverlayOutside =
        overlayRef.current && !overlayRef.current.contains(event.target);
      const isOutsideCoachmark =
        coachmarkRef.current && !coachmarkRef.current.contains(event.target);
      if (isOverlayOutside && isOutsideCoachmark) {
        callCallback();
      }
    }

    function callCallback() {
      if (isTooltip) {
        cb.current();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [coachmarkRef, overlayRef, isTooltip]);
}

const useWindowEvent = (eventName, callback) => {
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
};

export { useClickOutsideElement, useWindowEvent };
