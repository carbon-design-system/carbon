/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Migrate OverflowMenu components to v12 API
 */

'use strict';

const defaultOptions = {
  quote: 'single',
  trailingComma: true,
};

// Props mapping from OverflowMenuItem to MenuItem
const MENU_ITEM_PROPS_MAP = {
  itemText: 'label',
  href: 'href',
  disabled: 'disabled',
  className: 'className',
};

const EVENT_HANDLERS = new Set(['onClick']);

function transform(fileInfo, api, options) {
  const { jscodeshift: j } = api;
  const root = j(fileInfo.source);
  const printOptions = options.printOptions || defaultOptions;
  const shouldWrapWithFlags = options.wrapWithFeatureFlag !== false;
  const overflowMenuElements = root
    .find(j.JSXElement, {
      openingElement: { name: { name: 'OverflowMenu' } },
    })
    .filter((path) => {
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

  if (!overflowMenuElements.length) {
    return null;
  }

  // Add required imports
  const importsToAdd = ['MenuItem', 'MenuItemDivider'].sort();
  const carbonImport = root.find(j.ImportDeclaration, {
    source: { value: '@carbon/react' },
  });

  if (carbonImport.length) {
    const importNode = carbonImport.get(0);
    const existingSpecifiers = new Set(
      importNode.node.specifiers
        .filter((spec) => spec.type === 'ImportSpecifier')
        .map((spec) => spec.imported.name)
    );

    importsToAdd.forEach((importName) => {
      if (!existingSpecifiers.has(importName)) {
        importNode.node.specifiers.push(
          j.importSpecifier(j.identifier(importName))
        );
      }
    });

    // Sort specifiers alphabetically
    importNode.node.specifiers.sort((a, b) =>
      a.imported.name.localeCompare(b.imported.name)
    );
  }

  function transformOverflowMenuItems(elements) {
    elements.forEach((path) => {
      path.node.children.forEach((child, index) => {
        if (
          child.type === 'JSXElement' &&
          child.openingElement.name.name === 'OverflowMenuItem'
        ) {
          const itemProps = [];
          let needsDivider = false;
          let classNames = [];

          child.openingElement.attributes.forEach((attr) => {
            if (attr.type === 'JSXSpreadAttribute') {
              itemProps.push(attr);
              return;
            }

            const propName = attr.name.name;

            if (MENU_ITEM_PROPS_MAP[propName]) {
              if (propName === 'className') {
                classNames.push(attr.value.value);
              } else {
                itemProps.push(
                  j.jsxAttribute(
                    j.jsxIdentifier(MENU_ITEM_PROPS_MAP[propName]),
                    attr.value
                  )
                );
              }
            } else if (propName === 'wrapperClassName') {
              classNames.push(attr.value.value);
            } else if (propName === 'hasDivider') {
              needsDivider = true;
            } else if (propName === 'isDelete') {
              itemProps.push(
                j.jsxAttribute(
                  j.jsxIdentifier('kind'),
                  j.stringLiteral('danger')
                )
              );
            } else if (EVENT_HANDLERS.has(propName)) {
              itemProps.push(attr);
            }
          });

          if (classNames.length > 0) {
            itemProps.push(
              j.jsxAttribute(
                j.jsxIdentifier('className'),
                j.stringLiteral(classNames.join(' '))
              )
            );
          }

          if (needsDivider) {
            path.node.children.splice(
              index,
              0,
              j.jsxElement(
                j.jsxOpeningElement(
                  j.jsxIdentifier('MenuItemDivider'),
                  [],
                  true
                ),
                null,
                [],
                true
              )
            );
          }

          child.openingElement.name = j.jsxIdentifier('MenuItem');
          child.openingElement.attributes = itemProps;
          if (child.closingElement) {
            child.closingElement.name = j.jsxIdentifier('MenuItem');
          }
        }
      });
    });
  }

  function addFeatureFlagsImport() {
    const hasFeatureFlagsImport = root
      .find(j.ImportDeclaration)
      .some(
        (path) =>
          path.node.source.value === '@carbon/feature-flags' &&
          path.node.specifiers.some(
            (spec) => spec.imported && spec.imported.name === 'FeatureFlags'
          )
      );

    if (!hasFeatureFlagsImport) {
      const featureFlagsImport = j.importDeclaration(
        [j.importSpecifier(j.identifier('FeatureFlags'))],
        j.literal('@carbon/feature-flags')
      );

      const firstImport = root.find(j.ImportDeclaration).at(0);
      if (firstImport.length) {
        firstImport.insertAfter(featureFlagsImport);
      } else {
        root.get().node.program.body.unshift(featureFlagsImport);
      }
    }
  }

  function wrapWithFeatureFlags(elements) {
    elements.forEach((path) => {
      const wrappedElement = j.jsxElement(
        j.jsxOpeningElement(
          j.jsxIdentifier('FeatureFlags'),
          [j.jsxAttribute(j.jsxIdentifier('enableV12Overflowmenu'))],
          false
        ),
        j.jsxClosingElement(j.jsxIdentifier('FeatureFlags')),
        [j.jsxText('\n      '), path.node, j.jsxText('\n    ')]
      );

      j(path).replaceWith(wrappedElement);
    });
  }

  // Transform based on wrap option
  transformOverflowMenuItems(overflowMenuElements);

  if (shouldWrapWithFlags) {
    addFeatureFlagsImport();
    wrapWithFeatureFlags(overflowMenuElements);
  }

  return root.toSource(printOptions);
}

module.exports = transform;
module.exports.parser = 'tsx';
