/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { pascalCase } = require('change-case');
const Joi = require('joi');

// Computed property for icons to determine their module name in code
const moduleName = {
  name: 'moduleName',
  computed: true,
  extend(metadata) {
    for (const icon of metadata.icons) {
      icon.moduleName = getModuleName(icon.name, icon.namespace);
    }
  },
};

/**
 * Get the module name for a given icon basename and optional prefixes
 * @param {string} name
 * @param {Array<string>} [prefix]
 * @returns {string}
 */
function getModuleName(name, parts = []) {
  const namespace = parts.map(part => pascalCase(part)).join('');
  if (namespace !== '') {
    return `${namespace}${pascalCase(name)}`;
  }

  if (isNaN(name[0])) {
    return pascalCase(name);
  }

  return '_' + pascalCase(name);
}

module.exports = moduleName;
