/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import findLast from 'lodash.findlast';
import { useEffect } from 'react';
import {
  DOCUMENT_POSITION_BROAD_PRECEDING,
  DOCUMENT_POSITION_BROAD_FOLLOWING,
  selectorTabbable,
} from './keyboard/navigation';
import { tabbable } from 'tabbable';

/**
 * @param {Node} node A DOM node.
 * @param {string[]} selectorsFloatingMenus The CSS selectors that matches floating menus.
 * @returns {boolean} `true` of the given `node` is in a floating menu.
 */
function elementOrParentIsFloatingMenu(node, selectorsFloatingMenus = []) {
  if (node && typeof node.closest === 'function') {
    const allSelectorsFloatingMenus = [
      `.cds--overflow-menu-options`,
      `.cds--tooltip`,
      '.flatpickr-calendar',
      ...selectorsFloatingMenus,
    ];
    return allSelectorsFloatingMenus.some((selector) => node.closest(selector));
  }
}

/**
 * Ensures the focus is kept in the given `modalNode`, implementing "focus-wrap" behavior.
 * @param {object} options The options.
 * @param {Node|null} options.bodyNode
 * @param {Node|null} options.startTrapNode The DOM node of the focus sentinel the is placed earlier next to `modalNode`.
 * @param {Node|null} options.endTrapNode The DOM node of the focus sentinel the is placed next to `modalNode`.
 * @param {Node} options.currentActiveNode The DOM node that has focus.
 * @param {Node} options.oldActiveNode The DOM node that previously had focus.
 * @param {string[]} [options.selectorsFloatingMenus] The CSS selectors that matches floating menus.
 */
function wrapFocus({
  bodyNode,
  startTrapNode,
  endTrapNode,
  currentActiveNode,
  oldActiveNode,
  selectorsFloatingMenus,
}) {
  if (
    bodyNode &&
    currentActiveNode &&
    oldActiveNode &&
    !bodyNode.contains(currentActiveNode) &&
    !elementOrParentIsFloatingMenu(currentActiveNode, selectorsFloatingMenus)
  ) {
    const comparisonResult =
      oldActiveNode.compareDocumentPosition(currentActiveNode);
    if (
      currentActiveNode === startTrapNode ||
      comparisonResult & DOCUMENT_POSITION_BROAD_PRECEDING
    ) {
      const tabbable = findLast(
        bodyNode.querySelectorAll(selectorTabbable),
        (elem) => Boolean(elem.offsetParent)
      );
      if (tabbable) {
        tabbable.focus();
      } else if (bodyNode !== oldActiveNode) {
        bodyNode.focus();
      }
    } else if (
      currentActiveNode === endTrapNode ||
      comparisonResult & DOCUMENT_POSITION_BROAD_FOLLOWING
    ) {
      const tabbable = Array.prototype.find.call(
        bodyNode.querySelectorAll(selectorTabbable),
        (elem) => Boolean(elem.offsetParent)
      );
      if (tabbable) {
        tabbable.focus();
      } else if (bodyNode !== oldActiveNode) {
        bodyNode.focus();
      }
    }
  }
}

/**
 * Ensures the focus is kept in the given `containerNode`, implementing "focus-wrap" behavior.
 * Note: This must be called *before* focus moves using onKeyDown or similar.
 * @param {object} options The options.
 * @param {Node|null} options.containerNode
 * @param {EventTarget} options.currentActiveNode The DOM node that has focus.
 * @param {KeyboardEvent} options.event The DOM event
 */
function wrapFocusWithoutSentinels({
  containerNode,
  currentActiveNode,
  event,
}) {
  if (
    ['blur', 'focusout', 'focusin', 'focus'].includes(event.type) &&
    __DEV__
  ) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      throw new Error(
        `Error: wrapFocusWithoutSentinels(...) called in unsupported ${event.type} event.\n\nCall wrapFocusWithoutSentinels(...) from onKeyDown instead.`
      );
    });
  }

  // The reason we're using tabbable is because it returns the tabbable
  // items *in tab order*, whereas using our `selectorTabbable` only
  // returns in DOM order
  const tabbables = tabbable(containerNode);
  const firstTabbable = tabbables[0];
  const lastTabbable = tabbables[tabbables.length - 1];

  // console.log(`---------------------------------`);
  // console.log(containerNode);
  // console.log(tabbables);
  // console.log(firstTabbable);
  // console.log(lastTabbable);
  // console.log(currentActiveNode);

  // The shift key is used to determine if focus is moving forwards or backwards
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
}

export { elementOrParentIsFloatingMenu, wrapFocusWithoutSentinels };
export default wrapFocus;
