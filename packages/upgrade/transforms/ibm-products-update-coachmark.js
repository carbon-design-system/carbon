/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Rewrites old Coachmark to new composable Coachmark
 *
 * Transforms:
 *
 * <Coachmark align='bottom' closeIconDescription='Close' positionTune={{ x: 0, y: 0 }}
 *   target={<CoachmarkBeacon label="Show information" kind={BEACON_KIND.DEFAULT} />} theme='dark'>
 *   <CoachmarkOverlayElements closeButtonLabel="Done">
 *     <CoachmarkOverlayElement title="Hello World" description="this is a description test" />
 *   </CoachmarkOverlayElements>
 * </Coachmark>
 *
 * Into:
 *
 * <Theme theme={g90}>
 *   <Coachmark align='bottom' position={{ x: 0, y: 0 }} open={isOpen}>
 *     <CoachmarkBeacon label="Show information" buttonProps={{ onClick: handleBeaconClick, id: 'CoachmarkBtn', ref: beaconButtonRef }} />
 *     <Coachmark.Content>
 *       <Coachmark.Content.Header closeIconDescription="Close" />
 *       <Coachmark.Content.Body>
 *         <h2>Hello World</h2>
 *         <p>this is a description test</p>
 *         <Button size="sm">Done</Button>
 *       </Coachmark.Content.Body>
 *     </Coachmark.Content>
 *   </Coachmark>
 * </Theme>
 */

'use strict';

const transform = (fileInfo, api) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  let shouldImportTheme = false;
  let shouldImportButton = false;

  // Helper to ensure imports for @carbon/react
  const ensureReactImport = (identifierName) => {
    const source = '@carbon/react';
    const existingImport = root
      .find(j.ImportDeclaration, {
        source: { value: source },
      })
      .filter((path) => {
        return path.node.specifiers.some(
          (specifier) =>
            specifier.imported && specifier.imported.name === identifierName
        );
      });

    if (existingImport.size() === 0) {
      // Check if there's already a @carbon/react import to add to
      const reactImport = root.find(j.ImportDeclaration, {
        source: { value: source },
      });

      if (reactImport.size() > 0) {
        // Add to existing import
        reactImport.forEach((path) => {
          path.node.specifiers.push(
            j.importSpecifier(j.identifier(identifierName))
          );
        });
      } else {
        // Create new import
        const importDeclaration = j.importDeclaration(
          [j.importSpecifier(j.identifier(identifierName))],
          j.literal(source)
        );
        root.find(j.Program).get('body', 0).insertBefore(importDeclaration);
      }
    }
  };

  // Helper to create JSX element
  const createJSXElement = (name, attributes, children) => {
    const openingElement = j.jsxOpeningElement(
      j.jsxIdentifier(name),
      attributes,
      children.length === 0
    );

    if (children.length === 0) {
      return j.jsxElement(openingElement, null, []);
    }

    const closingElement = j.jsxClosingElement(j.jsxIdentifier(name));
    return j.jsxElement(openingElement, closingElement, children);
  };

  // Helper to create member expression JSX element (e.g., Coachmark.Content)
  const createMemberJSXElement = (object, property, attributes, children) => {
    const memberExpression = j.jsxMemberExpression(
      j.jsxIdentifier(object),
      j.jsxIdentifier(property)
    );

    const openingElement = j.jsxOpeningElement(
      memberExpression,
      attributes,
      children.length === 0
    );

    if (children.length === 0) {
      return j.jsxElement(openingElement, null, []);
    }

    const closingElement = j.jsxClosingElement(memberExpression);
    return j.jsxElement(openingElement, closingElement, children);
  };

  // Helper to create nested member expression JSX element (e.g., Coachmark.Content.Header)
  const createNestedMemberJSXElement = (
    obj1,
    obj2,
    property,
    attributes,
    children
  ) => {
    const innerMember = j.jsxMemberExpression(
      j.jsxIdentifier(obj1),
      j.jsxIdentifier(obj2)
    );
    const outerMember = j.jsxMemberExpression(
      innerMember,
      j.jsxIdentifier(property)
    );

    const openingElement = j.jsxOpeningElement(
      outerMember,
      attributes,
      children.length === 0
    );

    if (children.length === 0) {
      return j.jsxElement(openingElement, null, []);
    }

    const closingElement = j.jsxClosingElement(outerMember);
    return j.jsxElement(openingElement, closingElement, children);
  };

  // Transform Coachmark components
  root
    .find(j.JSXElement, {
      openingElement: { name: { name: 'Coachmark' } },
    })
    .forEach((path) => {
      const attributes = path.node.openingElement.attributes;
      const newAttributes = [];
      let themeValue = null;
      let closeIconDescription = null;
      let targetElement = null;
      let overlayKind = null;
      let closeButtonLabel = null;
      let overlayElements = [];

      // Process attributes
      attributes.forEach((attr) => {
        if (attr.type !== 'JSXAttribute') {
          newAttributes.push(attr);
          return;
        }

        const attrName = attr.name.name;

        if (attrName === 'theme') {
          // Map theme values
          if (attr.value.type === 'Literal') {
            const oldTheme = attr.value.value;
            if (oldTheme === 'dark') {
              themeValue = 'g90'; // or g100, defaulting to g90
            } else if (oldTheme === 'light') {
              themeValue = 'white'; // or g10, defaulting to white
            }
          }
          shouldImportTheme = true;
        } else if (attrName === 'positionTune') {
          // Rename positionTune to position
          attr.name.name = 'position';
          newAttributes.push(attr);
        } else if (attrName === 'closeIconDescription') {
          // Store for later use in Coachmark.Content.Header
          closeIconDescription = attr.value;
        } else if (attrName === 'target') {
          // Store target element for processing
          targetElement = attr.value;
        } else if (attrName === 'overlayKind') {
          // Check if it's FLOATING
          overlayKind = attr.value;
        } else {
          newAttributes.push(attr);
        }
      });

      // Add open prop with state management placeholder
      newAttributes.push(
        j.jsxAttribute(
          j.jsxIdentifier('open'),
          j.jsxExpressionContainer(j.identifier('isOpen'))
        )
      );

      // Add floating prop if overlayKind was FLOATING
      if (overlayKind) {
        newAttributes.push(
          j.jsxAttribute(
            j.jsxIdentifier('floating'),
            j.jsxExpressionContainer(j.literal(true))
          )
        );
      }

      // Process children to find CoachmarkOverlayElements
      const newChildren = [];

      // Process target element first
      if (targetElement) {
        const targetChild = processTargetElement(targetElement, j);
        if (targetChild) {
          newChildren.push(targetChild);
        }
      }

      // Process existing children
      if (path.node.children) {
        path.node.children.forEach((child) => {
          if (
            child.type === 'JSXElement' &&
            child.openingElement.name.name === 'CoachmarkOverlayElements'
          ) {
            // Extract closeButtonLabel
            child.openingElement.attributes.forEach((attr) => {
              if (attr.name && attr.name.name === 'closeButtonLabel') {
                closeButtonLabel = attr.value;
              }
            });

            // Extract overlay elements
            child.children.forEach((overlayChild) => {
              if (
                overlayChild.type === 'JSXElement' &&
                overlayChild.openingElement.name.name ===
                  'CoachmarkOverlayElement'
              ) {
                overlayElements.push(overlayChild);
              }
            });
          }
        });
      }

      // Create Coachmark.Content structure
      const contentBodyChildren = [];

      // Process overlay elements
      overlayElements.forEach((element) => {
        let title = null;
        let description = null;

        element.openingElement.attributes.forEach((attr) => {
          if (attr.name && attr.name.name === 'title') {
            title = attr.value;
          } else if (attr.name && attr.name.name === 'description') {
            description = attr.value;
          }
        });

        // Add title as h2
        if (title) {
          const titleValue = title.type === 'Literal' ? title.value : title;
          const h2Element = j.jsxElement(
            j.jsxOpeningElement(j.jsxIdentifier('h2'), []),
            j.jsxClosingElement(j.jsxIdentifier('h2')),
            [j.jsxText(typeof titleValue === 'string' ? titleValue : '')]
          );
          contentBodyChildren.push(h2Element);
        }

        // Add description as p
        if (description) {
          const descValue =
            description.type === 'Literal' ? description.value : description;
          const pElement = j.jsxElement(
            j.jsxOpeningElement(j.jsxIdentifier('p'), []),
            j.jsxClosingElement(j.jsxIdentifier('p')),
            [j.jsxText(typeof descValue === 'string' ? descValue : '')]
          );
          contentBodyChildren.push(pElement);
        }
      });

      // Add Button if closeButtonLabel exists
      if (closeButtonLabel) {
        shouldImportButton = true;
        const buttonLabel =
          closeButtonLabel.type === 'Literal' ? closeButtonLabel.value : 'Done';

        const buttonElement = j.jsxElement(
          j.jsxOpeningElement(j.jsxIdentifier('Button'), [
            j.jsxAttribute(j.jsxIdentifier('size'), j.literal('sm')),
          ]),
          j.jsxClosingElement(j.jsxIdentifier('Button')),
          [j.jsxText(buttonLabel)]
        );
        contentBodyChildren.push(buttonElement);
      }

      // Create Coachmark.Content.Body
      const contentBody = createNestedMemberJSXElement(
        'Coachmark',
        'Content',
        'Body',
        [],
        contentBodyChildren
      );

      // Create Coachmark.Content.Header
      const headerAttributes = [];
      if (closeIconDescription) {
        headerAttributes.push(
          j.jsxAttribute(
            j.jsxIdentifier('closeIconDescription'),
            closeIconDescription
          )
        );
      }
      const contentHeader = createNestedMemberJSXElement(
        'Coachmark',
        'Content',
        'Header',
        headerAttributes,
        []
      );

      // Create Coachmark.Content
      const content = createMemberJSXElement(
        'Coachmark',
        'Content',
        [],
        [contentHeader, contentBody]
      );

      newChildren.push(content);

      // Update the Coachmark element
      path.node.openingElement.attributes = newAttributes;
      path.node.children = newChildren;

      // Wrap with Theme if needed
      if (themeValue) {
        const themeAttr = j.jsxAttribute(
          j.jsxIdentifier('theme'),
          j.jsxExpressionContainer(j.identifier(themeValue))
        );

        const themeElement = j.jsxElement(
          j.jsxOpeningElement(j.jsxIdentifier('Theme'), [themeAttr]),
          j.jsxClosingElement(j.jsxIdentifier('Theme')),
          [path.node]
        );

        j(path).replaceWith(themeElement);
      }
    });

  // Helper function to process target element
  function processTargetElement(targetValue, j) {
    if (targetValue.type === 'JSXExpressionContainer') {
      const expression = targetValue.expression;

      if (expression.type === 'JSXElement') {
        const elementName = expression.openingElement.name.name;

        if (elementName === 'CoachmarkBeacon') {
          // Transform CoachmarkBeacon
          let label = null;

          expression.openingElement.attributes.forEach((attr) => {
            if (attr.name && attr.name.name === 'label') {
              label = attr.value;
            }
          });

          const buttonPropsValue = j.objectExpression([
            j.property(
              'init',
              j.identifier('onClick'),
              j.identifier('handleBeaconClick')
            ),
            j.property('init', j.identifier('id'), j.literal('CoachmarkBtn')),
            j.property(
              'init',
              j.identifier('ref'),
              j.identifier('beaconButtonRef')
            ),
          ]);

          const newAttributes = [
            j.jsxAttribute(
              j.jsxIdentifier('buttonProps'),
              j.jsxExpressionContainer(buttonPropsValue)
            ),
          ];

          if (label) {
            newAttributes.unshift(
              j.jsxAttribute(j.jsxIdentifier('label'), label)
            );
          }

          return createJSXElement('CoachmarkBeacon', newAttributes, []);
        } else if (elementName === 'CoachmarkButton') {
          // Transform CoachmarkButton to Button
          let kind = null;
          let size = null;
          let renderIcon = null;
          let children = [];

          expression.openingElement.attributes.forEach((attr) => {
            if (attr.name && attr.name.name === 'kind') {
              kind = attr.value;
            } else if (attr.name && attr.name.name === 'size') {
              size = attr.value;
            } else if (attr.name && attr.name.name === 'renderIcon') {
              renderIcon = attr.value;
            }
          });

          if (expression.children) {
            children = expression.children;
          }

          const buttonAttributes = [
            j.jsxAttribute(
              j.jsxIdentifier('id'),
              j.literal('CoachmarkTriggerRefBtn')
            ),
            j.jsxAttribute(
              j.jsxIdentifier('onClick'),
              j.jsxExpressionContainer(j.identifier('handleButtonClick'))
            ),
            j.jsxAttribute(
              j.jsxIdentifier('ref'),
              j.jsxExpressionContainer(j.identifier('triggerButtonRef'))
            ),
          ];

          if (kind) {
            buttonAttributes.push(
              j.jsxAttribute(j.jsxIdentifier('kind'), kind)
            );
          }

          if (size) {
            buttonAttributes.push(
              j.jsxAttribute(j.jsxIdentifier('size'), size)
            );
          }

          if (renderIcon) {
            buttonAttributes.push(
              j.jsxAttribute(j.jsxIdentifier('renderIcon'), renderIcon)
            );
          }

          shouldImportButton = true;
          return createJSXElement('Button', buttonAttributes, children);
        }
      }
    }
    return null;
  }

  // Update import statements for @carbon/ibm-products
  root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === '@carbon/ibm-products')
    .forEach((path) => {
      const newSpecifiers = [];

      path.node.specifiers.forEach((specifier) => {
        if (specifier.imported) {
          const importedName = specifier.imported.name;

          // Remove old imports that are no longer needed
          if (
            importedName === 'CoachmarkOverlayElements' ||
            importedName === 'CoachmarkOverlayElement' ||
            importedName === 'CoachmarkButton' ||
            importedName === 'BEACON_KIND' ||
            importedName === 'COACHMARK_OVERLAY_KIND'
          ) {
            return; // Skip these imports
          }

          // Transform Coachmark imports to preview versions with aliases
          if (importedName === 'Coachmark') {
            newSpecifiers.push(
              j.importSpecifier(
                j.identifier('preview__Coachmark'),
                j.identifier('Coachmark')
              )
            );
          } else if (importedName === 'CoachmarkBeacon') {
            newSpecifiers.push(
              j.importSpecifier(
                j.identifier('preview__CoachmarkBeacon'),
                j.identifier('CoachmarkBeacon')
              )
            );
          } else {
            newSpecifiers.push(specifier);
          }
        } else {
          newSpecifiers.push(specifier);
        }
      });

      path.node.specifiers = newSpecifiers;
    });

  // Add Theme import if needed
  if (shouldImportTheme) {
    ensureReactImport('Theme');
  }

  // Add Button import if needed
  if (shouldImportButton) {
    ensureReactImport('Button');
  }

  return root.toSource();
};

module.exports = transform;
