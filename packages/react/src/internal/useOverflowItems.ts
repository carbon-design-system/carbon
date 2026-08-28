/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { RefObject, useRef, useState } from 'react';
import { useResizeObserver } from './useResizeObserver';

type Item = {
  id: string;
};

/**
 * Manages overflow items in a container by automatically hiding items that don't fit.
 * @param items - Array of items to manage for overflow, each must have an `id` property.
 * @param containerRef - React ref to the container element that holds the items.
 * @param offsetRef - Optional ref to an offset element (like a "more" button) whose width is reserved when calculating available space.
 * @param maxItems - Optional maximum number of visible items. If undefined, only container space constrains visibility.
 * @param onChange - Optional callback called when overflow calculations change.
 * @returns Object with `visibleItems` (items to display), `hiddenItems` (items that don't fit), `itemRefHandler` (function to attach refs to items for width measurement), and `offsetRefHandler` (function to attach refs to the offset element for width measurement).
 */

function useOverflowItems<T extends Item>(
  items: T[] | null | React.ReactNode = [],
  containerRef: RefObject<HTMLElement | null>,
  offsetRef?: RefObject<HTMLElement | null>,
  maxItems?: number,
  onChange?: (value: {
    hiddenItems?: T[];
    minWidth?: number;
    maxWidth?: number;
  }) => void
): {
  visibleItems: T[];
  itemRefHandler: (id: string, node: HTMLElement | null) => void;
  hiddenItems: T[];
  offsetRefHandler: (node: HTMLElement | null) => HTMLElement | null;
} {
  const [remainingWidth, setRemainingWidth] = useState(0);
  const offsetWidthRef = useRef<number>(0);
  const itemsRef = useRef<Map<string, number> | null>(null);
  const visibleItemCount = useRef<number>(0);
  const minWidthRef = useRef<number>(0);
  const requiredWidthRef = useRef<number>(0);

  const handleResize = () => {
    if (containerRef?.current) {
      offsetWidthRef.current = offsetRef?.current?.offsetWidth || 0;
      const usableWidth =
        containerRef.current.offsetWidth - offsetWidthRef.current;
      setRemainingWidth(usableWidth);
    }
  };

  const offsetRefHandler = (node: HTMLElement | null) => {
    if (node && containerRef?.current) {
      offsetWidthRef.current = node.offsetWidth;
      const usableWidth =
        containerRef.current.offsetWidth - offsetWidthRef.current;
      setRemainingWidth(usableWidth);
    }

    return node;
  };

  useResizeObserver({
    ref: containerRef,
    onResize: handleResize,
  });

  const getMap = () => {
    if (!itemsRef.current) {
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  };

  const overflowItems = Array.isArray(items) ? items : [];

  const requiredWidth = overflowItems
    .slice(0, maxItems)
    .reduce((acc, item) => acc + (getMap().get(item.id) || 0), 0);

  const itemRefHandler = (id: string, node: HTMLElement | null) => {
    const map = getMap();
    if (node) {
      const style = getComputedStyle?.(node);
      const totalWidth =
        node.offsetWidth +
        parseInt(style.marginLeft) +
        parseInt(style.marginRight);
      map.set(id, totalWidth);
    }

    return () => {
      map.delete(id);
    };
  };

  const getVisibleItems = () => {
    if (!containerRef?.current) {
      return overflowItems;
    }

    const map = getMap();
    let maxReached = false;
    let accumulatedWidth = 0;
    let includeOffset = false;

    if (maxItems) {
      includeOffset = requiredWidth + offsetWidthRef?.current > requiredWidth;
    } else {
      includeOffset = requiredWidth > remainingWidth + offsetWidthRef?.current;
    }

    return overflowItems.slice(0, maxItems).reduce((prev, cur) => {
      if (maxReached) {
        return prev;
      }

      const itemWidth = map.get(cur.id) || 0;
      let willFit = accumulatedWidth + itemWidth <= remainingWidth;

      if (!includeOffset) {
        willFit =
          accumulatedWidth + itemWidth <=
          remainingWidth + offsetWidthRef?.current;
      }

      if (willFit) {
        accumulatedWidth += itemWidth;
        prev.push(cur);
      } else {
        maxReached = true;
      }
      return prev;
    }, [] as T[]);
  };

  const visibleItems = getVisibleItems();
  const hiddenItems = overflowItems.slice(visibleItems?.length);
  // only call the change handler when the number of visible items has changed
  if (
    visibleItems?.length !== visibleItemCount.current ||
    remainingWidth !== minWidthRef.current ||
    requiredWidth !== requiredWidthRef.current
  ) {
    visibleItemCount.current = visibleItems?.length;
    minWidthRef.current = remainingWidth;
    requiredWidthRef.current = requiredWidth;
    const firstItemKey: string = getMap()?.keys()?.next()?.value || '';
    const firstItemWidth = getMap()?.get(firstItemKey) || 0;

    onChange?.({
      hiddenItems,
      minWidth: remainingWidth,
      maxWidth: requiredWidth + firstItemWidth,
    });
  }

  return {
    visibleItems,
    itemRefHandler,
    hiddenItems,
    offsetRefHandler,
  };
}

export default useOverflowItems;
