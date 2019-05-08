/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

async function flatMapAsync(source, mapFn) {
  const results = await Promise.all(source.map(mapFn));
  return results.reduce((acc, result) => acc.concat(result), []);
}

module.exports = {
  flatMapAsync,
};
