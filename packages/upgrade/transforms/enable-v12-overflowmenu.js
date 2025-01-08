/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Migrate OverflowMenu components by wrapping them with FeatureFlags
 *
 * Transforms:
 *
 * <OverflowMenu {...props} />
 *
 * Into:
 *
 * <FeatureFlags enableV12Overflowmenu>
 *   <OverflowMenu {...props} />
 * </FeatureFlags>
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

  // Early return if no OverflowMenu components found
  if (
    !root.find(j.JSXOpeningElement, { name: { name: 'OverflowMenu' } }).size()
  ) {
    return null;
  }

  let hasModifications = false;

  // Check if FeatureFlags import already exists
  const hasFeatureFlagsImport = root
    .find(j.ImportDeclaration)
    .some(
      (path) =>
        path.node.source.value === '@carbon/feature-flags' &&
        path.node.specifiers.some(
          (spec) => spec.imported && spec.imported.name === 'FeatureFlags'
        )
    );

  // Find all JSX OverflowMenu elements that aren't already wrapped
  const overflowMenuElements = root
    .find(j.JSXElement, {
      openingElement: { name: { name: 'OverflowMenu' } },
    })
    .filter((path) => {
      // Skip if already wrapped with FeatureFlags
      let parent = path.parent;
      while (parent) {
        if (
          parent.node.type === 'JSXElement' &&
          parent.node.openingElement.name.name === 'FeatureFlags'
        ) {
          return false;
        }
        parent = parent.parent;
      }
      return true;
    });

  // If we found any OverflowMenu components to transform
  if (overflowMenuElements.length > 0) {
    hasModifications = true;

    // Add FeatureFlags import if it doesn't exist
    if (!hasFeatureFlagsImport) {
      // Find all imports from '@carbon/feature-flags'
      const carbonImports = root.find(j.ImportDeclaration, {
        source: { value: '@carbon/feature-flags' },
      });

      if (carbonImports.length) {
        // Add FeatureFlags to existing Carbon import
        const existingImport = carbonImports.get(0);
        const existingSpecifiers = existingImport.node.specifiers;
        existingSpecifiers.push(
          j.importSpecifier(j.identifier('FeatureFlags'))
        );
      } else {
        // Create new Carbon import after the first import
        const firstImport = root.find(j.ImportDeclaration).at(0);
        const featureFlagsImport = j.importDeclaration(
          [j.importSpecifier(j.identifier('FeatureFlags'))],
          j.literal('@carbon/feature-flags')
        );

        if (firstImport.length) {
          firstImport.insertAfter(featureFlagsImport);
        } else {
          root.get().node.program.body.unshift(featureFlagsImport);
        }
      }
    }

    // Wrap each OverflowMenu with FeatureFlags
    overflowMenuElements.forEach((path) => {
      const elementToWrap = path.node;
      const wrappedElement = j.jsxElement(
        j.jsxOpeningElement(j.jsxIdentifier('FeatureFlags'), [
          j.jsxAttribute(j.jsxIdentifier('enableV12Overflowmenu'), null),
        ]),
        j.jsxClosingElement(j.jsxIdentifier('FeatureFlags')),
        [j.jsxText('\n      '), elementToWrap, j.jsxText('\n    ')]
      );

      j(path).replaceWith(wrappedElement);
    });
  }

  return hasModifications ? root.toSource(printOptions) : null;
}

module.exports = transform;
module.exports.parser = 'tsx'; // Enable TypeScript parsing
