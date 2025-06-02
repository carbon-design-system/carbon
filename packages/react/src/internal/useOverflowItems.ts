/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import useResizeObserver from 'use-resize-observer';
import { usePreviousValue } from './usePreviousValue';

type Item = {
  id: string;
};

/**
 * Manages overflow items in a container by automatically hiding items that don't fit.
 * @param items - Array of items to manage for overflow, each must have an `id` property.
 * @param containerRef - React ref to the container element that holds the items.
 * @param offsetRef - Optional ref to an offset element (like a "more" button) whose width is reserved when calculating available space.
 * @param maxItems - Optional maximum number of visible items. If undefined, only container space constrains visibility.
 * @param onChange - Optional callback called when hidden items change. Receives array of currently hidden items.
 * @returns Object with `visibleItems` (items to display), `hiddenItems` (items that don't fit), and `itemRefHandler` (function to attach refs to items for width measurement).
 */

const useOverflowItems = <T extends Item>(
  items: T[] | ReactNode,
  containerRef: RefObject<HTMLDivElement>,
  offsetRef?: RefObject<HTMLDivElement>,
  maxItems?: number,
  onChange?: (hiddenItems: T[]) => void
) => {
  const itemsRef = useRef<Map<string, number> | null>(null);
  const [maxWidth, setMaxWidth] = useState(0);
  if (!items || !Array.isArray(items)) {
    return {
      visibleItems: [] as T[],
      hiddenItems: [] as T[],
      itemRefHandler: () => {},
    };
  }

  const handleResize = () => {
    if (containerRef.current) {
      const offset = offsetRef?.current?.offsetWidth || 0;
      const newMax = containerRef.current.offsetWidth - offset;
      setMaxWidth(newMax);
    }
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

  const itemRefHandler = (id: string, node: HTMLDivElement | null) => {
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
    if (!items || Array.isArray(items) === false) {
      return [];
    }
    if (!containerRef) {
      return items;
    }

    const map = getMap();
    let maxReached = false;
    let accumulatedWidth = 0;

    const visibleItems = items.slice(0, maxItems).reduce((prev, cur) => {
      if (maxReached) {
        return prev;
      }

      const itemWidth = map.get(cur.id) || 0;
      const willFit = accumulatedWidth + itemWidth <= maxWidth;
      if (willFit) {
        accumulatedWidth += itemWidth;
        prev.push(cur);
      } else {
        maxReached = true;
      }
      return prev;
    }, [] as T[]);
    return visibleItems;
  };

  // Memoize visible items calculation to avoid recalculating on every render
  const visibleItems = useMemo(() => {
    if (!Array.isArray(items)) {
      return [];
    }
    return getVisibleItems();
  }, [items, maxWidth, maxItems]);

  // Memoize hidden items calculation
  const hiddenItems = useMemo(() => {
    if (!Array.isArray(items)) {
      return [];
    }
    return items.slice(visibleItems.length);
  }, [items, visibleItems]);

  // Use previous value to compare and only call onChange when needed
  const previousHiddenItems = usePreviousValue(hiddenItems);

  // Only call onChange if hidden items actually changed
  useEffect(() => {
    if (previousHiddenItems && onChange) {
      const hasChanged =
        hiddenItems.length !== previousHiddenItems.length ||
        hiddenItems.some((item, index) => item !== previousHiddenItems[index]);

      if (hasChanged) {
        onChange(hiddenItems);
      }
    }
  }, [hiddenItems, previousHiddenItems, onChange]);

  return {
    visibleItems,
    itemRefHandler,
    hiddenItems,
  };
};

export default useOverflowItems;
