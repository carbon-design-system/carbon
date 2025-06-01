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

  const isAnimating = isExiting;
  useIsomorphicEffect(() => {
    if (!ref.current || !isAnimating) return;
    if (!('getAnimations' in ref.current)) {
      handleAnimationEnd();
      return;
    }

    const animations = ref.current.getAnimations();
    if (!animations) {
      handleAnimationEnd();
      return;
    }

    try {
      Promise.all(animations.map((animation) => animation.finished)).then(
        handleAnimationEnd
      );
    } catch {}
  }, [isAnimating, handleAnimationEnd]);

  return [isOpen || exitState !== 'finished', isExiting] as const;
};
