/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
'use strict';

const STRUCTURED_LIST_WRAPPER = 'StructuredListWrapper';
const STRUCTURED_LIST_ROW = 'StructuredListRow';
const STRUCTURED_LIST_CELL = 'StructuredListCell';
const CHECKMARK_FILLED = 'CheckmarkFilled';
const ATTR_SELECTION = 'selection';
const ATTR_HEAD = 'head';

const defaultOptions = {
  quote: 'single',
  trailingComma: true,
};

function transform(fileInfo, api, options) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const printOptions = options.printOptions || defaultOptions;

  // Find all row generator functions regardless of name
  transformRowGeneratorFunctions(j, root);

  // Process all wrappers with selection prop
  transformSelectionWrappers(j, root);

  return root.toSource(printOptions);
}

function transformRowGeneratorFunctions(j, root) {
  // Process regular function declarations
  processNodesThatGenerateRows(j, root, root.find(j.FunctionDeclaration));

  // Process arrow functions in variable declarations
  root
    .find(j.VariableDeclarator)
    .filter((decl) => {
      // Check if it's an arrow function
      return (
        decl.node.init && decl.node.init.type === 'ArrowFunctionExpression'
      );
    })
    .forEach((func) => {
      processNodeIfGeneratesRows(j, func);
    });
}

function processNodesThatGenerateRows(j, root, collection) {
  collection.forEach((func) => {
    processNodeIfGeneratesRows(j, func);
  });
}

function processNodeIfGeneratesRows(j, func) {
  // Check if function contains a map that generates StructuredListRow
  const containsRowMap =
    j(func)
      .find(j.CallExpression, {
        callee: { property: { name: 'map' } },
      })
      .filter((mapCall) => {
        return (
          j(mapCall)
            .find(j.JSXElement, {
              openingElement: { name: { name: STRUCTURED_LIST_ROW } },
            })
            .size() > 0
        );
      })
      .size() > 0;

  if (containsRowMap) {
    // Find and transform all rows in map callbacks inside this function
    j(func)
      .find(j.JSXElement, {
        openingElement: { name: { name: STRUCTURED_LIST_ROW } },
      })
      .forEach((row) => transformRow(j, row));
  }
}

function transformSelectionWrappers(j, root) {
  // Find all wrappers with selection prop
  root
    .find(j.JSXElement, {
      openingElement: {
        name: { name: STRUCTURED_LIST_WRAPPER },
        attributes: (attrs) =>
          attrs.some(
            (attr) =>
              attr.type === 'JSXAttribute' && attr.name.name === ATTR_SELECTION
          ),
      },
    })
    .forEach((wrapper) => {
      // Find and transform direct rows in wrapper
      j(wrapper)
        .find(j.JSXElement, {
          openingElement: { name: { name: STRUCTURED_LIST_ROW } },
        })
        .forEach((row) => transformRow(j, row));

      // Find all function calls that might be generators
      j(wrapper)
        .find(j.JSXExpressionContainer)
        .find(j.CallExpression)
        .forEach((call) => {
          // If it's a direct call to a function (not a method like map)
          if (call.node.callee.type === 'Identifier') {
            const funcName = call.node.callee.name;

            // Find any function declaration with this name
            root
              .find(j.FunctionDeclaration)
              .filter((func) => func.node.id && func.node.id.name === funcName)
              .forEach((func) => {
                // Transform all rows inside that function
                j(func)
                  .find(j.JSXElement, {
                    openingElement: { name: { name: STRUCTURED_LIST_ROW } },
                  })
                  .forEach((row) => transformRow(j, row));
              });

            // Also check for variable declarations (for arrow functions)
            root
              .find(j.VariableDeclarator, { id: { name: funcName } })
              .forEach((func) => {
                // Transform all rows inside that function
                j(func)
                  .find(j.JSXElement, {
                    openingElement: { name: { name: STRUCTURED_LIST_ROW } },
                  })
                  .forEach((row) => transformRow(j, row));
              });
          }
        });
    });
}

function transformRow(j, row) {
  // Add selection prop to all rows (except those with head prop)
  const hasHeadProp = row.node.openingElement.attributes.some(
    (attr) => attr.type === 'JSXAttribute' && attr.name.name === ATTR_HEAD
  );

  const hasSelectionProp = row.node.openingElement.attributes.some(
    (attr) => attr.type === 'JSXAttribute' && attr.name.name === ATTR_SELECTION
  );

  // Add selection prop if it's missing
  if (!hasSelectionProp) {
    row.node.openingElement.attributes.push(
      j.jsxAttribute(j.jsxIdentifier(ATTR_SELECTION))
    );
  }

  // Only remove CheckmarkFilled cells from non-head rows
  if (!hasHeadProp) {
    // Filter out cells with CheckmarkFilled
    row.node.children = row.node.children.filter((child) => {
      // Only check JSX elements that are StructuredListCell
      if (
        child.type !== 'JSXElement' ||
        child.openingElement.name.name !== STRUCTURED_LIST_CELL
      ) {
        return true;
      }

      // Check if cell contains CheckmarkFilled
      return (
        j(child)
          .find(j.JSXElement, {
            openingElement: { name: { name: CHECKMARK_FILLED } },
          })
          .size() === 0
      );
    });
  }
}

module.exports = transform;
module.exports.parser = 'tsx';
