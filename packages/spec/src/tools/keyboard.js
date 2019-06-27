/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export function pressEnter(node) {
  let event;

  if (node.tagName === 'BUTTON') {
    event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
  } else {
    event = new KeyboardEvent('keydown', {
      key: 'Enter',
      keyCode: 13,
      which: 13,
      bubbles: true,
      cancelable: true,
    });
  }
  node.dispatchEvent(event);
  return node;
}

export function pressSpace(node = document.activeElement) {
  let event;

  if (node.tagName === 'BUTTON') {
    event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
  } else {
    event = new KeyboardEvent('keydown', {
      key: 'Space',
      keyCode: 32,
      which: 32,
      bubbles: true,
      cancelable: true,
    });
  }
  node.dispatchEvent(event);
  return node;
}
