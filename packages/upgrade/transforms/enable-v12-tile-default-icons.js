/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Migrate Tile components by wrapping them with FeatureFlags
 */

'use strict';

const defaultOptions = {
  quote: 'single',
  trailingComma: true,
};

function transform(fileInfo, api, options) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const printOptions = options.printOptions || defaultOptions;

  // Early return if no Tile components found
  if (
    !root
      .find(j.JSXElement, { openingElement: { name: { name: 'Tile' } } })
      .size()
  ) {
    return null;
  }

  let needsFeatureFlagsImport = false;

  // First update all existing FeatureFlags wrappers that need the attribute
  root
    .find(j.JSXElement, {
      openingElement: { name: { name: 'FeatureFlags' } },
    })
    .forEach((path) => {
      const hasTileInside =
        j(path)
          .find(j.JSXElement, {
            openingElement: { name: { name: 'Tile' } },
          })
          .size() > 0;

      const hasTileGroupWithTile =
        j(path)
          .find(j.JSXElement, {
            openingElement: { name: { name: 'TileGroup' } },
          })
          .filter((tileGroupPath) => {
            return (
              j(tileGroupPath)
                .find(j.JSXElement, {
                  openingElement: { name: { name: 'Tile' } },
                })
                .size() > 0
            );
          })
          .size() > 0;

      if (hasTileInside || hasTileGroupWithTile) {
        const hasAttribute = path.node.openingElement.attributes.some(
          (attr) =>
            attr.type === 'JSXAttribute' &&
            attr.name.name === 'enableV12TileDefaultIcons'
        );

        if (!hasAttribute) {
          path.node.openingElement.attributes.push(
            j.jsxAttribute(j.jsxIdentifier('enableV12TileDefaultIcons'))
          );
          needsFeatureFlagsImport = true;
        }
      }
    });

  // Handle Tiles within TileGroups
  root
    .find(j.JSXElement, {
      openingElement: { name: { name: 'TileGroup' } },
    })
    .forEach((path) => {
      const hasTile =
        j(path)
          .find(j.JSXElement, {
            openingElement: { name: { name: 'Tile' } },
          })
          .size() > 0;

      const wrappingFeatureFlags = j(path).closest(j.JSXElement, {
        openingElement: { name: { name: 'FeatureFlags' } },
      });

      if (hasTile) {
        if (wrappingFeatureFlags.size() === 0) {
          // Not wrapped, add wrapper
          const featureFlagsWrapper = j.jsxElement(
            j.jsxOpeningElement(
              j.jsxIdentifier('FeatureFlags'),
              [j.jsxAttribute(j.jsxIdentifier('enableV12TileDefaultIcons'))],
              false
            ),
            j.jsxClosingElement(j.jsxIdentifier('FeatureFlags')),
            [path.node]
          );

          j(path).replaceWith(featureFlagsWrapper);
          needsFeatureFlagsImport = true;
        }
      }
    });

  // Handle standalone Tiles
  root
    .find(j.JSXElement, {
      openingElement: { name: { name: 'Tile' } },
    })
    .forEach((path) => {
      const isInsideTileGroup =
        j(path)
          .closest(j.JSXElement, {
            openingElement: { name: { name: 'TileGroup' } },
          })
          .size() > 0;

      const wrappingFeatureFlags = j(path).closest(j.JSXElement, {
        openingElement: { name: { name: 'FeatureFlags' } },
      });

      if (!isInsideTileGroup) {
        if (wrappingFeatureFlags.size() === 0) {
          // Not wrapped, add wrapper
          const featureFlagsWrapper = j.jsxElement(
            j.jsxOpeningElement(
              j.jsxIdentifier('FeatureFlags'),
              [j.jsxAttribute(j.jsxIdentifier('enableV12TileDefaultIcons'))],
              false
            ),
            j.jsxClosingElement(j.jsxIdentifier('FeatureFlags')),
            [path.node]
          );

          j(path).replaceWith(featureFlagsWrapper);
          needsFeatureFlagsImport = true;
        }
      }
    });

  // Add FeatureFlags import only if we've added wrappers or attributes
  if (needsFeatureFlagsImport) {
    const hasFeatureFlagsImport =
      root
        .find(j.ImportDeclaration, {
          source: { value: '@carbon/feature-flags' },
        })
        .size() > 0;

    if (!hasFeatureFlagsImport) {
      // Find the last import declaration
      const lastImport = root.find(j.ImportDeclaration).at(-1);
      const featureFlagsImport = j.importDeclaration(
        [j.importSpecifier(j.identifier('FeatureFlags'))],
        j.literal('@carbon/feature-flags')
      );

      if (lastImport.size() > 0) {
        // Add newline after the last import
        const newline = j.template.statement`\n`;
        lastImport.insertAfter(newline);
        lastImport.insertAfter(featureFlagsImport);
      } else {
        // If no imports exist, add at the beginning of the file
        root.get().node.program.body.unshift(featureFlagsImport);
      }
    }
  }

  return root.toSource(printOptions);
}

module.exports = transform;
module.exports.parser = 'tsx';
