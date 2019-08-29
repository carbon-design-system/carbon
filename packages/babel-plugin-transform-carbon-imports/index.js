/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const packageJson = require('./package.json');
const paths = require('./paths');

const supportedPackages = {
  'carbon-components-react': true,
};

const normalize = options => {
  const defaults = {
    throwOnNamespace: true,
  };
  return Object.assign({}, defaults, options);
};

module.exports = ({ types: t }, options) => {
  const { throwOnNamespace } = normalize(options);
  return {
    name: packageJson.name,
    visitor: {
      ImportDeclaration(path) {
        if (!supportedPackages[path.node.source.value]) {
          return;
        }

        const namespaceSpecifiers = path.node.specifiers.filter(
          s => s.type === 'ImportNamespaceSpecifier'
        );

        if (namespaceSpecifiers.length > 0) {
          if (throwOnNamespace) {
            throw new Error(
              `[${packageJson.name}] does not support the \`import *\` ` +
                'syntax by default as it causes the whole bundle to be ' +
                'included. Instead use the `import { ComponentName } from` ' +
                'syntax. If you want to override this option, pass in ' +
                '{`"throwOnNamespace": false}` as an option to the plugin.'
            );
          }
          return;
        }

        const specifiers = path.node.specifiers.map(s => ({
          name: s.imported.name,
          local: s.local.name,
        }));

        const invalidNames = specifiers
          .filter(({ name }) => !paths[name])
          .map(({ name }) => name);
        if (invalidNames.length > 0) {
          throw new Error(
            `[${packageJson.name}] encountered the following imports that ` +
              'are not currently exported by `carbon-components-react`: [' +
              invalidNames.join(' ') +
              ']'
          );
        }

        // Collect imports and place them into groups based on path
        const importGroups = specifiers.reduce((acc, specifier) => {
          const { path } = paths[specifier.name];
          if (acc[path]) {
            const info = Object.assign({}, acc[path]);
            info.specifiers.push(specifier);
            return Object.assign({}, acc, {
              [path]: info,
            });
          }

          return Object.assign({}, acc, {
            [path]: {
              specifiers: [specifier],
            },
          });
        }, {});

        const imports = Object.keys(importGroups).map(path => {
          const { specifiers } = importGroups[path];
          const importSpecifiers = specifiers.map(({ name, local }) => {
            const importName = name === local ? name : local;
            const { importSpecifier } = paths[name];

            if (importSpecifier) {
              return t.importSpecifier(t.identifier(local), t.identifier(name));
            }

            return t.importDefaultSpecifier(t.identifier(importName));
          });

          return t.importDeclaration(importSpecifiers, t.stringLiteral(path));
        });

        path.replaceWithMultiple(imports);
      },
    },
  };
};
