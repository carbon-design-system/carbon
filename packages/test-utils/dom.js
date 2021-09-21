/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import prettier from 'prettier';

/**
 * Find the HTMLElement that includes the given `text`
 *
 * @param {HTMLElement} node
 * @param {string} text
 * @returns {?HTMLElement}
 */
export function getByText(node, text) {
  if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === text) {
    return node.parentNode;
  }

  for (const child of node.childNodes) {
    const match = getByText(child, text);
    if (match) {
      return match;
    }
  }

  return null;
}

/**
 * Find the HTMLElement that includes the given label.
 *
 * @param {HTMLElement} node
 * @param {string} label
 * @returns {?HTMLElement}
 */
export function getByLabel(node, label) {
  if (node.nodeType === Node.ELEMENT_NODE) {
    if (
      node.hasAttribute('aria-label') &&
      node.getAttribute('aria-label') === label
    ) {
      return node;
    }

    if (node.hasAttribute('aria-labelledby')) {
      const labelledby = node.getAttribute('aria-labelledby');
      const labelers = labelledby.split(' ').map((id) => {
        return document.getElementById(id);
      });

      for (const labeler of labelers) {
        const labelMatch = getByLabel(labeler, label);
        if (labelMatch) {
          return node;
        }

        const textMatch = getByText(labeler, label);
        if (textMatch) {
          return node;
        }
      }
    }

    if (node.tagName === 'BUTTON') {
      const match = getByText(node, label);
      if (match) {
        return match;
      }
    }
  }

  for (const child of node.childNodes) {
    const match = getByLabel(child, label);
    if (match) {
      return match;
    }
  }

  return null;
}

/**
 * Check if an element is currently visible to an end-user.
 *
 * @param {HTMLElement} element
 * @returns {boolean}
 */
export function isElementVisible(element) {
  const { getComputedStyle } = element.ownerDocument.defaultView;
  const { display, visibility, opacity } = getComputedStyle(element);

  if (
    element.hasAttribute('hidden') ||
    display === 'none' ||
    visibility === 'hidden' ||
    visibility === 'collapse' ||
    opacity === '0' ||
    opacity === 0
  ) {
    return false;
  }

  if (element.parentElement) {
    return isElementVisible(element.parentElement);
  }

  return true;
}

/**
 * Pretty-print the outerHTML of the given element. Uses prettier under the
 * hood.
 *
 * @param {HTMLElement} element
 * @returns {string}
 */
export function debug(element) {
  return prettier.format(element.outerHTML, {
    parser: 'html',
  });
}
