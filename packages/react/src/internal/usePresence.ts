/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { RefObject, useCallback, useState } from 'react';
import useIsomorphicEffect from './useIsomorphicEffect';

export const usePresence = (
  ref: RefObject<HTMLElement | null>,
  isOpen: boolean
) => {
  const [exitState, setExitState] = useState<'idle' | 'active' | 'finished'>(
    isOpen ? 'idle' : 'finished'
  );
  const isExiting = exitState === 'active';

  if (!isOpen && exitState === 'idle') {
    setExitState('active');
  }
  if (isOpen && exitState !== 'idle') {
    setExitState('idle');
  }

  const handleAnimationEnd = useCallback(() => {
    setExitState('finished');
  }, []);

  useIsomorphicEffect(() => {
    if (!ref.current || !isExiting) return;
    if (!('getAnimations' in ref.current)) {
      handleAnimationEnd();
      return;
    }

    const animations = ref.current.getAnimations();
    if (!animations.length) {
      handleAnimationEnd();
      return;
    }

    try {
      Promise.all(animations.map((animation) => animation.finished)).then(
        handleAnimationEnd
      );
    } catch {}
  }, [isExiting, handleAnimationEnd]);

  return {
    isPresent: isOpen || exitState !== 'finished',
    isExiting,
  };
};
