/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import htm from 'htm';

const nsTags = new Set([
  'circle',
  'defs',
  'desc',
  'ellipse',
  'g',
  'line',
  'path',
  'pattern',
  'polygon',
  'rect',
  'style',
  'svg',
  'text',
  'textPath',
  'title',
  'use',
]);

export function createElement(tagName, attributes = {}, ...children) {
  const node = !nsTags.has(tagName)
    ? document.createElement(tagName)
    : document.createElementNS('http://www.w3.org/2000/svg', tagName);

  if (attributes) {
    Object.keys(attributes).forEach(attribute => {
      if (attribute === 'class') {
        node.classList.add(attributes[attribute]);
      } else {
        node.setAttribute(attribute, attributes[attribute]);
      }
    });
  }

  for (const child of children) {
    if (typeof child === 'string') {
      node.appendChild(document.createTextNode(child));
      continue;
    }

    // Supported nested case in children argument position
    if (Array.isArray(child)) {
      for (const nestedChild of child) {
        node.appendChild(nestedChild);
      }
      continue;
    }

    node.appendChild(child);
  }

  return node;
}

export function createExpected(tagName, attributes = {}, ...children) {
  const node = {
    nodeName: tagName.toUpperCase(),
    tagName: tagName.toUpperCase(),
    attributes: {},
    children,
  };

  if (attributes) {
    Object.keys(attributes).forEach(key => {
      node.attributes[key] = attributes[key];
    });
  }

  return node;
}

export const html = htm.bind(createElement);
export const spec = htm.bind(createExpected);
