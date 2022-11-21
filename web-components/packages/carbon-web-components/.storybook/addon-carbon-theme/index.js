/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

function managerEntries(entry = []) {
  return [...entry, require.resolve('./register.tsx')];
}

module.exports = {
  managerEntries,
};
