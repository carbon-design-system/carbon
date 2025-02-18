/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
'use strict';

const defaultOptions = {
  quote: 'single',
  trailingComma: true,
};

function addSelectionToRow(j, path) {
  const hasSelectionProp = path.node.openingElement.attributes.some(
    (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'selection'
  );

  if (!hasSelectionProp) {
    path.node.openingElement.attributes.push(
      j.jsxAttribute(j.jsxIdentifier('selection'))
    );
  }
}

function removeLastCheckmarkCell(j, path) {
  const checkmarkCells = j(path)
    .find(j.JSXElement, {
      openingElement: { name: { name: 'StructuredListCell' } },
    })
    .filter((cellPath) => {
      return (
        j(cellPath)
          .find(j.JSXElement, {
            openingElement: { name: { name: 'CheckmarkFilled' } },
          })
          .size() > 0
      );
    });

  if (checkmarkCells.size() > 0) {
    checkmarkCells.at(-1).remove();
  }
}

function transform(fileInfo, api, options) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const printOptions = options.printOptions || defaultOptions;

  // Tracks functions that generate StructuredListRows
  const rowGeneratorFunctions = new Set();

  // Find functions which have rows
  root.find(j.ArrowFunctionExpression).forEach((path) => {
    const hasStructuredListRow =
      j(path)
        .find(j.JSXElement, {
          openingElement: { name: { name: 'StructuredListRow' } },
        })
        .size() > 0;

    if (hasStructuredListRow) {
      const functionName =
        path.parent.value.id?.name ||
        path.parent.value.key?.name ||
        path.parent.parent.value?.id?.name;
      if (functionName) {
        rowGeneratorFunctions.add(functionName);
      }
    }
  });

  // Finds StructuredListWrappers with selection prop
  root
    .find(j.JSXElement, {
      openingElement: {
        name: { name: 'StructuredListWrapper' },
        attributes: (attrs) =>
          attrs.some(
            (attr) =>
              attr.type === 'JSXAttribute' && attr.name.name === 'selection'
          ),
      },
    })
    .forEach((path) => {
      // Add selection to direct StructuredListRows
      j(path)
        .find(j.JSXElement, {
          openingElement: { name: { name: 'StructuredListRow' } },
        })
        .forEach((rowPath) => {
          addSelectionToRow(j, rowPath);
          removeLastCheckmarkCell(j, rowPath);
        });

      // Handle function-generated rows
      j(path)
        .find(j.CallExpression)
        .forEach((callPath) => {
          const functionName = callPath.node.callee.name;
          if (rowGeneratorFunctions.has(functionName)) {
            root
              .find(j.ArrowFunctionExpression)
              .filter((p) => {
                const name =
                  p.parent.value.id?.name ||
                  p.parent.value.key?.name ||
                  p.parent.parent.value?.id?.name;
                return name === functionName;
              })
              .forEach((funcPath) => {
                j(funcPath)
                  .find(j.JSXElement, {
                    openingElement: { name: { name: 'StructuredListRow' } },
                  })
                  .forEach((rowPath) => {
                    addSelectionToRow(j, rowPath);
                    removeLastCheckmarkCell(j, rowPath);
                  });
              });
          }
        });
    });

  return root.toSource(printOptions);
}

module.exports = transform;
module.exports.parser = 'tsx';
