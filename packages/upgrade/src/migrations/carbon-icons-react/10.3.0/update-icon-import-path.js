/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { pascalCase } = require('change-case');

/**
 * This transform upgrades the import path that teams may be using for icons
 * currently to the new entrypoint pattern introduced in 10.4.0.
 *
 *   Input:
 *   import React from 'react';
 *   import Add from '@carbon/icons-react/lib/add/16';
 *   import Menu from '@carbon/icons-react/lib/menu/16';
 *
 *   Output:
 *   import React from 'react';
 *   import { Add16 as Add, Menu16 as Menu } from '@carbon/icons-react';
 */
module.exports = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  // We use the importIndex value to track where we need to place the captured
  // `importsToReplace`. Our heuristic for `importIndex` is that it should be
  // the lowest line number found for all `@carbon/icons-react` imports.
  const importsToReplace = [];
  let importIndex = Infinity;

  // Save the comments attached to the first node
  const getFirstNode = () => root.find(j.Program).get('body', 0).node;
  const firstNode = getFirstNode();
  const { comments } = firstNode;

  // Our first path through the file we look for import declarations that
  // include `@carbon/icons-react`. At the time of this transform, these paths
  // should match a shape that looks like:
  //
  //   import IconName from '@carbon/icons-react/<bundle>/<name>/<size>';
  root
    .find(j.ImportDeclaration)
    .filter(path => path.value.source.value.includes('@carbon/icons-react'))
    .forEach(path => {
      // For each node that we encounter that has `@carbon/icons-react` in the
      // import source, we need to slice off the first chunks from the value and
      // then capture all the icon-specific data. Depending on the length of
      // this data, we assign name, size, and prefix values.
      const { node } = path;

      // Ignore imports if they already directly reference the package or one of
      // its entrypoints that support tree-shaking
      if (
        node.source.value === '@carbon/icons-react' ||
        node.source.value === '@carbon/icons-react/es' ||
        node.source.value === '@carbon/icons-react/lib'
      ) {
        return;
      }

      const [
        _scope,
        _packageName,
        _moduleType,
        ...rest
      ] = node.source.value.split('/');

      let name;
      let size;
      let prefix = [];

      // We have a couple of situations we can run into with the length of `rest`:
      // (1) ['name-of-icon']
      // (2) ['name-of-icon', 'size-of-icon'] OR ['name-of-icon', 'index']
      // (3+) ['prefix-one', 'prefix-two', 'name-of-icon', 'size-of-icon']
      if (rest.length === 1) {
        name = rest[0];
      } else if (rest.length === 2) {
        name = rest[0];

        if (rest[1] !== 'index') {
          size = rest[1];
        }
      } else if (rest.length > 2) {
        let sliceToIndex = rest.length;
        if (isNaN(rest[rest.length - 1])) {
          name = rest[rest.length - 1];
          sliceToIndex = rest.length;
        } else if (!isNaN(rest[rest.length - 1])) {
          name = rest[rest.length - 2];
          size = rest[rest.length - 1];
          sliceToIndex = rest.length - 2;
        } else if (rest[rest.length - 1] === 'index') {
          name = rest[rest.length - 2];
          sliceToIndex = rest.length - 1;
        }

        prefix = rest.slice(0, sliceToIndex);
      }

      // When working in a collection, the name of the path is its index
      if (path.name < importIndex) {
        importIndex = path.name;
      }

      // Make sure to grab the local name so that we can keep the reference the
      // same.
      //
      //  Input:
      //  import CustomName from '@carbon/icons-react/lib/icon/size';
      //
      //  Output:
      //  import { IconSize as CustomName } from '@carbon/icons-react';
      const localName = node.specifiers[0].local.name;
      importsToReplace.push({
        name,
        size,
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

  // Finally, go through our program and insert our icon import declaration into
  // the index specified by `importIndex`
  root.find(j.Program).forEach(path => {
    const { node } = path;
    node.body = [
      ...node.body.slice(0, importIndex),
      iconImport,
      ...node.body.slice(importIndex, node.body.length),
    ];
  });

  // If the first node has been modified or deleted, reattach the comments
  const firstNode2 = getFirstNode();
  if (firstNode2 !== firstNode) {
    firstNode2.comments = comments;
  }

  // TODO make printing configurable
  return root.toSource({ quote: 'single' });
};

function getModuleName(name, size, prefixParts) {
  const prefix = prefixParts
    .filter(size => isNaN(size))
    .map(pascalCase)
    .join('');

  if (prefix !== '') {
    if (!size) {
      return prefix + pascalCase(name) + 'Glyph';
    }
    return prefix + pascalCase(name) + size;
  }

  if (!size) {
    return pascalCase(name) + 'Glyph';
  }

  if (isNaN(name[0])) {
    return pascalCase(name) + size;
  }

  return '_' + pascalCase(name) + size;
}
