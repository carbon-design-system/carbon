/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Various utilities to help with a11y work
 */

/**
 * A flag `node.compareDocumentPosition(target)` returns,
 * that indicates `target` is located earlier than `node` in the document or `target` contains `node`.
 */
export const DOCUMENT_POSITION_BROAD_PRECEDING =
  // Checks `typeof Node` for `react-docgen`
  typeof Node !== 'undefined' &&
  // eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
  Node.DOCUMENT_POSITION_PRECEDING | Node.DOCUMENT_POSITION_CONTAINS;

/**
 * A flag `node.compareDocumentPosition(target)` returns,
 * that indicates `target` is located later than `node` in the document or `node` contains `target`.
 */
export const DOCUMENT_POSITION_BROAD_FOLLOWING =
  // Checks `typeof Node` for `react-docgen`
  typeof Node !== 'undefined' &&
  // eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
  Node.DOCUMENT_POSITION_FOLLOWING | Node.DOCUMENT_POSITION_CONTAINED_BY;

/**
 * CSS selector that selects major nodes that are sequential-focusable.
 */
export const selectorTabbable = `
  a[href], area[href], input:not([disabled]):not([tabindex='-1']),
  button:not([disabled]):not([tabindex='-1']),select:not([disabled]):not([tabindex='-1']),
  textarea:not([disabled]):not([tabindex='-1']),
  iframe, object, embed, *[tabindex]:not([tabindex='-1']):not([disabled]), *[contenteditable=true]
`;

/**
 * CSS selector that selects major nodes that are click focusable
 */
export const selectorFocusable = `
  a[href], area[href], input:not([disabled]),
  button:not([disabled]),select:not([disabled]),
  textarea:not([disabled]),
  iframe, object, embed, *[tabindex]:not([disabled]), *[contenteditable=true]
`;
