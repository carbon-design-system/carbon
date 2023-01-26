/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  AttributePart,
  Directive,
  DirectiveParameters,
} from 'lit/directive.js';
import { directive } from 'lit/async-directive.js';

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
 *
 */
class SpreadDirective extends Directive {
  /**
   * The update function that handles the attribute setting.
   *
   * @param part an object with an API to manage the element's DOM
   * @param attributesInfo The key-value pair to be set as the attribute name/value pairs.
   * @returns the render function
   */
  update(part: AttributePart, [attributesInfo]: DirectiveParameters<this>) {
    const { element } = part;

    // Removes old attributes that are no longer there
    const oldAttributesInfo = attributesMapCache.get(part);
    if (oldAttributesInfo) {
      Object.keys(oldAttributesInfo).forEach((name) => {
        if (!(name in attributesInfo)) {
          element.removeAttribute(name);
        }
      });
    }

    // Adds new attributes
    Object.keys(attributesInfo).forEach((name) => {
      const value = attributesInfo[name];
      if (
        (!oldAttributesInfo || !Object.is(value, oldAttributesInfo[name])) &&
        typeof value !== 'undefined'
      ) {
        element.setAttribute(name, value);
      }
    });

    // Updates the cache
    attributesMapCache.set(part, attributesInfo);

    return this.render(attributesInfo);
  }

  /**
   * The rendering function that simply takes in the arguments to be used
   * in the update() function.
   *
   * @param attributesInfo The key-value pair to be set as the attribute name/value pairs.
   * @returns
   */
  render(attributesInfo: AttributesInfo) {
    return attributesInfo;
  }
}

const spread = directive(SpreadDirective);

export default spread;
