/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const memory = require('./memory');
const yml = require('./yml');

/**
 * An adapter defines how we work with a specific file format and defines the
 * operations for reading and writing files of that type for a particular
 * location
 * @typedef {object} Adapter
 * @property {Function} read
 * @property {Function} write
 */

module.exports = {
  memory,
  yml,
};
