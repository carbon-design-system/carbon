/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const FileType = {
  CSS: 'css',
  Sass: 'scss',
  JavaScript: 'javascript',
  TypeScript: 'typescript',
};

function create({ contents, type }) {
  const imports = new Set();

  function getImports() {}

  function addImport() {}

  const exports = new Set();

  function getExports() {}

  const stats = {};

  return {
    type,
  };
}
