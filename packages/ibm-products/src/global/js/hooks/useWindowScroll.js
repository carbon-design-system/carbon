/**
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useRef } from 'react';
import { useIsomorphicEffect } from './useIsomorphicEffect';
import { scrollableAncestor } from '../utils/scrollableAncestor';

const windowExists = typeof window !== `undefined`;

const useTargetScroll = function (target, effect, deps, throttleInterval) {
  const scrollPosition = useRef({});
  const throttleTimeout = useRef(null);

  const getScrollPosition = () => {
    if (!target || (!windowExists && target === window)) {
      return { scrollX: -1, scrollY: -1 };
    } //

    let scrollX, scrollY;

    if (target === window) {
      scrollX = window.scrollX;
      scrollY = window.scrollY;
    } else {
      scrollX = target.scrollLeft;
      scrollY = target.scrollTop;
    }

    return { scrollX, scrollY };
  };

  const doGetScrollPosition = () => {
    const newVal = {
      previous: scrollPosition.current,
      current: getScrollPosition(),
    };

    // call effect
    effect(newVal);

    scrollPosition.current = newVal.current;
    throttleTimeout.current = null;
  };

  useIsomorphicEffect(() => {
    const handleScroll = () => {
      if (throttleInterval) {
        if (throttleTimeout.current === null) {
          throttleTimeout.current = setTimeout(
            doGetScrollPosition,
            throttleInterval
          );
        }
      } else {
        doGetScrollPosition();
      }
    };

    if (target) {
      target.addEventListener('scroll', handleScroll);
      doGetScrollPosition();
    }

    return () => target && target.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export function useWindowScroll(effect, deps, throttleInterval = 0) {
  return useTargetScroll(window, effect, deps, throttleInterval);
}

export function useNearestScroll(ref, effect, deps, throttle = 0) {
  let scrollableTarget = scrollableAncestor(ref.current);
  if (
    scrollableTarget &&
    (document.body === scrollableTarget ||
      scrollableTarget.contains(document.body))
  ) {
    scrollableTarget = window;
  }
  return useTargetScroll(scrollableTarget, effect, deps, throttle);
}

export function useScroll(ref, effect, deps, throttle = 0) {
  return useTargetScroll(ref?.current ?? null, effect, deps, throttle);
}
