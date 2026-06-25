/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState, RefObject } from 'react';

/**
 * Used as a replacement for AnimatePresence from framer-motion,
 * this hook will return a boolean value to let the component
 * calling this hook to know whether it should render or not.
 * This solves a pain point around handling unmounting of components
 * in React that should also include an exit animation.
 *
 * @param open The open value to the component using this hook
 * @param ref The ref to the element that contains the animation this hook will be listening for
 * @param animationName The animation that will be listened for, if event.animationName equals the 
 * animationName value provided it means that the exit animation has completed and shouldRender
 * should be updated to false. If a separate animation is used for reduced motion cases, it should
 * be conditionally passed as the `animationName`.
 * @returns A boolean value so the component using this hook knows when it should render it's contents
 * 
 * @example
 * ```typescript
 * const exitAnimationName = shouldReduceMotion
    ? 'reduced-animation-name'
    : 'standard-animation-name';
 * const { shouldRender } = usePresence(open, componentRef, exitAnimationName);
 * ```
 */
export function usePresence(
  open: boolean,
  ref: RefObject<HTMLElement>,
  animationName: string
) {
  const [shouldRender, setShouldRender] = useState(open);
  useEffect(() => {
    const handleAnimationEnd = (event: AnimationEvent) => {
      if (!open && event.animationName === animationName) {
        setShouldRender(false);
      }
    };
    if (open) {
      setShouldRender(true);
    }
    if (ref?.current) {
      ref?.current.addEventListener('animationend', handleAnimationEnd);
    }

    const animatedRef = ref?.current;
    return () => {
      if (animatedRef) {
        animatedRef.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, [open, setShouldRender, ref, animationName]);
  return { shouldRender };
}
