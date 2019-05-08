/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import getAttributes from './getAttributes';

/**
 * Convert an icon descriptor to a String
 */
export default function toString(descriptor) {
  const { elem = 'svg', attrs = {}, content = [] } = descriptor;
  const children = content.map(toString).join('');
  if (elem !== 'svg') {
    return `<${elem} ${formatAttributes(attrs)}>${children}</${elem}>`;
  }
  return `<${elem} ${formatAttributes(
    getAttributes(attrs)
  )}>${children}</${elem}>`;
}

export function formatAttributes(attrs) {
  return Object.keys(attrs).reduce((acc, key, index) => {
    const attribute = `${key}="${attrs[key]}"`;
    if (index === 0) {
      return attribute;
    }
    return acc + ' ' + attribute;
  }, '');
}
