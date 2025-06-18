/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useRef, useState, useLayoutEffect, useEffect, RefObject } from 'react';

export const useResizeObserver = ({
  ref,
  onResize,
}: {
  ref: RefObject<HTMLElement | null>;
  onResize?: (rect: DOMRectReadOnly) => void;
}) => {
  const [width, setWidth] = useState(-1);
  const [height, setHeight] = useState(-1);
  const entriesToHandle = useRef<ResizeObserverEntry[] | null>(null);
  const cb = useRef(onResize);

  useEffect(() => {
    // ref for onResize removes it as dependency from useLayoutEffect
    // This significantly reduces repeated calls if a function is redefined on every
    // render
    cb.current = onResize;
  }, [onResize]);

  useEffect(() => {
    const getInitialSize = () => {
      if (ref.current) {
        const refComputedStyle = window.getComputedStyle(ref.current);

        const initialWidth =
          (ref.current?.offsetWidth ?? 0) -
          (typeof refComputedStyle?.paddingLeft === 'string' &&
          refComputedStyle?.paddingLeft.length
            ? parseFloat(refComputedStyle?.paddingLeft)
            : 0) -
          (typeof refComputedStyle?.paddingRight === 'string' &&
          refComputedStyle?.paddingRight.length
            ? parseFloat(refComputedStyle?.paddingRight)
            : 0);

        const initialHeight =
          (ref.current?.offsetHeight ?? 0) -
          (typeof refComputedStyle?.paddingTop === 'string' &&
          refComputedStyle?.paddingTop.length
            ? parseFloat(refComputedStyle?.paddingTop)
            : 0) -
          (typeof refComputedStyle?.paddingBottom === 'string' &&
          refComputedStyle?.paddingBottom.length
            ? parseFloat(refComputedStyle?.paddingBottom)
            : 0);

        setWidth(initialWidth);
        setHeight(initialHeight);
      }
    };
    if (!ref?.current || (width >= 0 && height >= 0)) {
      return;
    }
    getInitialSize();
  }, [width, height]);

  useLayoutEffect(() => {
    if (!ref?.current) {
      return;
    }

    const doCallbacks = () => {
      if (!ref?.current || !Array.isArray(entriesToHandle?.current)) {
        return;
      }

      const entry = entriesToHandle.current[0];

      setWidth(entry.contentRect.width);
      setHeight(entry.contentRect.height);

      cb.current && cb.current(entry.contentRect);
    };

    const observer = new ResizeObserver((entries) => {
      // always update entriesToHandle
      entriesToHandle.current = entries;

      window.requestAnimationFrame(() => {
        // do callbacks
        doCallbacks();
      });
    });

    // observe all refs passed
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);
  return { width, height };
};
