/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

let _scrollContainer: Element | null = null;
let _itemSelector: string = '';

/**
 * Initialise snap-scroll on a container.
 * @param containerSelector CSS selector for the scroll container.
 * @param itemSelector CSS selector for individual scroll items inside the container.
 */
export function snapScroll(
  containerSelector: string,
  itemSelector: string
): void {
  _itemSelector = itemSelector;
  _scrollContainer = document.querySelector(containerSelector);
}

/** Scroll to the next snap item. */
export function scrollNext(): void {
  if (!_scrollContainer) {
    return;
  }
  const items = Array.from(
    _scrollContainer.querySelectorAll(_itemSelector)
  ) as HTMLElement[];
  const containerLeft = _scrollContainer.getBoundingClientRect().left;
  const next = items.find(
    (el) => el.getBoundingClientRect().left > containerLeft + 1
  );
  if (next) {
    next.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }
}

/** Scroll to the previous snap item. */
export function scrollPrevious(): void {
  if (!_scrollContainer) {
    return;
  }
  const items = Array.from(
    _scrollContainer.querySelectorAll(_itemSelector)
  ) as HTMLElement[];
  const containerLeft = _scrollContainer.getBoundingClientRect().left;
  const visible = items.filter(
    (el) => el.getBoundingClientRect().left >= containerLeft - 1
  );
  // The item just before the first fully-visible one
  const firstVisibleIdx = items.indexOf(visible[0]);
  const target = firstVisibleIdx > 0 ? items[firstVisibleIdx - 1] : items[0];
  target.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'start',
  });
}

/**
 * Returns true when there is at least one item that is not fully in view
 * to the right of the currently visible items.
 */
export function hasNextSiblingNotInView(): boolean {
  if (!_scrollContainer) {
    return false;
  }
  const containerRight = _scrollContainer.getBoundingClientRect().right;
  const items = Array.from(
    _scrollContainer.querySelectorAll(_itemSelector)
  ) as HTMLElement[];
  return items.some(
    (el) => el.getBoundingClientRect().right > containerRight + 1
  );
}

/**
 * Returns true when there is at least one item scrolled out of view
 * to the left of the scroll container.
 */
export function hasPreviousSiblingNotInView(): boolean {
  if (!_scrollContainer) {
    return false;
  }
  const containerLeft = _scrollContainer.getBoundingClientRect().left;
  const items = Array.from(
    _scrollContainer.querySelectorAll(_itemSelector)
  ) as HTMLElement[];
  return items.some(
    (el) => el.getBoundingClientRect().left < containerLeft - 1
  );
}
