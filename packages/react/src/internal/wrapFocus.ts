/**
 * Copyright IBM Corp. 2020, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { tabbable } from 'tabbable';
import { selectorTabbable } from './keyboard/navigation';

/**
 * A flag `node.compareDocumentPosition(target)` returns that indicates
 * `target` is located earlier than `node` in the document or `target` contains `node`.
 */
const DOCUMENT_POSITION_BROAD_PRECEDING =
  typeof Node !== 'undefined'
    ? Node.DOCUMENT_POSITION_PRECEDING | Node.DOCUMENT_POSITION_CONTAINS
    : 0;

/**
 * A flag `node.compareDocumentPosition(target)` returns that indicates
 * `target` is located later than `node` in the document or `node` contains `target`.
 */
const DOCUMENT_POSITION_BROAD_FOLLOWING =
  typeof Node !== 'undefined'
    ? Node.DOCUMENT_POSITION_FOLLOWING | Node.DOCUMENT_POSITION_CONTAINED_BY
    : 0;

/**
 * Checks whether the given node or one of its ancestors matches any of the
 * specified floating menu selectors.
 *
 * @param {Node} node - A DOM node.
 * @param {string[]} selectorsFloatingMenus - Additional CSS selectors that
 * match floating menus.
 * @returns {boolean} Whether the node or one of its ancestors is in a floating
 * menu.
 */
export const elementOrParentIsFloatingMenu = (
  node: Node,
  selectorsFloatingMenus: string[] = [],
  prefix = 'cds'
): boolean => {
  if (node instanceof Element && typeof node.closest === 'function') {
    const allSelectorsFloatingMenus = [
      `.${prefix}--overflow-menu-options`,
      `.${prefix}--tooltip`,
      '.flatpickr-calendar',
      ...selectorsFloatingMenus,
    ];

    return allSelectorsFloatingMenus.some(
      (selector) => !!node.closest(selector)
    );
  }

  return false;
};

/**
 * Ensures the focus is kept within the given container by implementing
 * "focus-wrap" behavior.
 */
export const wrapFocus = ({
  bodyNode,
  startTrapNode,
  endTrapNode,
  currentActiveNode,
  oldActiveNode,
  selectorsFloatingMenus,
  prefix = 'cds',
}: {
  /** The DOM node of the container. */
  bodyNode: HTMLElement | null;
  /** The start sentinel node for focus trapping. */
  startTrapNode: HTMLElement | null;
  /** The end sentinel node for focus trapping. */
  endTrapNode: HTMLElement | null;
  /** The current active node (i.e., the one with focus). */
  currentActiveNode: HTMLElement;
  /** The previous active node (i.e., the one that had focus before). */
  oldActiveNode: HTMLElement;
  /** CSS selectors for floating menus. */
  selectorsFloatingMenus?: string[];
  /** Classname prefix for Carbon selectors. */
  prefix?: string;
}) => {
  if (
    bodyNode &&
    currentActiveNode &&
    oldActiveNode &&
    !bodyNode.contains(currentActiveNode) &&
    !elementOrParentIsFloatingMenu(
      currentActiveNode,
      selectorsFloatingMenus,
      prefix
    )
  ) {
    const comparisonResult =
      oldActiveNode.compareDocumentPosition(currentActiveNode);
    if (
      currentActiveNode === startTrapNode ||
      comparisonResult & DOCUMENT_POSITION_BROAD_PRECEDING
    ) {
      const tabbableElement = Array.from(
        bodyNode.querySelectorAll<HTMLElement>(selectorTabbable)
      )
        .reverse()
        .find(({ offsetParent }) => Boolean(offsetParent));

      if (tabbableElement) {
        tabbableElement.focus();
      } else if (bodyNode !== oldActiveNode) {
        bodyNode.focus();
      }
    } else if (
      currentActiveNode === endTrapNode ||
      comparisonResult & DOCUMENT_POSITION_BROAD_FOLLOWING
    ) {
      const tabbableElement = Array.from(
        bodyNode.querySelectorAll<HTMLElement>(selectorTabbable)
      ).find(({ offsetParent }) => Boolean(offsetParent));

      if (tabbableElement) {
        tabbableElement.focus();
      } else if (bodyNode !== oldActiveNode) {
        bodyNode.focus();
      }
    }
  }
};

/**
 * Ensures the focus is kept in the given container, implementing "focus-wrap"
 * behavior.
 *
 * Note: This must be called *before* focus moves using `onKeyDown` or similar.
 */
export const wrapFocusWithoutSentinels = ({
  containerNode,
  currentActiveNode,
  event,
}: {
  /** The container node within which to keep focus. */
  containerNode: HTMLElement;
  /** The current active node (i.e., the one with focus). */
  currentActiveNode: HTMLElement;
  /** The event that triggered this function. */
  event: React.KeyboardEvent | KeyboardEvent;
}) => {
  if (!containerNode) return;

  if (
    ['blur', 'focusout', 'focusin', 'focus'].includes(event.type) &&
    process.env.NODE_ENV !== 'production'
  ) {
    throw new Error(
      `Error: wrapFocusWithoutSentinels(...) called in unsupported ${event.type} event.\n\nCall wrapFocusWithoutSentinels(...) from onKeyDown instead.`
    );
  }

  // Use `tabbable` to get the focusable elements in tab order.
  // `selectorTabbable` returns elements in DOM order which is why it's not
  // used.
  const tabbables = tabbable(containerNode);
  const firstTabbable = tabbables[0];
  const lastTabbable = tabbables[tabbables.length - 1];

  // The shift key indicates if focus is moving forwards or backwards.
  if (currentActiveNode === lastTabbable && !event.shiftKey) {
    // Cancel the current movement of focus because we're going to place it ourselves
    event.preventDefault();
    firstTabbable.focus();
  }

  if (currentActiveNode === firstTabbable && event.shiftKey) {
    // Cancel the current movement of focus because we're going to place it ourselves
    event.preventDefault();
    lastTabbable.focus();
  }
};
