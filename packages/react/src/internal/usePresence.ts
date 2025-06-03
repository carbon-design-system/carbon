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

  return [isOpen || exitState !== 'finished', isExiting] as const;
};
