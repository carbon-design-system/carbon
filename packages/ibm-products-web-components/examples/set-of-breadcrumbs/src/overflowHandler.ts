/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// TODO: delete this file after overflowHandler from carbon/utils gets updated

/**
 * Calculates the size (width or height) of a given HTML element.
 *
 * This function performs an expensive calculation by temporarily changing the
 * display style of the element if it is not currently visible. It then uses
 * `getBoundingClientRect` to retrieve the size of the element.
 *
 * @param el - The HTML element whose size is to be calculated.
 * @param dimension - The dimension to measure ('width' or 'height').
 * @returns The size of the element in pixels. Returns 0 if the element is not provided.
 */
export function getSize(
  el: HTMLElement,
  dimension: 'width' | 'height'
): number {
  if (!el) return 0;
  const originalDisplay = el.style.display;
  if (!el.offsetParent && getComputedStyle(el).display === 'none') {
    el.style.display = 'inline-block';
  }
  let size = el.getBoundingClientRect()[dimension];
  el.style.display = originalDisplay;
  const computedStyles = getComputedStyle(el);
  size =
    dimension === 'width'
      ? size +
        parseInt(computedStyles.paddingLeft) +
        parseInt(computedStyles.paddingRight) +
        parseInt(computedStyles.marginLeft) +
        parseInt(computedStyles.marginRight)
      : size +
        parseInt(computedStyles.paddingTop) +
        parseInt(computedStyles.paddingBottom) +
        parseInt(computedStyles.marginTop) +
        parseInt(computedStyles.marginBottom);
  return size;
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
  offset: HTMLElement;
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
  offsetValue?: number;
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
}: UpdateOverflowHandlerOptions): HTMLElement[] {
  const containerSize =
    dimension === 'width' ? container.clientWidth : container.clientHeight;

  let visibleItems: HTMLElement[] = [];
  let hiddenItems: HTMLElement[] = [];

  const totalSize = sizes.reduce((sum, size) => sum + size, 0);
  const totalFixedSize = fixedSizes.reduce((sum, size) => sum + size, 0);

  if (totalSize + totalFixedSize <= containerSize) {
    visibleItems = maxVisibleItems
      ? items.slice(0, maxVisibleItems)
      : [...items];
    hiddenItems = maxVisibleItems ? items.slice(maxVisibleItems) : [];
  } else {
    const available = containerSize - offsetSize - totalFixedSize - offsetValue;
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

  if (
    previousHiddenItems.length === hiddenItems.length &&
    previousHiddenItems.every((item, index) => item === hiddenItems[index])
  ) {
    return previousHiddenItems;
  }

  visibleItems.forEach((item) => item.removeAttribute('data-hidden'));
  hiddenItems.forEach((item) => item.setAttribute('data-hidden', ''));

  if (offset) {
    offset.toggleAttribute('data-hidden', hiddenItems.length === 0);
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
  offsetValue?: number;
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
  offsetValue = 0,
}: OverflowHandlerOptions): OverflowHandler {
  // Error handling
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
  const offset = children.find((item) =>
    item.hasAttribute('data-offset')
  ) as HTMLElement;
  const fixedItems = children.filter((item) =>
    item.hasAttribute('data-fixed')
  ) as HTMLElement[];
  const items = children.filter(
    (item) => item !== offset && !fixedItems.includes(item)
  );

  const fixedSizes = fixedItems.map((item) => getSize(item, dimension));
  const sizes = items.map((item) => getSize(item, dimension));
  const offsetSize = getSize(offset, dimension);

  let previousHiddenItems: HTMLElement[] = [];

  function update() {
    previousHiddenItems = updateOverflowHandler({
      container,
      items,
      offset,
      sizes,
      fixedSizes,
      offsetSize,
      maxVisibleItems,
      dimension,
      onChange,
      previousHiddenItems,
      offsetValue,
    });
  }

  const resizeObserver = new ResizeObserver(() =>
    requestAnimationFrame(update)
  );
  resizeObserver.observe(container);

  requestAnimationFrame(update); // Initial update

  return {
    disconnect() {
      resizeObserver.disconnect();
    },
  };
}
