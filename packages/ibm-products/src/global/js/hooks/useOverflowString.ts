/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { RefObject, useCallback, useEffect, useState } from 'react';

export function useOverflowStringWidth(
  elementRef: RefObject<HTMLElement | null>
) {
  const innerText = elementRef?.current?.innerText;
  const [isOverflowing, setIsOverflowing] = useState<boolean>();

  const checkWidthOverflow = useCallback(() => {
    const offsetWidth = elementRef?.current?.offsetWidth;
    const scrollWidth = elementRef?.current?.scrollWidth;

    if (offsetWidth && scrollWidth) {
      setIsOverflowing(offsetWidth < scrollWidth);
    }
  }, [elementRef]);

  useEffect(() => {
    checkWidthOverflow();
  }, [checkWidthOverflow, elementRef, innerText]);

  return isOverflowing;
}

export const useOverflowStringHeight = (
  elementRef: RefObject<HTMLElement | null>
) => {
  const innerText = elementRef?.current?.innerText;
  const [isOverflowing, setIsOverflowing] = useState<boolean>();

  const checkHeightOverflow = useCallback(() => {
    const offsetHeight = elementRef?.current?.offsetHeight;
    const scrollHeight = elementRef?.current?.scrollHeight;

    if (offsetHeight && scrollHeight) {
      setIsOverflowing(offsetHeight < scrollHeight);
    }
  }, [elementRef]);

  useEffect(() => {
    checkHeightOverflow();
  }, [checkHeightOverflow, elementRef, innerText]);

  return isOverflowing;
};
