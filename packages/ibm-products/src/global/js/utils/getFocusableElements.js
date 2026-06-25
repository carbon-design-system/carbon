/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Returns an array of focusable elements
export const getFocusableElements = (element) => {
  return [
    ...element.querySelectorAll(
      'a, button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])'
    ),
  ].filter((e) => !e.hasAttribute('disabled'));
};
