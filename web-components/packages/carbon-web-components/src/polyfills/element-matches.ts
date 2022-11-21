/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const matchesFuncName = [
  'matches',
  'webkitMatchesSelector',
  'msMatchesSelector',
].filter((name) => typeof Element.prototype[name] === 'function')[0];

if (matchesFuncName !== 'matches') {
  Element.prototype.matches = Element.prototype[matchesFuncName];
}
