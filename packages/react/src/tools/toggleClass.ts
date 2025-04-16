/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Toggles a class on an element.
 *
 * @param element - The target element.
 * @param className - The class to toggle.
 * @param add - `true` to add the class, `false` to remove it.
 */
export const toggleClass = (
  element: Element,
  className: string,
  add: boolean
) => {
  element.classList.toggle(className, add);
};
