/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Inspired by fbjs:
// https://github.com/facebook/fbjs/blob/36f30888cfba866d44df61d5172f870b56c83d8e/packages/fbjs/src/core/ExecutionEnvironment.js#L7
export const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);
