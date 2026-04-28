/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, type RefObject } from 'react';

export const useNoInteractiveChildren = (
  ref: RefObject<HTMLElement | null>,
  message = 'component should have no interactive child nodes'
) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;

    const { current } = ref;
    const node = current ? getInteractiveContent(current) : null;

    if (node) {
      const errorMessage = `Error: ${message}.\n\nInstead found: ${node.outerHTML}`;
      // eslint-disable-next-line no-console -- https://github.com/carbon-design-system/carbon/issues/20452
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  }, [message, ref]);
};

export const useInteractiveChildrenNeedDescription = (
  ref: RefObject<HTMLElement | null>,
  message = `interactive child node(s) should have an \`aria-describedby\` property`
) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;

    const { current } = ref;
    const node = current ? getInteractiveContent(current) : null;

    if (node && !node.hasAttribute('aria-describedby')) {
      throw new Error(`Error: ${message}.\n\nInstead found: ${node.outerHTML}`);
    }
  }, [message, ref]);
};

const findMatchingContent = (
  node: HTMLElement,
  matcher: (element: HTMLElement) => boolean
): HTMLElement | null => {
  if (matcher(node)) return node;

  for (const child of node.children) {
    if (!(child instanceof HTMLElement)) {
      continue;
    }

    const matchingChild = findMatchingContent(child, matcher);

    if (matchingChild) return matchingChild;
  }

  return null;
};

/**
 * Finds an interactive node in a given DOM node, including the node itself.
 */
export const getInteractiveContent = (node: HTMLElement) =>
  findMatchingContent(node, isFocusable);

const hasRole = (element: HTMLElement) => {
  const role = element.getAttribute('role');

  return role !== null && role !== '';
};

/**
 * Finds a node with a `role` in a given DOM node, including the node itself.
 */
export const getRoleContent = (node: HTMLElement) =>
  findMatchingContent(node, hasRole);

/**
 * Determines if the given element is focusable.
 *
 * @param element - The element to check.
 * @returns Whether the element is focusable.
 * @see https://github.com/w3c/aria-practices/blob/0553bb51588ffa517506e2a1b2ca1422ed438c5f/examples/js/utils.js#L68
 */
const isFocusable = (element: HTMLElement) => {
  if (element.tabIndex < 0) {
    return false;
  }

  if (
    element instanceof HTMLButtonElement ||
    element instanceof HTMLInputElement ||
    element instanceof HTMLSelectElement ||
    element instanceof HTMLTextAreaElement
  ) {
    if (element.disabled) {
      return false;
    }
  }

  switch (element.nodeName) {
    case 'A':
      return (
        element instanceof HTMLAnchorElement &&
        !!element.href &&
        element.rel !== 'ignore'
      );
    case 'INPUT':
      return element instanceof HTMLInputElement && element.type !== 'hidden';
    default:
      return true;
  }
};
