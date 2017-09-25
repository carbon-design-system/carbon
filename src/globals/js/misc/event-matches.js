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
  if (typeof event.target.matches === 'function') {
    if (event.target.matches(selector)) {
      // If event target itself matches the given selector, return it
      return event.target;
    } else if (event.target.matches(`${selector} *`)) {
      const closest = event.target.closest(selector);
      if (event.currentTarget.contains(closest)) {
        return closest;
      }
    }
  }
  return undefined;
}
