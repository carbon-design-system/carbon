/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const defaultOptions = {
  quote: 'auto',
  trailingComma: true,
};
const defaultSize = 16;

function transform(fileInfo, api, options) {
  const printOptions = options.printOptions || defaultOptions;
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Find all the import declarations that come from `@carbon/icons-react`
  const matches = root.find(j.ImportDeclaration, {
    source: {
      value: '@carbon/icons-react',
    },
  });

  // If we cannot find any, then there is no work to do
  if (matches.size() === 0) {
    return root.toSource(printOptions);
  }

  if (matches.size() > 1) {
    throw new Error(
      `Expected only one import to @carbon/icons-react, instead found: ` +
        `${matches.size()} imports`
    );
  }

  // For now, these icons are available under @carbon/icons-react/next
  // TODO: remove in v11
  matches.forEach((path) => {
    path.get('source').get('value').replace('@carbon/icons-react/next');
  });

  // Otherwise, we will get our import to icons and update the imported icons to
  // use the new format
  const iconsImport = matches.get();

  // Iterate through each of the imported icons, get their size and name, and
  // update the import and all matches in the file
  j(iconsImport)
    .find(j.ImportSpecifier)
    .forEach((path) => {
      const rootScope = path.scope;
      const SIZE_REGEX = /(.+)(\d\d)$/g;
      const { imported, local } = path.node;
      const match = SIZE_REGEX.exec(imported.name);

      if (match === null) {
        throw new Error(`Expected to find size for: ${imported.name}`);
      }

      const name = match[1];
      const size = parseInt(match[2], 10);

      if (isNaN(size)) {
        throw new Error(`Unable to parse size for ${imported.name}`);
      }

      // If they renamed the icon in the import, use that as the local name
      // import { IconName32 as CustomName } from '@carbon/icons-react';
      const newBinding =
        imported.name === local.name ? j.identifier(getSafeBinding()) : local;

      function getSafeBinding() {
        if (rootScope.declares(name)) {
          return `${name}Icon`;
        }
        return name;
      }

      // Update the imported binding from IconName32 to IconName
      j(path).replaceWith(j.importSpecifier(j.identifier(name), newBinding));

      // Finally, find all instances where we refer to this import and update
      // its binding
      root.find(j.Identifier, { name: local.name }).forEach((path) => {
        let scope = path.scope;
        while (scope && scope !== rootScope) {
          // If a scope already declares this binding, return early as it does
          // not relate to our icon import
          if (scope.declares(local.name)) {
            return;
          }
          scope = scope.parent;
        }

        if (!scope) {
          return;
        }

        const { node: parent } = path.parent;

        // Replace the identifier name with the new binding name
        path.replace(newBinding);

        // If our identifier is inside of a JSXOpeningElement, then we need to
        // check to see if we need to add in the `size` prop that is now
        // needed
        if (j.JSXOpeningElement.check(parent) && size !== defaultSize) {
          parent.attributes.unshift(
            j.jsxAttribute(
              j.jsxIdentifier('size'),
              j.jsxExpressionContainer(j.numericLiteral(size))
            )
          );
        }

        // Handle cases where the icon is referred to in an object, for
        // example:
        //
        // from:
        // const alias = { name: IconName24 };
        //
        // to:
        // const alias = { name: (props) => <IconName size={24} {...props} /> };
        //
        // Since the `size` information needs to be provided, otherwise the
        // default size will be used
        if (j.Property.check(parent) && size !== defaultSize) {
          let replacement = null;

          // map to React.createElement instead of using as the JSX Opening
          // Element directly
          if (newBinding.name[0] === newBinding.name[0].toLowerCase()) {
            // Builds up this structure:
            // (props) => React.createElement(iconName, {
            //   size: 20,
            //   ...props,
            // });
            replacement = j.arrowFunctionExpression(
              [j.identifier('props')],
              j.callExpression(
                j.memberExpression(
                  j.identifier('React'),
                  j.identifier('createElement')
                ),
                [
                  newBinding,
                  j.objectExpression([
                    j.objectProperty(
                      j.identifier('size'),
                      j.numericLiteral(size)
                    ),
                    j.spreadElement(j.identifier('props')),
                  ]),
                ]
              )
            );
          } else {
            // Build up this structure:
            // (props) => <IconName size={20} {...props} />
            replacement = j.arrowFunctionExpression(
              [j.identifier('props')],
              j.jsxElement(
                j.jsxOpeningElement(
                  j.jsxIdentifier(newBinding.name),
                  [
                    j.jsxAttribute(
                      j.jsxIdentifier('size'),
                      j.jsxExpressionContainer(j.numericLiteral(size))
                    ),
                    j.jsxSpreadAttribute(j.identifier('props')),
                  ],
                  true
                )
              )
            );
          }

          warn(fileInfo.path);
          path.parent.get('value').replace(replacement);
        }

        // Support `renderIcon` style props where you pass in an Icon by itself
        // to the prop
        //
        // from:
        // <Component renderIcon={Icon24} />
        //
        // to:
        // <Component renderIcon={(props) => <Icon size={24} {...props} />} />
        if (j.JSXExpressionContainer.check(parent) && size !== defaultSize) {
          warn(fileInfo.path);
          path.parentPath.replace(
            j.jsxExpressionContainer(
              j.arrowFunctionExpression(
                [j.identifier('props')],
                j.jsxElement(
                  j.jsxOpeningElement(
                    j.jsxIdentifier(path.node.name),
                    [
                      j.jsxAttribute(
                        j.jsxIdentifier('size'),
                        j.jsxExpressionContainer(j.numericLiteral(size))
                      ),
                      j.jsxSpreadAttribute(j.identifier('props')),
                    ],
                    true
                  )
                )
              )
            )
          );
        }
      });
    });

  return root.toSource(printOptions);
}

const manualCheckWarning = `[carbon] ${'='.repeat(71)}
We have updated the file: %s to the new icon API.

However, it may be that this update is missing a \`ref\` on the prop where the
icon is used. Please make sure to verify that this update is correct.

For more information, check out this migration guide: <TODO LINK>\n`;

const files = new Set();

function warn(filepath) {
  if (files.has(filepath)) {
    return;
  }

  files.add(filepath);
  console.log(manualCheckWarning, filepath);
}

module.exports = transform;
