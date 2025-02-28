/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
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

  // Track function names used inside StructuredListWrapper
  const functionsUsedInWrappers = new Set();

  // First pass: Find all wrappers and identify functions used within them
  findFunctionsUsedInWrappers(j, root, functionsUsedInWrappers);

  // Second pass: Process identified functions and wrappers
  transformSelectionWrappers(j, root, functionsUsedInWrappers);

  return root.toSource(printOptions);
}

function findFunctionsUsedInWrappers(j, root, functionsUsedInWrappers) {
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
      // Find all function calls within this wrapper
      j(wrapper)
        .find(j.JSXExpressionContainer)
        .find(j.CallExpression)
        .forEach((call) => {
          // If it's a direct call to a function
          if (call.node.callee.type === 'Identifier') {
            const funcName = call.node.callee.name;
            functionsUsedInWrappers.add(funcName);
          }
        });
    });
}

function transformSelectionWrappers(j, root, functionsUsedInWrappers) {
  transformIdentifiedFunctions(j, root, functionsUsedInWrappers);

  // Then transform the wrappers themselves
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
      // Transform direct rows in wrapper
      j(wrapper)
        .find(j.JSXElement, {
          openingElement: { name: { name: STRUCTURED_LIST_ROW } },
        })
        .forEach((row) => transformRow(j, row));
    });
}

function transformIdentifiedFunctions(j, root, functionsUsedInWrappers) {
  if (functionsUsedInWrappers.size === 0) return;

  // Process regular function declarations
  root
    .find(j.FunctionDeclaration)
    .filter(
      (func) => func.node.id && functionsUsedInWrappers.has(func.node.id.name)
    )
    .forEach((func) => processNodeIfGeneratesRows(j, func));

  // Process arrow functions in variable declarations
  root
    .find(j.VariableDeclarator)
    .filter((decl) => {
      // Must be named function in our set and be an arrow function
      return (
        decl.node.id &&
        functionsUsedInWrappers.has(decl.node.id.name) &&
        decl.node.init &&
        decl.node.init.type === 'ArrowFunctionExpression'
      );
    })
    .forEach((func) => processNodeIfGeneratesRows(j, func));
}

function processNodeIfGeneratesRows(j, func) {
  // Find all StructuredListRow elements inside this function
  j(func)
    .find(j.JSXElement, {
      openingElement: { name: { name: STRUCTURED_LIST_ROW } },
    })
    .forEach((row) => transformRow(j, row));
}

function transformRow(j, row) {
  // Add selection prop to all rows if missing
  const hasSelectionProp = row.node.openingElement.attributes.some(
    (attr) => attr.type === 'JSXAttribute' && attr.name.name === ATTR_SELECTION
  );

  if (!hasSelectionProp) {
    row.node.openingElement.attributes.push(
      j.jsxAttribute(j.jsxIdentifier(ATTR_SELECTION))
    );
  }

  // Only remove CheckmarkFilled cells from non-head rows
  const hasHeadProp = row.node.openingElement.attributes.some(
    (attr) => attr.type === 'JSXAttribute' && attr.name.name === ATTR_HEAD
  );

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
