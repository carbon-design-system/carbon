/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Checks if an element is contained within a root node, traversing through shadow DOMs.
 * This utility handles shadow DOM boundaries by checking assignedSlot, parentNode, and shadow root hosts.
 *
 * @param root - The root node to check containment within
 * @param el - The element to check if it's contained within the root
 * @returns true if the element is contained within the root (including through shadow DOMs), false otherwise
 */

export function deepShadowContains(
  root: Node,
  el: EventTarget | null
): boolean {
  if (!(el instanceof Node)) {
    return false;
  }
  if (el === root) {
    return true;
  }

  return deepShadowContains(
    root,
    (el as HTMLElement).assignedSlot ||
      el.parentNode ||
      (el.getRootNode() as ShadowRoot).host ||
      null
  );
}
