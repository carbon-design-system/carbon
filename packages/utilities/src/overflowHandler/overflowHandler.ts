/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Note: there is a hidden story for this utility. for testing purposes.

/**
 * Calculates the size (width or height) of a given HTML element.
 *
 * Temporarily sets `display` if the element is not currently visible so hidden
 * items can still be measured. Adds margin and an optional `gap`.
 *
 * @param el - The HTML element whose size is to be calculated. Returns 0 if
 *   `null` or `undefined` is passed.
 * @param dimension - The dimension to measure ('width' or 'height').
 * @param gap - Optional gap (in px) to add to each item's size, representing the `column-gap` (width) or `row-gap` (height) of the parent container.
 * @returns The size of the element in pixels, or 0 if no element is provided.
 */
export function getSize(
  el: HTMLElement | null | undefined,
  dimension: 'width' | 'height',
  gap = 0
): number {
  if (!el) return 0;
  const originalDisplay = el.style.display;
  const styles = getComputedStyle(el);
  if (!el.offsetParent && styles.display === 'none') {
    el.style.display = 'inline-block';
  }
  const size = el.getBoundingClientRect()[dimension];
  el.style.display = originalDisplay;
  const margin =
    dimension === 'width'
      ? (parseFloat(styles.marginLeft) || 0) +
        (parseFloat(styles.marginRight) || 0)
      : (parseFloat(styles.marginTop) || 0) +
        (parseFloat(styles.marginBottom) || 0);
  return size + margin + gap;
}

/**
 * Options for updating the overflow handler.
 * Determines which items should be visible and which should be hidden
 * based on the container size, item sizes, and other constraints.
 */
export interface UpdateOverflowHandlerOptions {
  /** The container element that holds the items. */
  container: HTMLElement;
  /** An array of item elements to be managed for overflow. */
  items: HTMLElement[];
  /** An element that represents the offset, which can be shown or hidden based on overflow. Identified by `data-offset` attribute. */
  offset: HTMLElement | undefined;
  /** An array of sizes corresponding to each item in the `items` array. */
  sizes: number[];
  /** An array of sizes corresponding to each item in the fixed items array. */
  fixedSizes: number[];
  /** The size of the offset element. */
  offsetSize: number;
  /** The maximum number of items that can be visible at once. If undefined, all items can be visible. */
  maxVisibleItems?: number;
  /** The dimension to consider for overflow, either 'width' or 'height'. */
  dimension: 'width' | 'height';
  /** A callback function that is called when the visible or hidden items change. */
  onChange: (visibleItems: HTMLElement[], hiddenItems: HTMLElement[]) => void;
  /** An array of previously hidden items to compare against the new hidden items. */
  previousHiddenItems?: HTMLElement[];
  /** Pixels to reserve from the container's available space, causing overflow to trigger earlier. */
  offsetValue?: number;
  /** The gap (in px) between items, representing `column-gap` (width) or `row-gap` (height) of the container. */
  gap?: number;
}

/**
 * Updates the overflow handler by determining which items should be visible and which should be hidden.
 *
 * @param options - Configuration options for updating the overflow handler.
 * @returns An array of hidden items after the update.
 */
export function updateOverflowHandler({
  container,
  items,
  offset,
  sizes,
  fixedSizes,
  offsetSize,
  maxVisibleItems,
  dimension,
  onChange,
  previousHiddenItems = [],
  offsetValue = 0,
  gap = 0,
}: UpdateOverflowHandlerOptions): HTMLElement[] {
  const containerSize =
    dimension === 'width' ? container.clientWidth : container.clientHeight;

  let visibleItems: HTMLElement[] = [];
  let hiddenItems: HTMLElement[] = [];

  const totalSize = sizes.reduce((sum, size) => sum + size, 0);
  const totalFixedSize = fixedSizes.reduce((sum, size) => sum + size, 0);
  // sizes include a gap after every item, but CSS gap is only between items.
  const trailingGap = sizes.length + fixedSizes.length > 0 ? gap : 0;

  if (totalSize + totalFixedSize - trailingGap <= containerSize - offsetValue) {
    visibleItems = maxVisibleItems
      ? items.slice(0, maxVisibleItems)
      : [...items];
    hiddenItems = maxVisibleItems ? items.slice(maxVisibleItems) : [];
  } else {
    // Each item's size includes a gap (for the space after it), but the last
    // visible item has no gap after it — add one gap back to available space.
    const available =
      containerSize - offsetSize - totalFixedSize - offsetValue + gap;
    let accumulated = 0;
    let breakIndex = items.length;

    for (let i = 0; i < items.length; i++) {
      const size = sizes[i];
      if (
        accumulated + size <= available &&
        (!maxVisibleItems || visibleItems.length < maxVisibleItems)
      ) {
        visibleItems.push(items[i]);
        accumulated += size;
      } else {
        breakIndex = i;
        break;
      }
    }
    hiddenItems = items.slice(breakIndex);
  }

  visibleItems.forEach((item) => item.removeAttribute('data-hidden'));
  hiddenItems.forEach((item) => item.setAttribute('data-hidden', ''));

  if (offset) {
    offset.toggleAttribute('data-hidden', hiddenItems.length === 0);
  }

  if (
    previousHiddenItems.length === hiddenItems.length &&
    previousHiddenItems.every((item, index) => item === hiddenItems[index])
  ) {
    return previousHiddenItems;
  }

  onChange(visibleItems, hiddenItems);
  return hiddenItems;
}

/**
 * Options for initializing an overflow handler.
 */
export interface OverflowHandlerOptions {
  /**
   * The container element that holds the items. along with offset item
   */
  container: HTMLElement;
  /**
   * Maximum number of visible items. If provided, only this number of items will be shown.
   */
  maxVisibleItems?: number;
  /**
   * Callback function invoked when the visible and hidden items change.
   * @param visibleItems - The array of items that are currently visible.
   * @param hiddenItems - The array of items that are currently hidden.
   */
  onChange: (visibleItems: HTMLElement[], hiddenItems: HTMLElement[]) => void;
  /**
   * The dimension to consider for overflow calculations. Defaults to 'width'.
   */
  dimension?: 'width' | 'height';
  /**
   * Pixels to reserve from the container's available space, causing overflow to
   * trigger earlier. Useful when an element within the container (e.g. a "show
   * more" button) needs guaranteed room.
   */
  offsetValue?: number;
  /**
   * The gap (in px) between items in the container's flex/grid layout.
   */
  gap?: number;
}

/**
 * Represents an instance of an overflow handler.
 */
export interface OverflowHandler {
  /**
   * Disconnects the overflow handler, cleaning up any event listeners or resources.
   */
  disconnect: () => void;
}

export function createOverflowHandler({
  container,
  maxVisibleItems,
  onChange,
  dimension = 'width',
  offsetValue,
  gap,
}: OverflowHandlerOptions): OverflowHandler {
  if (!(container instanceof HTMLElement)) {
    throw new Error('container must be an HTMLElement');
  }
  if (typeof onChange !== 'function') {
    throw new Error('onChange must be a function');
  }
  if (
    maxVisibleItems !== undefined &&
    (!Number.isInteger(maxVisibleItems) || maxVisibleItems <= 0)
  ) {
    throw new Error('maxVisibleItems must be a positive integer');
  }

  const children = Array.from(container.children) as HTMLElement[];
  const offset = children.find((item) => item.hasAttribute('data-offset'));
  const fixedItems = children.filter((item) => item.hasAttribute('data-fixed'));
  const items = children.filter(
    (item) => item !== offset && !fixedItems.includes(item)
  );

  let previousHiddenItems: HTMLElement[] = [];
  let rafId: number | undefined;
  let disconnected = false;

  const update = () => {
    if (disconnected) {
      return;
    }
    rafId = undefined;
    previousHiddenItems = updateOverflowHandler({
      container,
      items,
      offset,
      sizes: items.map((item) => getSize(item, dimension, gap)),
      fixedSizes: fixedItems.map((item) => getSize(item, dimension, gap)),
      offsetSize: getSize(offset, dimension, gap),
      maxVisibleItems,
      dimension,
      onChange,
      previousHiddenItems,
      offsetValue,
      gap,
    });
  };

  const scheduleUpdate = () => {
    if (disconnected || rafId !== undefined) {
      return;
    }
    rafId = requestAnimationFrame(update);
  };

  const resizeObserver = new ResizeObserver(scheduleUpdate);
  resizeObserver.observe(container);
  scheduleUpdate();
  document.fonts?.ready?.then(scheduleUpdate);

  return {
    disconnect() {
      disconnected = true;
      resizeObserver.disconnect();
      if (rafId !== undefined) {
        cancelAnimationFrame(rafId);
      }
    },
  };
}
