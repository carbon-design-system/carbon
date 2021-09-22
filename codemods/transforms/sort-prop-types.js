/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const defaultOptions = {
  quote: 'single',
  trailingComma: true,
};

function transform(fileInfo, api, options) {
  const printOptions = options.printOptions || defaultOptions;
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  root
    .find(j.AssignmentExpression, {
      left: {
        type: 'MemberExpression',
        property: {
          name: 'propTypes',
        },
      },
    })
    .forEach((path) => {
      path.node.right.properties.sort((a, b) => {
        if (a.type === 'Property' && b.type === 'Property') {
          if (getPropName(a) > getPropName(b)) {
            return 1;
          }
          return -1;
        }

        if (a.type === 'SpreadElement' && b.type === 'SpreadElement') {
          if (getPropName(a) > getPropName(b)) {
            return 1;
          }
          return -1;
        }

        if (a.type === 'SpreadElement') {
          return -1;
        }

        return 1;
      });
    });

  root
    .find(j.ClassProperty, {
      key: {
        name: 'propTypes',
      },
    })
    .forEach((path) => {
      path.node.value.properties.sort((a, b) => {
        if (getPropName(a) > getPropName(b)) {
          return 1;
        }
        return -1;
      });
    });

  function getPropName(node) {
    if (node.type === 'SpreadElement') {
      return node.argument.name;
    }

    if (node.type === 'Property') {
      if (node.key.type === 'Identifier') {
        return node.key.name;
      }
      if (node.key.type === 'Literal') {
        return node.key.value;
      }
    }

    throw new Error(`Unknown node of type: ${node.type}`);
  }

  return root.toSource(printOptions);
}

module.exports = transform;
