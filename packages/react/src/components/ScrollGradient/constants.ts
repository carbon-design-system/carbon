/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';

export const ScrollStates = {
  // No scrolling required because content fits within container.
  NONE: 'NONE',
  // Scroll position is at the start of the scrollable content.
  INITIAL: 'INITIAL',
  // Scroll position is neither at start nor end of scrollable content.
  STARTED: 'STARTED',
  // Scroll position is at the end of the scrollable content.
  END: 'END',
} as const;

export type ScrollState = (typeof ScrollStates)[keyof typeof ScrollStates];

export function useIsOverflow(ref: React.RefObject<HTMLDivElement | null>): {
  xScrollable: boolean | undefined;
  yScrollable: boolean | undefined;
} {
  const [isHorizontallyScrollable, setIsHorizontallyScrollable] =
    useState<boolean>(false);
  const [isVerticallyScrollable, setIsVerticallyScrollable] =
    useState<boolean>(false);
  const mutationObserverRef = useRef<MutationObserver | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const checkOverflow = useCallback(() => {
    if (!ref.current) {
      return;
    }
    setIsHorizontallyScrollable(
      ref.current.scrollWidth > ref.current.clientWidth
    );
    setIsVerticallyScrollable(
      ref.current.scrollHeight > ref.current.clientHeight
    );
  }, [ref]);

  useEffect(() => {
    return () => {
      mutationObserverRef.current?.disconnect();
      resizeObserverRef.current?.disconnect();
    };
  }, []);

  useIsomorphicEffect(() => {
    const { current } = ref;
    if (current) {
      if ('ResizeObserver' in window && !resizeObserverRef.current) {
        resizeObserverRef.current = new ResizeObserver(checkOverflow);
        resizeObserverRef.current.observe(current);
      }
      if ('MutationObserver' in window && !mutationObserverRef.current) {
        mutationObserverRef.current = new MutationObserver(checkOverflow);
        mutationObserverRef.current.observe(current, {
          attributes: false,
          childList: true,
          subtree: false,
        });
      }
      checkOverflow();
    }
  }, [ref, checkOverflow]);

  return {
    xScrollable: isHorizontallyScrollable,
    yScrollable: isVerticallyScrollable,
  };
}
