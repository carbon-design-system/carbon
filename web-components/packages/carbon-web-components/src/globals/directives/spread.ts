/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Part, PropertyPart, directive } from 'lit-html';

export interface AttributesInfo {
  readonly [name: string]: string;
}

/**
 * Stores the ClassInfo object applied to a given AttributePart.
 * Used to unset existing values when a new ClassInfo object is applied.
 */
const attributesMapCache = new WeakMap();

/**
 * A directive that applies attributes from a key-value pairs.
 * This must be used in the `...` name and must be the only part used in the attribute.
 * It applies the key-value pairs in the `attributesInfo` argument
 * and sets them as attribute name/value pairs.
 * @param classInfo The key-value pair to be set as the attribute name/value pairs.
 */
const spread = directive((attributesInfo: AttributesInfo) => (part: Part) => {
  // The first character of `...` is interpreted as one for `PropertyPart`
  if (!(part instanceof PropertyPart) || part.committer.name !== '..' || part.committer.parts.length > 1) {
    throw new Error('The `spread` directive must be used in with `...` name and must be the only part in the attribute.');
  }

  const { committer } = part;
  const { element } = committer;

  // Removes old attributes that are no longer there
  const oldAttributesInfo = attributesMapCache.get(part);
  if (oldAttributesInfo) {
    Object.keys(oldAttributesInfo).forEach(name => {
      if (!(name in attributesInfo)) {
        element.removeAttribute(name);
      }
    });
  }

  // Adds new attributes
  Object.keys(attributesInfo).forEach(name => {
    const value = attributesInfo[name];
    if ((!oldAttributesInfo || !Object.is(value, oldAttributesInfo[name])) && typeof value !== 'undefined') {
      element.setAttribute(name, value);
    }
  });

  // Updates the cache
  attributesMapCache.set(part, attributesInfo);
});

export default spread;
