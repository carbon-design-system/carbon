/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEventListener } from './useEventListener';
import { useForceUpdate } from './useForceUpdate';
import { usePassive } from './usePassive';

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

/**
 * Helper hook that will force an update for any window event that occurs. We
 * force the update so that the calling hook can return values from `window`
 * directly.
 *
 * @param {string} name - the name of the window event
 * @param {object?} options - optional options for the event listener
 */
function useWindowEvent(name, options) {
  const forceUpdate = useForceUpdate();
  useEventListener(window, name, forceUpdate, options);
}

/**
 * Provides `window.{scrollX,scrollY}` values that are guaranteed to be
 * up-to-date whenever the browser is scrolled
 */
export function useWindowScroll() {
  const supportsPassive = usePassive();
  const options = supportsPassive ? { passive: true } : undefined;
  useWindowEvent('scroll', options);

  if (canUseDOM) {
    return {
      scrollX: window.scrollX,
      scrollY: window.scrollY,
    };
  }

  return {};
}

/**
 * Provides window width and height values that are guaranteed to be
 * up-to-date whenever the browser is resized
 */
export function useWindowResize() {
  const supportsPassive = usePassive();
  const options = supportsPassive ? { passive: true } : undefined;
  useWindowEvent('resize', options);

  if (canUseDOM) {
    return {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      outerWidth: window.outerWidth,
      outerHeight: window.outerHeight,
    };
  }

  return {};
}
