/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const windowExists = typeof window !== `undefined`;

// determine whether the target is scrollable
const scrollable = (target) => {
  const style = window.getComputedStyle(target);
  return /(auto|scroll|hidden)/.test(style.overflow);
};

const scrollableAncestorInner = (target) => {
  if (target.parentNode && target.parentNode !== document) {
    if (scrollable(target.parentNode)) {
      return target.parentNode;
    } else {
      return scrollableAncestorInner(target.parentNode);
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
export const scrollableAncestor = (target) => {
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
