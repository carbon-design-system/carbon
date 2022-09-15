/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * @param a A DOM collection.
 * @param predicate The callback function.
 * @param [thisObject] The context object for the given callback function.
 * @returns A new array with all elements where `predicate` returns truthy.
 */
export const filter = (
  a: NodeListOf<Node> | HTMLCollectionOf<Element>,
  predicate: (search: Node, index?: number) => boolean,
  thisObject?: any
) => Array.prototype.filter.call(a, predicate, thisObject);

/**
 * @param a A DOM collection.
 * @param predicate The callback function.
 * @param [thisObject] The context object for the given callback function.
 * @returns The index of the first item in the given collection where `predicate` returns `true`. `-1` if no such item is found.
 */
export const findIndex = (
  a: NodeListOf<Node> | HTMLCollectionOf<Element>,
  predicate: (search: Node, index?: number) => boolean,
  thisObject?: any
) => Array.prototype.findIndex.call(a, predicate, thisObject);

/**
 * @param a A DOM collection.
 * @param predicate The callback function.
 * @param [thisObject] The context object for the given callback function.
 * @returns The first item in the given collection where `predicate` returns `true`. `null` if no such item is found.
 */
export const find = (
  a: NodeListOf<Node> | HTMLCollectionOf<Element>,
  predicate: (search: Node, index?: number) => boolean,
  thisObject?: any
) => Array.prototype.find.call(a, predicate, thisObject);

/**
 * Walks through the given DOM collection and runs the given callback.
 * @param a A DOM collection.
 * @param predicate The callback function.
 * @param [thisObject] The context object for the given callback function.
 */
export const forEach = (
  a: NodeListOf<Node> | HTMLCollectionOf<Element>,
  predicate: (search: Element, index?: number) => void,
  thisObject?: any
) => Array.prototype.forEach.call(a, predicate, thisObject);

/**
 * @param a A DOM collection.
 * @param item An item in the DOM collection.
 * @returns The index of the first occurence of the given item in the given collection. `-1` if no such item is found.
 */
export const indexOf = (a: NodeListOf<Node> | HTMLCollectionOf<Element>, item: Node) => Array.prototype.indexOf.call(a, item);
