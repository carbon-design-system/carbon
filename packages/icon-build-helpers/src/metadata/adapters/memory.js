/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');

const filesystem = new Map();

/**
 * @param {string} directory
 * @param {string} name
 * @returns {Promise<any>}
 */
async function read(directory, name) {
  const filepath = path.join(directory, path.format({ name }));

  if (filesystem.has(filepath)) {
    return filesystem.get(filepath);
  }

  throw new Error(
    `Unable to find extension \`${name}\` at filepath: ${filepath}`
  );
}

/**
 * @param {string} directory
 * @param {string} name
 * @param {any} data
 * @returns {Promise<void>}
 */
async function write(directory, name, data) {
  const filepath = path.join(directory, path.format({ name }));
  filesystem.set(filepath, data);
}

module.exports = {
  read,
  write,
  filesystem,
};
