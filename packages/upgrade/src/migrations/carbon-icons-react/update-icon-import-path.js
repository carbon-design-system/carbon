/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

// 1) import SomeIconName from '@carbon/icons-react/es/add/size';
// 2) import SomeIconName from '@carbon/icons-react/lib/add/size';
// 3) Handle multiple icon imports and consolidate into one
module.exports = (file, api, options) => {
  const j = api.jscodeshift;
  const root = j(file.source);
  const importsToReplace = [];
  let highestIndex = -Infinity;

  root
    .find(j.ImportDeclaration)
    .filter(path => path.value.source.value.includes('@carbon/icons-react'))
    .forEach(path => {
      const [
        _scope,
        _packageName,
        _moduleType,
        name,
        size,
      ] = path.value.source.value.split('/');

      // When working in a collection, the name of the path is its index
      if (path.name > highestIndex) {
        highestIndex = path.name;
      }

      importsToReplace.push({ name, size });
      j(path).remove();
    });

  if (importsToReplace.length === 0) {
    return;
  }

  const iconImport = j.importDeclaration(
    importsToReplace.map(({ name, size }) => {
      return j.importSpecifier(j.identifier(name));
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
