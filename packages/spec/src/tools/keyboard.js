/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import tabbable from 'tabbable';

const keys = {
  ArrowUp: {
    which: 38,
    keyCode: 38,
    key: 'ArrowUp',
  },
  ArrowRight: {
    which: 39,
    keyCode: 39,
    key: 'ArrowRight',
  },
  ArrowDown: {
    which: 40,
    keyCode: 40,
    key: 'ArrowDown',
  },
  ArrowLeft: {
    which: 41,
    keyCode: 41,
    key: 'ArrowLeft',
  },
  End: {
    which: 35,
    keyCode: 35,
    key: 'End',
  },
  Home: {
    which: 36,
    keyCode: 36,
    key: 'Home',
  },
  PageUp: {
    which: 33,
    keyCode: 33,
    key: 'PageUp',
  },
  PageDown: {
    which: 34,
    keyCode: 34,
    key: 'PageDown',
  },
};

export function press(node, key, type = 'keydown') {
  node.dispatchEvent(new KeyboardEvent(type, keys[key]));
}

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

export function pressSpace(node) {
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
