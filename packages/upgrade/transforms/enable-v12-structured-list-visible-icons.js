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
  const rowGeneratorFunctions = new Map(); // Using Map for better performance

  // Collect functions that generate StructuredListRows
  collectRowGenerators(j, root, rowGeneratorFunctions);

  // Transform components inside selection wrappers
  transformSelectionWrappers(j, root, rowGeneratorFunctions);

  return root.toSource(printOptions);
}

function collectRowGenerators(j, root, rowGeneratorFunctions) {
  // Function types to search for
  const functionTypes = [
    j.FunctionDeclaration,
    j.ArrowFunctionExpression,
    j.FunctionExpression,
  ];

  functionTypes.forEach((type) => {
    root.find(type).forEach((func) => {
      // Skip if function doesn't contain StructuredListRow
      if (!containsJsxElement(j, func, STRUCTURED_LIST_ROW)) {
        return;
      }

      const name = extractFunctionName(func);
      if (name) {
        rowGeneratorFunctions.set(name, func);
      }
    });
  });
}

function containsJsxElement(j, node, elementName) {
  return (
    j(node)
      .find(j.JSXElement, {
        openingElement: { name: { name: elementName } },
      })
      .size() > 0
  );
}

function extractFunctionName(func) {
  // Direct function name
  if (func.node.id) {
    return func.node.id.name;
  }

  const { type } = func.parent.node;

  // Variable declaration (const fn = () => {})
  if (type === 'VariableDeclarator' && func.parent.node.id) {
    return func.parent.node.id.name;
  }

  // Object property (obj = { fn: () => {} })
  if (
    (type === 'Property' || type === 'ObjectProperty') &&
    func.parent.node.key
  ) {
    return func.parent.node.key.name;
  }

  // Assignment (exports.fn = () => {})
  if (type === 'AssignmentExpression') {
    const { left } = func.parent.node;

    // Simple assignment (fn = () => {})
    if (left.name) {
      return left.name;
    }

    // Member expression (obj.fn = () => {})
    if (left.type === 'MemberExpression' && left.property) {
      return left.property.name;
    }
  }

  return null;
}

function transformSelectionWrappers(j, root, rowGeneratorFunctions) {
  // Find all wrappers with selection prop
  const selectionWrappers = root.find(j.JSXElement, {
    openingElement: {
      name: { name: STRUCTURED_LIST_WRAPPER },
      attributes: (attrs) => hasAttribute(attrs, ATTR_SELECTION),
    },
  });

  // Process each wrapper
  selectionWrappers.forEach((wrapper) => {
    // Process direct rows in wrapper
    processRows(j, wrapper);

    // Process function calls in wrapper
    processFunctionCalls(j, root, wrapper, rowGeneratorFunctions);

    // Process map callbacks in wrapper
    processMapCallbacks(j, wrapper);
  });
}

function hasAttribute(attrs, attrName) {
  return attrs.some(
    (attr) => attr.type === 'JSXAttribute' && attr.name.name === attrName
  );
}

function processRows(j, wrapper) {
  j(wrapper)
    .find(j.JSXElement, {
      openingElement: { name: { name: STRUCTURED_LIST_ROW } },
    })
    .forEach((row) => transformRow(j, row));
}

function processFunctionCalls(j, root, wrapper, rowGeneratorFunctions) {
  const processedFunctions = new Set();

  j(wrapper)
    .find(j.JSXExpressionContainer)
    .find(j.CallExpression)
    .forEach((call) => {
      const funcName = extractCalledFunctionName(call);

      // Skip if not a row generator or already processed
      if (
        !funcName ||
        !rowGeneratorFunctions.has(funcName) ||
        processedFunctions.has(funcName)
      ) {
        return;
      }

      processedFunctions.add(funcName);
      const func = rowGeneratorFunctions.get(funcName);

      // For function declarations
      if (func.type === 'FunctionDeclaration') {
        transformFunctionBody(j, func);
        return;
      }

      // For arrow functions and function expressions
      transformFunctionBody(j, func);
    });
}

function extractCalledFunctionName(call) {
  const { callee } = call.node;

  // Direct function call: func()
  if (callee.type === 'Identifier') {
    return callee.name;
  }

  if (
    callee.type === 'MemberExpression' &&
    callee.property.type === 'Identifier' &&
    callee.property.name !== 'map'
  ) {
    return callee.property.name;
  }

  return null;
}

function processMapCallbacks(j, wrapper) {
  j(wrapper)
    .find(j.CallExpression, { callee: { property: { name: 'map' } } })
    .forEach((mapCall) => {
      const callback = mapCall.node.arguments[0];

      if (!callback) {
        return;
      }

      // Only process function expressions or arrow functions
      if (
        callback.type !== 'ArrowFunctionExpression' &&
        callback.type !== 'FunctionExpression'
      ) {
        return;
      }

      // Find and transform all rows in the callback
      j(callback)
        .find(j.JSXElement, {
          openingElement: { name: { name: STRUCTURED_LIST_ROW } },
        })
        .forEach((row) => transformRow(j, row));
    });
}

function transformFunctionBody(j, func) {
  // Transform direct StructuredListRow elements
  j(func)
    .find(j.JSXElement, {
      openingElement: { name: { name: STRUCTURED_LIST_ROW } },
    })
    .forEach((row) => transformRow(j, row));

  // Transform rows in map callbacks
  j(func)
    .find(j.CallExpression, { callee: { property: { name: 'map' } } })
    .forEach((mapCall) => {
      const callback = mapCall.node.arguments[0];

      if (
        !callback ||
        (callback.type !== 'ArrowFunctionExpression' &&
          callback.type !== 'FunctionExpression')
      ) {
        return;
      }

      j(callback)
        .find(j.JSXElement, {
          openingElement: { name: { name: STRUCTURED_LIST_ROW } },
        })
        .forEach((row) => transformRow(j, row));
    });
}

function transformRow(j, row) {
  // Add selection prop to all rows (including those with head prop)
  addSelectionPropIfMissing(j, row);

  // Only remove CheckmarkFilled cells from non-head rows
  if (!hasElementAttribute(row, ATTR_HEAD)) {
    removeCheckmarkCells(j, row);
  }
}

function hasElementAttribute(element, attrName) {
  return element.node.openingElement.attributes.some(
    (attr) => attr.type === 'JSXAttribute' && attr.name.name === attrName
  );
}

function addSelectionPropIfMissing(j, row) {
  if (!hasElementAttribute(row, ATTR_SELECTION)) {
    row.node.openingElement.attributes.push(
      j.jsxAttribute(j.jsxIdentifier(ATTR_SELECTION))
    );
  }
}

function removeCheckmarkCells(j, row) {
  row.node.children = row.node.children.filter((child) => {
    // Only check JSX elements that are StructuredListCell
    if (
      child.type !== 'JSXElement' ||
      child.openingElement.name.name !== STRUCTURED_LIST_CELL
    ) {
      return true;
    }

    // Keep cells that don't contain CheckmarkFilled
    return !j(child)
      .find(j.JSXElement, {
        openingElement: { name: { name: CHECKMARK_FILLED } },
      })
      .size();
  });
}

module.exports = transform;
module.exports.parser = 'tsx';
