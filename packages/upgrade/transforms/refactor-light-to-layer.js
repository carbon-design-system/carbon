/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Deprecate the `light` prop and wrap components with `Layer`
 *
 * Transforms:
 *
 * <Button light>Click me</Button>
 *
 * Into:
 *
 * <Layer>
 *   <Button>Click me</Button>
 * </Layer>
 */

'use strict';

const defaultOptions = {
  quote: 'single',
  trailingComma: true,
};

function transform(fileInfo, api, options) {
  const { jscodeshift: j } = api;
  const root = j(fileInfo.source);
  const printOptions = options.printOptions || defaultOptions;

  // Check if there are any components with the 'light' prop
  const hasLightProp =
    root.find(j.JSXAttribute, { name: { name: 'light' } }).size() > 0;

  if (!hasLightProp) {
    return null; // if no 'light' prop found, don't modify & return the file
  }

  // Import Layer component if not already imported
  const layerImport = root.find(j.ImportDeclaration, {
    source: { value: '@carbon/react' },
  });

  if (layerImport.length) {
    const specifiers = layerImport.get('specifiers');
    const hasLayerImport = specifiers.value.some(
      (specifier) => specifier.imported && specifier.imported.name === 'Layer'
    );

    if (!hasLayerImport) {
      specifiers.value.push(j.importSpecifier(j.identifier('Layer')));
    }
  } else {
    const newImport = j.importDeclaration(
      [j.importSpecifier(j.identifier('Layer'))],
      j.literal('@carbon/react')
    );
    // Find the first import declaration
    const firstImport = root.find(j.ImportDeclaration).at(0);

    if (firstImport.length) {
      // Insert the new import before the first existing import
      firstImport.insertAfter(newImport);
    } else {
      // If no imports, find the first non-comment node
      const firstNonCommentNode = root
        .find(j.Program)
        .get('body')
        .filter(
          (path) =>
            path.value.type !== 'CommentBlock' &&
            path.value.type !== 'CommentLine'
        )[0];

      // Insert the new import before the first non-comment node
      j(firstNonCommentNode).insertBefore(newImport);
    }
  }

  // Find all JSX elements with a 'light' prop
  root.find(j.JSXElement).forEach((path) => {
    const lightProp = path.node.openingElement.attributes.find(
      (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'light'
    );

    if (lightProp) {
      // Remove the 'light' prop
      path.node.openingElement.attributes =
        path.node.openingElement.attributes.filter(
          (attr) => attr !== lightProp
        );
      // Wrap the component with Layer
      const layerElement = j.jsxElement(
        j.jsxOpeningElement(j.jsxIdentifier('Layer'), []),
        j.jsxClosingElement(j.jsxIdentifier('Layer')),
        [path.node]
      );

      // Replace the original element with the wrapped version
      j(path).replaceWith(layerElement);
    }
  });

  return root.toSource(printOptions);
}

module.exports = transform;
