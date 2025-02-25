/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Rewrites UserProfileImage to UserAvatar
 *
 * Transforms:
 *
 * <UserProfileImage />
 *
 * Into:
 *
 * <UserAvatar />
 */

'use strict';

const transform = (fileInfo, api) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  let shouldImportUser = false;
  let shouldImportGroup = false;

  const ensureImport = (identifierName) => {
    const importDeclaration = j.importDeclaration(
      [j.importSpecifier(j.identifier(identifierName))],
      j.literal('@carbon/react/icons')
    );

    const existingImport = root
      .find(j.ImportDeclaration, {
        source: { value: '@carbon/react/icons' },
      })
      .filter((path) => {
        return path.node.specifiers.some(
          (specifier) => specifier.imported.name === identifierName
        );
      });

    if (existingImport.size() === 0) {
      root.find(j.Program).get('body', 0).insertBefore(importDeclaration);
    }
  };
  // Transform UserProfileImage to UserAvatar
  root
    .find(j.JSXElement, {
      openingElement: { name: { name: 'UserProfileImage' } },
    })
    .forEach((path) => {
      // Change the component name
      path.node.openingElement.name.name = 'UserAvatar';
      if (path.node.closingElement) {
        path.node.closingElement.name.name = 'UserAvatar';
      }

      const colorMapping = {
        'light-cyan': 'order-1-cyan',
        'dark-cyan': 'order-7-cyan',
        'light-gray': 'order-2-gray',
        'dark-gray': 'order-8-gray',
        'light-green': 'order-3-green',
        'dark-green': 'order-9-green',
        'light-magenta': 'order-10-magenta',
        'dark-magenta': 'order-10-magenta',
        'light-purple': 'order-5-purple',
        'dark-purple': 'order-11-purple',
        'light-teal': 'order-6-teal',
        'dark-teal': 'order-12-teal',
      };
      const updatedAttributes = [];
      // Update attributes
      path.node.openingElement.attributes.forEach((attr) => {
        if (attr.name.name === 'backgroundColor') {
          if (colorMapping[attr.value.value]) {
            attr.value.value = colorMapping[attr.value.value];
          }
        }
        if (attr.name.name === 'theme') {
          return;
        }
        if (attr.name.name === 'initials') {
          attr.name.name = 'name';
        }
        if (attr.name.name === 'kind' || attr.name.name === 'icon') {
          const originalName = attr.name.name;
          attr.name.name = 'renderIcon';
          if (originalName === 'kind') {
            if (attr.value.value === 'user') {
              attr.value = j.jsxExpressionContainer(j.identifier('User'));
              shouldImportUser = true;
            } else if (attr.value.value === 'group') {
              attr.value = j.jsxExpressionContainer(j.identifier('Group'));
              shouldImportGroup = true;
            }
          }
        }
        updatedAttributes.push(attr);
      });
      path.node.openingElement.attributes = updatedAttributes;
    });
  // Update import statement
  root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === '@carbon/ibm-products')
    .forEach((path) => {
      path.node.specifiers.forEach((specifier) => {
        if (specifier.imported.name === 'UserProfileImage') {
          specifier.imported.name = 'UserAvatar';
        }
      });
    });

  if (shouldImportUser) {
    ensureImport('User');
  }

  if (shouldImportGroup) {
    ensureImport('Group');
  }
  return root.toSource();
};

module.exports = transform;
