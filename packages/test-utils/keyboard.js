/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import tabbable from 'tabbable';

/**
 * Simulates the browser Tab behavior, meaning that as we press tab we expect
 * focus (document.activeElement) to move to the next focusable item. If there
 * are none, it does nothing. If we're at the end of the list of focusable
 * nodes, then we wrap back to the beginning
 *
 * @example
 * import { pressTab } from '@carbon/test-utils/keyboard';
 * test('some assertion', () => {
 *   pressTab();
 * });
 *
 * @param {HTMLElement?} node
 * @returns {HTMLElement}
 */
export function pressTab(node = document.body) {
  const nodes = tabbable(node, { includeContainer: true });

  if (nodes.length === 0) {
    return;
  }

  let index = 0;

  if (nodes.includes(document.activeElement)) {
    index = (nodes.indexOf(document.activeElement) + 1) % nodes.length;
  }

  nodes[index].focus();
}

/**
 * Simulates the browser Shift+Tab behavior, meaning that as we press tab we
 * expect focus (document.activeElement) to move to the previous focusable item.
 * If there are none, it does nothing. If we're at the beginning of the list of
 * focusable nodes, then we wrap back to the end
 *
 * @example
 * import { pressShiftTab } from '@carbon/test-utils/keyboard';
 * test('some assertion', () => {
 *   pressShiftTab();
 * });
 *
 * @param {HTMLElement?} node
 * @returns {HTMLElement}
 */
export function pressShiftTab(node = document.body) {
  const nodes = tabbable(node, { includeContainer: true });

  if (nodes.length === 0) {
    return;
  }

  let index = nodes.length - 1;

  if (nodes.includes(document.activeElement)) {
    index =
      (nodes.indexOf(document.activeElement) + nodes.length - 1) % nodes.length;
  }

  nodes[index].focus();
}

/**
 * Simulates the browser's Enter key behavior. By default, pressing the enter
 * key will dispatch a KeyboardEvent. However, if the current focusable element
 * is a button, then it will also dispatch a MouseClick event.
 *
 * @example
 * import { pressEnter } from '@carbon/test-utils/keyboard';
 * test('some assertion', () => {
 *   pressEnter();
 * });
 *
 * @param {HTMLElement?} node
 * @returns {HTMLElement}
 */
export function pressEnter(node = document.activeElement) {
  const events = [
    new KeyboardEvent('keydown', {
      key: 'Enter',
      bubbles: true,
      cancelable: true,
    }),
  ];

  if (node.tagName === 'BUTTON') {
    events.push(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
  }

  for (const event of events) {
    node.dispatchEvent(event);
  }

  return node;
}

/**
 * Simulates the browser's Space key behavior. By default, pressing the space
 * key will dispatch a KeyboardEvent. However, if the current focusable element
 * is a button, then it will also dispatch a MouseClick event.
 *
 * @example
 * import { pressSpace } from '@carbon/test-utils/dom';
 * test('some assertion', () => {
 *   pressSpace();
 * });
 *
 * @param {HTMLElement?} node
 * @returns {HTMLElement}
 */
export function pressSpace(node = document.activeElement) {
  const events = [
    new KeyboardEvent('keydown', {
      key: 'Space',
      bubbles: true,
      cancelable: true,
    }),
  ];

  if (node.tagName === 'BUTTON') {
    events.push(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
  }

  for (const event of events) {
    node.dispatchEvent(event);
  }

  return node;
}
