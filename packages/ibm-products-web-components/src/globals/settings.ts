/**
 *
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const prefix = 'c4p';
const carbonPrefix = 'cds';

/**
 * A selector selecting tabbable nodes.
 * Borrowed from `carbon-angular`. tabbable === focusable.
 */
const selectorTabbable = `
  ${prefix}-side-nav-link,
  ${prefix}-side-nav-menu,
  ${prefix}-side-nav-menu-item
`;
// Because we're going to have a bunch of exports
export { prefix, carbonPrefix, selectorTabbable };
