/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { pascalCase } = require('change-case');

/**
 * @param {string} name
 * @param {(string | 'glyph')} [size]
 * @param {Array<string>} [namespace]
 * @returns {string}
 */
function getModuleName(name, size, namespace = []) {
  let moduleName = namespace
    .filter((size) => isNaN(size))
    .map(pascalCase)
    .join('');

  moduleName = moduleName + pascalCase(name);

  if (size) {
    if (size === 'glyph') {
      moduleName = moduleName + 'Glyph';
    } else {
      moduleName = moduleName + size;
    }
  }

  if (!isNaN(moduleName[0])) {
    moduleName = '_' + moduleName;
  }

  return moduleName;
}

module.exports = {
  getModuleName,
};
