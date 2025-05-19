/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ReactNode, RefObject, useRef, useState } from 'react';
import useResizeObserver from 'use-resize-observer';

type Item = {
  id: string;
};

const useOverflowItems = <T extends Item>(
  items: T[] | ReactNode,
  containerRef: RefObject<HTMLDivElement>,
  offsetRef?: RefObject<HTMLDivElement>,
  maxItems?: number,
  onChange?: (hiddenItems: T[]) => void
) => {
  const itemsRef = useRef<Map<string, number> | null>(null);
  const [maxWidth, setMaxWidth] = useState(0);
  const visibleItemCount = useRef<number>(0);

  const handleResize = () => {
    if (containerRef.current) {
      const offset = offsetRef?.current?.offsetWidth || 0;
      const newMax = containerRef.current.offsetWidth - offset;
      setMaxWidth(newMax);
    }
  };

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

  useResizeObserver({
    ref: containerRef,
    onResize: handleResize,
  });

  if (!items || Array.isArray(items) === false) {
    return {};
  }

  const visibleItems = getVisibleItems();
  const hiddenItems = items.slice(visibleItems.length);

  if (visibleItems.length !== visibleItemCount.current) {
    visibleItemCount.current = visibleItems.length;
    onChange?.(hiddenItems);
  }

  return {
    visibleItems,
    itemRefHandler,
    hiddenItems,
  };
};

export default useOverflowItems;
