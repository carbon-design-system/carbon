/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import tabbable from 'tabbable';

export function pressTab(node) {
  const nodes = tabbable(node, { includeContainer: true });

  if (nodes.length === 0) {
    return;
  }

  let index = 0;

  if (nodes.includes(document.activeElement)) {
    index = nodes.indexOf(document.activeElement) + 1;
  }

  nodes[index].focus();
}

export function pressEnter(node) {
  const events = [
    new KeyboardEvent('keydown', {
      key: 'Enter',
      keyCode: 13,
      which: 13,
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

export function pressSpace(node = document.activeElement) {
  const events = [
    new KeyboardEvent('keydown', {
      key: 'Space',
      keyCode: 32,
      which: 32,
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
