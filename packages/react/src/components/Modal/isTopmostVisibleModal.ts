/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const isTopmostVisibleModal = (
  node: HTMLElement | null,
  prefix: string
) => {
  if (!node) return false;

  const visibleModals = document.querySelectorAll(
    `.${prefix}--modal.is-visible`
  );

  return visibleModals.item(visibleModals.length - 1) === node;
};
