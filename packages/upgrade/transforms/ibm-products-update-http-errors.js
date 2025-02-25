/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Rewrites HttpError403, HttpError404, HttpErrorOther to FullPageError
 *
 * Transforms:
 *
 * <HttpError403 />, <HttpError404 />, <HttpErrorOther />
 *
 * Into:
 *
 * <FullPageError />
 */

'use strict';

const transform = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);
  let dirtyFlag = false;

  const componentKindMap = {
    HTTPError403: '403',
    HTTPError404: '404',
    HTTPErrorOther: 'custom',
  };
  const NEW_COMPONENT = 'FullPageError';
  const LINK_COMPONENT = 'Link';

  root.find(j.JSXElement).forEach((element) => {
    const openingElement = element.node.openingElement;
    const componentName = openingElement.name.name;

    if (componentKindMap[componentName]) {
      dirtyFlag = true;
      // Opening tag
      openingElement.name.name = NEW_COMPONENT;

      if (element.node.closingElement) {
        // Closing tag
        element.node.closingElement.name.name = NEW_COMPONENT;
      }

      // Attach new 'kind' attribute
      const kindAttribute = j.jsxAttribute(
        j.jsxIdentifier('kind'),
        j.literal(componentKindMap[componentName])
      );
      openingElement.attributes.push(kindAttribute);

      // Change errorCodeLabel attribute to label
      const errorCodeLabelProp = openingElement.attributes.find(
        (attr) => attr.name.name === 'errorCodeLabel'
      );
      if (errorCodeLabelProp) {
        errorCodeLabelProp.name.name = 'label';
      }

      // Convert 'links' prop to 'children' with <Link></Link> tags
      const linksProp = openingElement.attributes.find(
        (attr) => attr.name.name === 'links'
      );
      if (linksProp) {
        linksProp.name.name = 'children';

        // Convert link value elements
        const linkValues = linksProp.value.expression.elements;
        let linksLen = linkValues.length;
        const linkElements = [];

        linkValues.forEach((link) => {
          const linkTag = j.jsxElement(
            j.jsxOpeningElement(j.jsxIdentifier(LINK_COMPONENT), [
              j.jsxAttribute(
                j.jsxIdentifier('href'),
                j.jsxExpressionContainer(
                  j.literal(link.properties[0].value.value)
                ),
                j.jsxClosingElement(j.jsxIdentifier(LINK_COMPONENT))
              ),
            ]),
            j.jsxClosingElement(j.jsxIdentifier(LINK_COMPONENT)),
            [j.jsxText(link.properties[1].value.value)]
          );
          linkElements.push(linkTag);
          linksLen--;
          if (linksLen) {
            const brTag = j.jsxElement(
              j.jsxOpeningElement(j.jsxIdentifier('br'), [], true)
            );

            linkElements.push(brTag);
          }
        });

        const linksFragment = j.jsxFragment(
          j.jsxOpeningFragment(),
          j.jsxClosingFragment(),
          linkElements
        );

        linksProp.value = j.jsxExpressionContainer(linksFragment);
      }
    }
  });

  // Transform import statements if necessary
  if (dirtyFlag) {
    const importDeclarations = root.find(j.ImportDeclaration);
    const CARBON_PATH = '@carbon/react';
    const linkComponentSpecifier = j.importSpecifier(
      j.identifier(LINK_COMPONENT),
      j.identifier(LINK_COMPONENT)
    );

    // Check for '@carbon/react' import statement exists
    const existCarbonImport = importDeclarations.some(
      (importDeclaration) => importDeclaration.node.source.value === CARBON_PATH
    );

    // Update @carbon/imb-products import statement
    importDeclarations.forEach((statement) => {
      const specifiers = statement.node.specifiers;
      const source = statement.node.source;
      const PRODUCTS_PATH = '@carbon/ibm-products';

      if (source.value === PRODUCTS_PATH) {
        // Check new component name already imported
        const isNewIdExists = specifiers.some(
          (spec) => spec.imported.name === NEW_COMPONENT
        );

        // If the new component not already imported, import it
        if (!isNewIdExists) {
          const newSpecifier = j.importSpecifier(
            j.identifier(NEW_COMPONENT),
            j.identifier(NEW_COMPONENT)
          );
          // Including the new specifier into @carbon/ibm-products import statement
          specifiers.push(newSpecifier);
        }

        Object.keys(componentKindMap).forEach((key) => {
          // Check the old component names exists
          const identifierIndex = specifiers.findIndex(
            (spec) => spec.imported.name === key
          );

          // Remove all old components' import
          if (identifierIndex !== -1) {
            specifiers.splice(identifierIndex, 1);
          }
        });
      }

      // if the @carbon/react import statement already exists update the import
      if (existCarbonImport && source.value === CARBON_PATH) {
        // Check Link component already imported
        const linkIdIndex = specifiers.findIndex(
          (spec) => spec.imported.name === LINK_COMPONENT
        );

        // if Link component does not in the imported components list
        if (linkIdIndex === -1) {
          // Include the Link component in imported components list
          specifiers.push(linkComponentSpecifier);
        }
      }
    });

    // If @carbon/react import statement not exists
    if (!existCarbonImport) {
      const carbonImportDeclaration = j.importDeclaration(
        [linkComponentSpecifier],
        j.literal(CARBON_PATH)
      );

      root
        .find(j.Program)
        .forEach((program) =>
          program.node.body.unshift(carbonImportDeclaration)
        );
    }
  }

  return root.toSource();
};

module.exports = transform;
