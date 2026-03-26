/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState, type RefObject } from 'react';
import { usePrefix } from './usePrefix';
import useIsomorphicEffect from './useIsomorphicEffect';

export const usePresence = (
  ref: RefObject<HTMLElement | null>,
  isOpen: boolean
) => {
  const prefix = usePrefix();
  const [exitState, setExitState] = useState<'idle' | 'active' | 'finished'>(
    isOpen ? 'idle' : 'finished'
  );

  const isExiting = exitState === 'active';

  useIsomorphicEffect(() => {
    setExitState((prev) => {
      // element is exiting
      if (!isOpen && prev === 'idle') return 'active';

      // element exit was interrupted
      if (isOpen && prev !== 'idle') return 'idle';

      return prev;
    });
  }, [isOpen]);

  useIsomorphicEffect(() => {
    if (!ref.current || !isExiting) return;

    // resolve for JSDOM
    if (!('getAnimations' in ref.current)) {
      setExitState('finished');
      return;
    }

    // cover all animations that start with the presence prefix
    const animations = ref.current
      .getAnimations({ subtree: true })
      .filter(
        (animation) =>
          animation instanceof CSSAnimation &&
          animation.animationName.startsWith(`${prefix}--presence`)
      );

    if (!animations.length) {
      setExitState('finished');
      return;
    }

    let cancelled = false;

    Promise.all(animations.map((animation) => animation.finished)).finally(
      () => {
        if (cancelled) return;
        setExitState('finished');
      }
    );

    return () => {
      cancelled = true;
    };
  }, [ref, isExiting, prefix]);

  return {
    /**
     * Indicates whether the ref object is supposed to be mounted
     */
    isPresent: isOpen || exitState !== 'finished',

    /**
     * Indicates whether the ref object is currently exiting
     */
    isExiting,
  };
};
