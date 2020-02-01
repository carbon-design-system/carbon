/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const Joi = require('joi');
const categories = require('./categories');
const deprecated = require('./deprecated');
const icons = require('./icons');
const moduleName = require('./module-name');

module.exports = {
  categories,
  deprecated,
  icons,
  moduleName,
};
