/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Lightweight snap-scroll helpers used by story templates that render
 * horizontally-scrollable lists of guide-banner elements.
 *
 * The module keeps a single pair of (container, item) selectors so that
 * story-level controls (Previous / Next buttons) can call scrollNext /
 * scrollPrevious without needing to pass DOM references every time.
 */

let _containerSelector = '';
let _itemSelector = '';

/** Cache selectors so the navigation helpers know which elements to scroll. */
export function snapScroll(
  containerSelector: string,
  itemSelector: string
): void {
  _containerSelector = containerSelector;
  _itemSelector = itemSelector;
}

function getContainer(): Element | null {
  return document.querySelector(_containerSelector);
}

function getItems(): Element[] {
  const container = getContainer();
  if (!container) return [];
  return Array.from(container.querySelectorAll(_itemSelector));
}

/** Returns the first item that is not fully visible on the right side. */
function firstItemNotInView(): Element | null {
  const container = getContainer();
  if (!container) return null;
  const { right: containerRight } = container.getBoundingClientRect();
  return (
    getItems().find((item) => {
      const { right } = item.getBoundingClientRect();
      return right > containerRight;
    }) ?? null
  );
}

/** Returns the first item that is not fully visible on the left side. */
function firstItemBeforeView(): Element | null {
  const container = getContainer();
  if (!container) return null;
  const { left: containerLeft } = container.getBoundingClientRect();
  return (
    getItems()
      .slice()
      .reverse()
      .find((item) => {
        const { left } = item.getBoundingClientRect();
        return left < containerLeft;
      }) ?? null
  );
}

/** Scroll forward to bring the next out-of-view item into view. */
export function scrollNext(): void {
  firstItemNotInView()?.scrollIntoView({ behavior: 'smooth', inline: 'start' });
}

/** Scroll backward to bring the previous out-of-view item into view. */
export function scrollPrevious(): void {
  firstItemBeforeView()?.scrollIntoView({
    behavior: 'smooth',
    inline: 'start',
  });
}

/** True when at least one item extends beyond the right edge of the container. */
export function hasNextSiblingNotInView(): boolean {
  return firstItemNotInView() !== null;
}

/** True when at least one item is hidden to the left of the container. */
export function hasPreviousSiblingNotInView(): boolean {
  return firstItemBeforeView() !== null;
}
