/**
 * Copyright IBM Corp. 2021, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { RefObject, useCallback } from 'react';
import { tabbable } from 'tabbable';

/**
 * Returns the first element matching `selector` within `container`, or null.
TO DO: This hook will be removed https://github.com/carbon-design-system/ibm-products/issues/7731 
*/
export const getSpecificElement = (
  container: HTMLElement | null,
  selector: string
): HTMLElement | null => {
  if (!container || !selector) return null;
  return container.querySelector<HTMLElement>(selector);
};

/**
 * Provides focus-trap helpers for a panel/modal container.
 *
 * - `firstElement` – the first tabbable element inside the container.
 * - `keyDownListener` – an `onKeyDown` handler that cycles focus between the
 *   first and last tabbable elements (Tab / Shift+Tab wrap-around).
 */
export const useFocus = (ref: RefObject<HTMLElement | null>) => {
  const getTabbable = useCallback((): HTMLElement[] => {
    if (!ref.current) return [];
    return tabbable(ref.current, { displayCheck: 'none' }) as HTMLElement[];
  }, [ref]);

  const firstElement = ref.current ? (getTabbable()[0] ?? null) : null;

  const keyDownListener = useCallback(
    (event: React.KeyboardEvent | KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const elements = getTabbable();
      if (!elements.length) return;

      const first = elements[0];
      const last = elements[elements.length - 1];
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    },
    [getTabbable]
  );

  return { firstElement, keyDownListener };
};
