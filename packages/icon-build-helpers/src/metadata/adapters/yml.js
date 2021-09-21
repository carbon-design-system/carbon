/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const yaml = require('js-yaml');
const path = require('path');

/**
 * Get the filename for a given path basename. This is helpful to
 * figure out which file we need to load in from the filesystem for the given
 * adapter.
 * @param {string} name
 * @returns {string}
 */
function getFilenameFor(name) {
  return path.format({
    name,
    ext: '.yml',
  });
}

/**
 * Serialize the given data to a YML format
 * @param {object} data
 * @returns {string}
 */
function serialize(data) {
  return yaml.safeDump(data);
}

/**
 * Deserialize the given YML data to JavaScript
 * @param {object} data
 * @returns {string}
 */
function deserialize(data) {
  return yaml.safeLoad(data);
}

/**
 * @param {string} directory
 * @param {string} name
 * @returns {Promise<any>}
 */
async function read(directory, name) {
  const filepath = path.join(directory, getFilenameFor(name));

  if (!(await fs.pathExists(filepath))) {
    throw new Error(
      `Unable to find extension \`${name}\` at filepath: ` +
        `${filepath}. Either create the file or update the extension ` +
        `to be computed.`
    );
  }

  return deserialize(await fs.readFile(filepath, 'utf8'));
}

/**
 * @param {string} directory
 * @param {string} name
 * @param {any} data
 * @returns {Promise<void>}
 */
async function write(directory, name, data) {
  const filepath = path.join(directory, getFilenameFor(name));

  await fs.ensureFile(filepath);
  await fs.writeFile(filepath, serialize(data), 'utf8');
}

module.exports = {
  serialize,
  deserialize,
  read,
  write,
};
