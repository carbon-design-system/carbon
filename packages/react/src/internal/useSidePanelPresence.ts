/**
 * Copyright IBM Corp. 2021, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { RefObject, useState } from 'react';
import useIsomorphicEffect from './useIsomorphicEffect';

/**
 * Controls the presence (mount/unmount) of a panel element, waiting for a
 * named CSS exit animation to finish before removing it from the DOM.
 *
 * Signature mirrors the `usePresence` hook from `@carbon/ibm-products`:
 *   `usePresence(open, ref, exitAnimationName)` → `{ shouldRender }`
 *
 * @param open - Whether the panel is currently open.
 * @param ref - Ref to the panel's root DOM element.
 * @param exitAnimationName - The CSS `animation-name` value used on exit.
 */
export const useSidePanelPresence = (
  open: boolean,
  ref: RefObject<HTMLElement | null>,
  exitAnimationName: string
): { shouldRender: boolean } => {
  const [shouldRender, setShouldRender] = useState(open);

  useIsomorphicEffect(() => {
    if (open) {
      setShouldRender(true);
      return;
    }

    const el = ref.current;
    if (!el) {
      setShouldRender(false);
      return;
    }

    // resolve immediately for JSDOM / environments without getAnimations
    if (!('getAnimations' in el)) {
      setShouldRender(false);
      return;
    }

    // Wait for any running CSS animation whose name matches the exit animation
    const animations = el
      .getAnimations({ subtree: true })
      .filter(
        (animation) =>
          animation instanceof CSSAnimation &&
          animation.animationName === exitAnimationName
      );

    if (!animations.length) {
      setShouldRender(false);
      return;
    }

    let cancelled = false;
    Promise.all(animations.map((a) => a.finished)).finally(() => {
      if (!cancelled) setShouldRender(false);
    });

    return () => {
      cancelled = true;
    };
  }, [open, ref, exitAnimationName]);

  return { shouldRender };
};
