/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { pascalCase } = require('change-case');

/**
 *
 */
function getModuleName(name, size, namespace = []) {
  let moduleName = namespace
    .filter(size => isNaN(size))
    .map(pascalCase)
    .join('');

  moduleName = moduleName + pascalCase(name);

  if (size) {
    moduleName = moduleName + size;
  }

  if (!isNaN(moduleName[0])) {
    moduleName = '_' + moduleName;
  }

  return moduleName;

  const width = parseInt(descriptor.attrs.width, 10);
  const height = parseInt(descriptor.attrs.height, 10);
  let prefix = namespace
    .filter(size => isNaN(size))
    .map(pascalCase)
    .join('');
  const isGlyph = width < 16 || height < 16;
  const isPictogram = width > 32 || height > 32;

  if (prefix !== '') {
    if (prefix.match(/^\d/)) {
      prefix = '_' + prefix;
    }
    if (!size) {
      if (isGlyph) {
        return prefix + pascalCase(name) + 'Glyph';
      }
      return prefix + pascalCase(name);
    }
    return prefix + pascalCase(name) + size;
  }

  if (!size) {
    if (isGlyph) {
      return pascalCase(name) + 'Glyph';
    }
    if (isNaN(name[0])) {
      return pascalCase(name);
    }
    return '_' + pascalCase(name);
  }

  if (isNaN(name[0])) {
    return pascalCase(name) + size;
  }

  return '_' + pascalCase(name) + size;
}

module.exports = {
  getModuleName,
};
