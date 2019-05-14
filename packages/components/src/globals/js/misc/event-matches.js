/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * @param {Event} event The event.
 * @param {string} selector The selector.
 * @returns {Element}
 *   The closest ancestor of the event target (or the event target itself) which matches the selectors given in parameter.
 */
export default function eventMatches(event, selector) {
  // <svg> in IE does not have `Element#msMatchesSelector()` (that should be copied to `Element#matches()` by a polyfill).
  // Also a weird behavior is seen in IE where DOM tree seems broken when `event.target` is on <svg>.
  // Therefore this function simply returns `undefined` when `event.target` is on <svg>.
  const { target, currentTarget } = event;
  if (typeof target.matches === 'function') {
    if (target.matches(selector)) {
      // If event target itself matches the given selector, return it
      return target;
    }
    if (target.matches(`${selector} *`)) {
      const closest = target.closest(selector);
      if (
        (currentTarget.nodeType === Node.DOCUMENT_NODE
          ? currentTarget.documentElement
          : currentTarget
        ).contains(closest)
      ) {
        return closest;
      }
    }
  }
  return undefined;
}
