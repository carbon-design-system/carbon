/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState, useEffect, useCallback } from 'react';
import { useIsomorphicEffect } from '../../global/js/hooks';

export const ScrollStates = {
  // No scrolling required because content fits within container.
  NONE: 'NONE',
  // Scroll position is a the start of the scrollable content.
  INITIAL: 'INITIAL',
  // Scroll position is neither at start or end of scrollable content.
  STARTED: 'STARTED',
  // Scroll position is a the end of the scrollable content.
  END: 'END',
};

// FUNCTIONS

export const useIsOverflow = (ref) => {
  const [isHorizontallyScrollable, setIsHorizontallyScrollable] = useState();
  const [isVerticallyScrollable, setIsVerticallyScrollable] = useState();
  const [mutationObserver, setMutationObserver] = useState();
  const [resizeObserver, setResizeObserver] = useState();

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
    if (!mutationObserver) {
      return;
    }

    return () => {
      if (mutationObserver) {
        mutationObserver.disconnect();
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  });

  useIsomorphicEffect(() => {
    const { current } = ref;
    if (current) {
      if ('ResizeObserver' in window && !resizeObserver) {
        setResizeObserver(new ResizeObserver(checkOverflow).observe(current));
      }
      if ('MutationObserver' in window && !mutationObserver) {
        setMutationObserver(
          new MutationObserver(checkOverflow).observe(current, {
            attributes: false,
            childList: true,
            subtree: false,
          })
        );
      }
      checkOverflow();
    }
  }, [ref, checkOverflow, mutationObserver, resizeObserver]);

  return {
    xScrollable: isHorizontallyScrollable,
    yScrollable: isVerticallyScrollable,
  };
};
