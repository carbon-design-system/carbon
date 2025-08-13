/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, type RefObject } from 'react';

export const useNoInteractiveChildren = (
  ref: RefObject<HTMLElement | null>,
  message = 'component should have no interactive child nodes'
) => {
  // TODO: Why can't the condition go inside the hook?
  if (process.env.NODE_ENV !== 'production') {
    // TODO: https://github.com/carbon-design-system/carbon/issues/19005
    /*
    // eslint-disable-next-line react-hooks/rules-of-hooks
    */
    useEffect(() => {
      const node = ref.current ? getInteractiveContent(ref.current) : false;

      if (node) {
        const errorMessage = `Error: ${message}.\n\nInstead found: ${node.outerHTML}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
      }
    }, []);
  }
};

export const useInteractiveChildrenNeedDescription = (
  ref: RefObject<HTMLElement | null>,
  message = `interactive child node(s) should have an \`aria-describedby\` property`
) => {
  // TODO: Why can't the condition go inside the hook?
  if (process.env.NODE_ENV !== 'production') {
    // TODO: https://github.com/carbon-design-system/carbon/issues/19005
    /*
    // eslint-disable-next-line react-hooks/rules-of-hooks
    */
    useEffect(() => {
      const node = ref.current ? getInteractiveContent(ref.current) : false;

      if (node && !node.hasAttribute('aria-describedby')) {
        throw new Error(
          `Error: ${message}.\n\nInstead found: ${node.outerHTML}`
        );
      }
    });
  }
};

/**
 * Determines if a given DOM node has interactive content, or is itself
 * interactive. It returns the interactive node if one is found.
 *
 * @param node - The node to check.
 * @returns The interactive node, or `null` if none is found.
 */
export const getInteractiveContent = (
  node: HTMLElement
): HTMLElement | null => {
  if (!node || !node.childNodes) {
    return null;
  }

  if (isFocusable(node)) {
    return node;
  }

  for (const childNode of node.childNodes) {
    if (childNode instanceof HTMLElement) {
      const interactiveNode = getInteractiveContent(childNode);
      if (interactiveNode) {
        return interactiveNode;
      }
    }
  }

  return null;
};

/**
 * Determines if a given DOM node has a `role`, or has itself a `role`.
 * It returns the node with a `role` if one is found.
 *
 * @param node - The node to check.
 * @returns The node with a `role`, or `null` if none is found.
 */
export const getRoleContent = (node: HTMLElement): HTMLElement | null => {
  if (!node || !node.childNodes) {
    return null;
  }

  if (node.getAttribute('role') && node.getAttribute('role') !== '') {
    return node;
  }

  for (const childNode of node.childNodes) {
    if (childNode instanceof HTMLElement) {
      const roleNode = getRoleContent(childNode);
      if (roleNode) {
        return roleNode;
      }
    }
  }

  return null;
};

/**
 * Determines if the given element is focusable.
 *
 * @param element - The element to check.
 * @returns Whether the element is focusable.
 * @see https://github.com/w3c/aria-practices/blob/0553bb51588ffa517506e2a1b2ca1422ed438c5f/examples/js/utils.js#L68
 */
const isFocusable = (element: HTMLElement) => {
  if (element.tabIndex === undefined || element.tabIndex < 0) {
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
