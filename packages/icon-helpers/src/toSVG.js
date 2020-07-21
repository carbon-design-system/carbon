/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import getAttributes from './getAttributes';

/**
 * Convert an icon descriptor to a DOM node.
 */
export default function toSVG(descriptor) {
  const { elem = 'svg', attrs = {}, content = [] } = descriptor;
  const node = document.createElementNS('http://www.w3.org/2000/svg', elem);
  const attributes = elem !== 'svg' ? attrs : getAttributes(attrs);

  Object.keys(attributes).forEach((key) => {
    node.setAttribute(key, attrs[key]);
  });

  for (let i = 0; i < content.length; i++) {
    node.appendChild(toSVG(content[i]));
  }

  return node;
}
