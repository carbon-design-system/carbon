/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { pascal } = require('change-case');

module.exports = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);
  const importsToReplace = [];
  let highestIndex = -Infinity;

  root
    .find(j.ImportDeclaration)
    .filter(path => path.value.source.value.includes('@carbon/icons-react'))
    .forEach(path => {
      const { node } = path;
      const [
        _scope,
        _packageName,
        _moduleType,
        ...rest
      ] = node.source.value.split('/');

      let name;
      let size;
      let prefix = [];

      if (rest.length === 1) {
        name = rest[0];
      } else if (rest.length === 2) {
        name = rest[0];

        if (rest[1] !== 'index') {
          size = rest[1];
        }
      } else if (rest.length > 2) {
        throw new Error(
          `Unable to automatically update the icon import in file ` +
            `${file.path}. The import path ${node.source.value} is ambiguous.`
        );
      }

      // When working in a collection, the name of the path is its index
      if (path.name > highestIndex) {
        highestIndex = path.name;
      }

      const localName = node.specifiers[0].local.name;
      importsToReplace.push({
        name,
        size: size !== 'index' ? size : null,
        prefix,
        localName,
      });

      j(path).remove();
    });

  if (importsToReplace.length === 0) {
    return;
  }

  const iconImport = j.importDeclaration(
    importsToReplace.map(({ localName, name, prefix, size }) => {
      return j.importSpecifier(
        j.identifier(getModuleName(name, size, prefix)),
        j.identifier(localName)
      );
    }),
    j.stringLiteral('@carbon/icons-react')
  );

  root.find(j.Program).forEach(path => {
    const { node } = path;
    node.body = [
      ...node.body.slice(0, highestIndex),
      iconImport,
      ...node.body.slice(highestIndex, node.body.length),
    ];
  });

  // TODO make printing configurable
  return root.toSource({ quote: 'single' });
};

function getModuleName(name, size, prefixParts) {
  const prefix = prefixParts
    .filter(size => isNaN(size))
    .map(pascal)
    .join('');

  if (prefix !== '') {
    if (!size) {
      return prefix + pascal(name) + 'Glyph';
    }
    return prefix + pascal(name) + size;
  }

  if (!size) {
    return pascal(name) + 'Glyph';
  }

  if (isNaN(name[0])) {
    return pascal(name) + size;
  }

  return '_' + pascal(name) + size;
}
