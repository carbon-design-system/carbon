/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * ----------
 * Utilities
 * ----------
 */

/**
 * The BEM block class shared across all PageHeader sub-components.
 * Components that need a dynamic prefix should call usePrefix() locally.
 */
export const blockClass = `cds--page-header`;

export const getHeaderOffset = (el: HTMLElement): number => {
  const scrollableContainer = scrollableAncestor(el);

  // Get the element's position relative to the viewport
  const offsetMeasuringTop = el ? el.getBoundingClientRect().top : 0;

  if (scrollableContainer === document.scrollingElement) {
    // If scrolling on the document level, return the current viewport position
    // This ensures the breadcrumb bar stays correctly positioned regardless of scroll
    return offsetMeasuringTop >= 0 ? offsetMeasuringTop : 0;
  } else {
    // If there's a scrollable parent container
    const scrollableContainerTop = scrollableContainer
      ? (scrollableContainer as HTMLElement).getBoundingClientRect().top
      : 0;

    // Calculate offset relative to the scrollable container
    const totalHeaderOffset =
      offsetMeasuringTop !== 0
        ? offsetMeasuringTop - scrollableContainerTop
        : 0;
    return totalHeaderOffset >= 0 ? totalHeaderOffset : 0;
  }
};

const windowExists = typeof window !== `undefined`;

/**
 * Determines if the given target is scrollable
 *
 * @param {HTMLElement} target
 * @returns {boolean}
 */
const scrollable = (target: HTMLElement): boolean => {
  const style = window.getComputedStyle(target);
  // Only auto/scroll create an actual scrollable container.
  // overflow:hidden clips content but does not allow scrolling, so it must
  // not be treated as a scroll ancestor — doing so caused getHeaderOffset to
  // return a near-zero offset when host wrappers (e.g. Storybook chrome)
  // carry overflow:hidden, which broke sticky positioning and IntersectionObserver
  // rootMargin calculations for the composable PageHeader.
  return /(auto|scroll)/.test(
    style.overflowY + ' ' + style.overflowX + ' ' + style.overflow
  );
};

/**
 * Recursively looks for the scrollable ancestor
 */
const scrollableAncestorInner = (target: HTMLElement) => {
  if (target.parentNode && target.parentNode !== document) {
    if (scrollable(target.parentNode as HTMLElement)) {
      return target.parentNode;
    } else {
      return scrollableAncestorInner(target.parentNode as HTMLElement);
    }
  } else {
    return document.scrollingElement;
  }
};

/**
 * Walks up the parent nodes to identify the first scrollable ancestor
 *
 * @param {HTMLElement} target
 * @returns {HTMLElement}
 */
export const scrollableAncestor = (target: HTMLElement) => {
  if (!windowExists || !target) {
    return null;
  }

  // based on https://stackoverflow.com/questions/35939886/find-first-scrollable-parent
  const style = window.getComputedStyle(target);

  if (!target || !style || style.position === 'fixed') {
    return document.scrollingElement;
  }
  return scrollableAncestorInner(target);
};
