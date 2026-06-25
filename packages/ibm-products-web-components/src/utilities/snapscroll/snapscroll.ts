/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';

// cspell:disable

// it seems snapevent doesn't currently exist in typescript
// https://developer.mozilla.org/en-US/docs/Web/API/SnapEvent
interface SnapEvent extends Event {
  snapTargetInline: Element;
}

/**
 * Initiates the snapScroll functionality
 * @param body selector for element that contains the items
 * @param child selector for the item elements
 * @returns void
 */

export const blockClass = `${prefix}--snappy`;
const elmClass = `${blockClass}__elm`;
const selectionClass = `${blockClass}__selection`;

export function snapScroll(body: string, child: string) {
  const bodyEl = document.querySelector(body);

  if (!bodyEl) {
    return;
  }

  const styleElement = document.createElement('style');
  styleElement.textContent = `
  .${blockClass} {
    display: flex;
    flex: none;
    overflow: scroll;
    scroll-snap-type: x mandatory;
    width: 100%;
  }

  .${blockClass}::-webkit-scrollbar {
    display: none;
  }

  .${blockClass}__elm {
    scroll-snap-align: start;
    flex: none;
    width: 100%;
  }
`;
  document.head.appendChild(styleElement);

  bodyEl.classList.add(blockClass);

  const scrollsnapSupported = 'onscrollsnapchange' in bodyEl;
  const children = bodyEl.querySelectorAll(child);

  if (children.length > 0) {
    children.forEach((el) => {
      el.classList.add(elmClass);
    });
  }

  if (scrollsnapSupported) {
    bodyEl.addEventListener('scrollsnapchange', (event) => {
      const snapevent = event as SnapEvent;
      const currentlySnapped = document.querySelector(`.${selectionClass}`);

      if (currentlySnapped) {
        currentlySnapped.classList.remove(selectionClass);
      }

      snapevent.snapTargetInline.classList.add(selectionClass);
    });
  } else {
    const handler: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle(selectionClass, entry.isIntersecting);
      });
    };
    let observer;
    const createObserver = () => {
      if (observer) {
        observer.disconnect();
      }
      observer = new IntersectionObserver(handler, {
        root: bodyEl,
        threshold: 1,
      });
      children.forEach((child) => {
        observer.observe(child);
      });
    };
    createObserver();
  }
}

/**
 * Retreives the currently focused element
 * @returns currently focused element
 */
export function getFocusedItem() {
  return document.querySelector(`.${selectionClass}`);
}

/**
 * Helper function to check if an element is fully visible within its parent
 * @param element The element to check
 * @param parent The parent container
 * @returns true if element is fully visible within parent bounds
 */
function isElementFullyInView(element: Element, parent: Element): boolean {
  const elementRect = element.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();
  return (
    elementRect.left >= parentRect.left && elementRect.right <= parentRect.right
  );
}

/**
 * Finds the first sibling that is not in view by traversing in the specified direction
 * @param startSibling The sibling to start checking from
 * @param parent The parent container
 * @param direction 'next' to check nextElementSibling, 'previous' to check previousElementSibling
 * @returns The first sibling not in view, or the last sibling if all are in view
 */
function findFirstSiblingNotInView(
  startSibling: Element,
  parent: Element,
  direction: 'next' | 'previous'
): Element {
  let currentSibling: Element | null = startSibling;
  let lastCheckedSibling = startSibling;

  while (currentSibling) {
    if (!isElementFullyInView(currentSibling, parent)) {
      return currentSibling;
    }
    lastCheckedSibling = currentSibling;
    currentSibling =
      direction === 'next'
        ? currentSibling.nextElementSibling
        : currentSibling.previousElementSibling;
  }

  // If all siblings are in view, return the last one checked
  return lastCheckedSibling;
}

/**
 * Helper function to scroll to a sibling element with proper handling for already-visible items
 * @param sibling The sibling element to start checking from
 * @param inline The scroll alignment ('start' for next, 'nearest' for previous)
 * @param direction The direction to traverse ('next' or 'previous')
 */
function scrollToSibling(
  sibling: Element,
  inline: ScrollLogicalPosition,
  direction: 'next' | 'previous'
) {
  const parent = sibling.parentElement;
  if (!parent) {
    return;
  }

  // Find the first sibling that is not in view
  const targetSibling = findFirstSiblingNotInView(sibling, parent, direction);
  const isFullyInView = isElementFullyInView(targetSibling, parent);

  // Update the selection class for already visible items
  if (isFullyInView) {
    const currentlySnapped = document.querySelector(`.${selectionClass}`);
    if (currentlySnapped) {
      currentlySnapped.classList.remove(selectionClass);
    }
    targetSibling.classList.add(selectionClass);
  }

  // Always scroll to ensure proper snap alignment
  targetSibling.scrollIntoView({
    behavior: 'smooth',
    inline,
  });

  // If already in view, scrollIntoView won't trigger scrollend
  // So we manually dispatch it to ensure navigation buttons update
  if (isFullyInView) {
    setTimeout(() => {
      parent.dispatchEvent(new Event('scrollend', { bubbles: true }));
    }, 50);
  }
}

/**
 * Scrolls to the next sibling element of the currently focused element
 */
export function scrollNext() {
  const sibling = getNextSibling();
  if (sibling) {
    scrollToSibling(sibling, 'start', 'next');
  }
}

/**
 * Scrolls to the previous sibling element of the currently focused element
 */
export function scrollPrevious() {
  const sibling = getPreviousSibling();
  if (sibling) {
    scrollToSibling(sibling, 'nearest', 'previous');
  }
}

export function getNextSibling() {
  const item = getFocusedItem();
  if (!item) {
    return;
  }

  return item.nextElementSibling;
}

export function getPreviousSibling() {
  const item = getFocusedItem();
  if (!item) {
    return;
  }

  return item.previousElementSibling;
}

/**
 * Checks if there are any next siblings that are not fully in view
 * @returns true if there are more items to scroll to in the next direction
 */
export function hasNextSiblingNotInView(): boolean {
  const item = getFocusedItem();
  if (!item || !item.parentElement) {
    return false;
  }

  let currentSibling = item.nextElementSibling;
  while (currentSibling) {
    if (!isElementFullyInView(currentSibling, item.parentElement)) {
      return true;
    }
    currentSibling = currentSibling.nextElementSibling;
  }

  return false;
}

/**
 * Checks if there are any previous siblings that are not fully in view
 * @returns true if there are more items to scroll to in the previous direction
 */
export function hasPreviousSiblingNotInView(): boolean {
  const item = getFocusedItem();
  if (!item || !item.parentElement) {
    return false;
  }

  let currentSibling = item.previousElementSibling;
  while (currentSibling) {
    if (!isElementFullyInView(currentSibling, item.parentElement)) {
      return true;
    }
    currentSibling = currentSibling.previousElementSibling;
  }

  return false;
}
