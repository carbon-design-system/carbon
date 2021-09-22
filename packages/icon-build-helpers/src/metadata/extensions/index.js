/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const assets = require('./assets');
const categories = require('./categories');
const deprecated = require('./deprecated');
const icons = require('./icons');
const moduleName = require('./module-name');
const moduleInfo = require('./module-info');
const output = require('./output');
const pictograms = require('./pictograms');

/**
 * @typedef {object} Extension
 * @property {string} name - the name of the extension
 * @property {JoiSchema} [schema] - a schema that validates the structure of
 * the file for an extension
 * @property {Function} [extend] - add information for the extension to the
 * output metadata structure
 * @property {Function} [validate] - validate that the data available in the
 * registry matches the data received for the extension
 */

module.exports = {
  assets,
  categories,
  deprecated,
  icons,
  moduleName,
  moduleInfo,
  output,
  pictograms,
};
