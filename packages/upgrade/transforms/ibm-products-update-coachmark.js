/**
 * Copyright IBM Corp. 2026
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
 *   <Coachmark align='bottom' position={{ x: 0, y: 0 }}>
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
  let shouldImportUseState = false;

  // Helper to add imports to existing or create new import declarations
  const ensureImport = (source, identifierName) => {
    const existingImport = root
      .find(j.ImportDeclaration, { source: { value: source } })
      .filter((path) =>
        path.node.specifiers.some((s) => s.imported?.name === identifierName)
      );

    if (existingImport.size() === 0) {
      const reactImport = root.find(j.ImportDeclaration, {
        source: { value: source },
      });
      if (reactImport.size() > 0) {
        reactImport.forEach((path) =>
          path.node.specifiers.push(
            j.importSpecifier(j.identifier(identifierName))
          )
        );
      } else {
        root
          .find(j.Program)
          .get('body', 0)
          .insertBefore(
            j.importDeclaration(
              [j.importSpecifier(j.identifier(identifierName))],
              j.literal(source)
            )
          );
      }
    }
  };

  const createJSXElement = (name, attributes, children) => {
    const openingElement = j.jsxOpeningElement(
      j.jsxIdentifier(name),
      attributes,
      children.length === 0
    );
    return children.length === 0
      ? j.jsxElement(openingElement, null, [])
      : j.jsxElement(
          openingElement,
          j.jsxClosingElement(j.jsxIdentifier(name)),
          children
        );
  };

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
    return children.length === 0
      ? j.jsxElement(openingElement, null, [])
      : j.jsxElement(
          openingElement,
          j.jsxClosingElement(memberExpression),
          children
        );
  };

  const createNestedMemberJSXElement = (
    obj1,
    obj2,
    property,
    attributes,
    children
  ) => {
    const outerMember = j.jsxMemberExpression(
      j.jsxMemberExpression(j.jsxIdentifier(obj1), j.jsxIdentifier(obj2)),
      j.jsxIdentifier(property)
    );
    const openingElement = j.jsxOpeningElement(
      outerMember,
      attributes,
      children.length === 0
    );
    return children.length === 0
      ? j.jsxElement(openingElement, null, [])
      : j.jsxElement(
          openingElement,
          j.jsxClosingElement(outerMember),
          children
        );
  };

  // Transform target elements (CoachmarkBeacon or CoachmarkButton)
  const processTargetElement = (targetValue) => {
    if (
      targetValue.type !== 'JSXExpressionContainer' ||
      targetValue.expression.type !== 'JSXElement'
    )
      return null;

    const expression = targetValue.expression;
    const elementName = expression.openingElement.name.name;

    // Transform CoachmarkBeacon with buttonProps
    if (elementName === 'CoachmarkBeacon') {
      shouldImportUseState = true;
      const label = expression.openingElement.attributes.find(
        (a) => a.name?.name === 'label'
      )?.value;
      const newAttributes = [
        j.jsxAttribute(
          j.jsxIdentifier('buttonProps'),
          j.jsxExpressionContainer(
            j.objectExpression([
              j.property(
                'init',
                j.identifier('onClick'),
                j.identifier('handleBeaconClick')
              ),
              j.property('init', j.identifier('id'), j.literal('CoachmarkBtn')),
            ])
          )
        ),
      ];
      if (label)
        newAttributes.unshift(j.jsxAttribute(j.jsxIdentifier('label'), label));
      return createJSXElement('CoachmarkBeacon', newAttributes, []);
    }

    // Transform CoachmarkButton to regular Button
    if (elementName === 'CoachmarkButton') {
      shouldImportButton = true;
      shouldImportUseState = true;
      const attrs = expression.openingElement.attributes;
      const buttonAttributes = [
        j.jsxAttribute(
          j.jsxIdentifier('id'),
          j.literal('CoachmarkTriggerRefBtn')
        ),
        j.jsxAttribute(
          j.jsxIdentifier('onClick'),
          j.jsxExpressionContainer(j.identifier('handleButtonClick'))
        ),
      ];
      ['kind', 'size', 'renderIcon'].forEach((name) => {
        const attr = attrs.find((a) => a.name?.name === name);
        if (attr)
          buttonAttributes.push(
            j.jsxAttribute(j.jsxIdentifier(name), attr.value)
          );
      });
      return createJSXElement(
        'Button',
        buttonAttributes,
        expression.children || []
      );
    }
    return null;
  };

  // Transform Coachmark components
  root
    .find(j.JSXElement, { openingElement: { name: { name: 'Coachmark' } } })
    .forEach((path) => {
      const attributes = path.node.openingElement.attributes;
      const newAttributes = [];
      let themeValue = null,
        closeIconDescription = null,
        targetElement = null,
        overlayKind = null;
      let closeButtonLabel = null,
        overlayElements = [];

      // Process and transform attributes
      attributes.forEach((attr) => {
        if (attr.type !== 'JSXAttribute') {
          newAttributes.push(attr);
          return;
        }
        const attrName = attr.name.name;

        if (attrName === 'theme') {
          if (attr.value.type === 'Literal') {
            themeValue =
              attr.value.value === 'dark'
                ? 'g90'
                : attr.value.value === 'light'
                  ? 'white'
                  : null;
          }
          shouldImportTheme = true;
        } else if (attrName === 'positionTune') {
          attr.name.name = 'position';
          newAttributes.push(attr);
        } else if (attrName === 'closeIconDescription') {
          closeIconDescription = attr.value;
        } else if (attrName === 'target') {
          targetElement = attr.value;
        } else if (attrName === 'overlayKind') {
          overlayKind = attr.value;
        } else {
          newAttributes.push(attr);
        }
      });

      newAttributes.push(
        j.jsxAttribute(
          j.jsxIdentifier('open'),
          j.jsxExpressionContainer(j.identifier('isOpen'))
        )
      );
      if (overlayKind) {
        newAttributes.push(
          j.jsxAttribute(
            j.jsxIdentifier('floating'),
            j.jsxExpressionContainer(j.literal(true))
          )
        );
      }

      const newChildren = [];
      if (targetElement) {
        const targetChild = processTargetElement(targetElement);
        if (targetChild) newChildren.push(targetChild);
      }

      if (path.node.children) {
        path.node.children.forEach((child) => {
          if (
            child.type === 'JSXElement' &&
            child.openingElement.name.name === 'CoachmarkOverlayElements'
          ) {
            child.openingElement.attributes.forEach((attr) => {
              if (attr.name?.name === 'closeButtonLabel')
                closeButtonLabel = attr.value;
            });
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

      // Build content body from overlay elements
      const contentBodyChildren = [];
      overlayElements.forEach((element) => {
        const attrs = element.openingElement.attributes;
        const title = attrs.find((a) => a.name?.name === 'title')?.value;
        const description = attrs.find(
          (a) => a.name?.name === 'description'
        )?.value;

        if (title) {
          const titleValue = title.type === 'Literal' ? title.value : title;
          contentBodyChildren.push(
            j.jsxElement(
              j.jsxOpeningElement(j.jsxIdentifier('h2'), []),
              j.jsxClosingElement(j.jsxIdentifier('h2')),
              [j.jsxText(typeof titleValue === 'string' ? titleValue : '')]
            )
          );
        }
        if (description) {
          const descValue =
            description.type === 'Literal' ? description.value : description;
          contentBodyChildren.push(
            j.jsxElement(
              j.jsxOpeningElement(j.jsxIdentifier('p'), []),
              j.jsxClosingElement(j.jsxIdentifier('p')),
              [j.jsxText(typeof descValue === 'string' ? descValue : '')]
            )
          );
        }
      });

      if (closeButtonLabel) {
        shouldImportButton = true;
        const buttonLabel =
          closeButtonLabel.type === 'Literal' ? closeButtonLabel.value : 'Done';
        contentBodyChildren.push(
          j.jsxElement(
            j.jsxOpeningElement(j.jsxIdentifier('Button'), [
              j.jsxAttribute(j.jsxIdentifier('size'), j.literal('sm')),
            ]),
            j.jsxClosingElement(j.jsxIdentifier('Button')),
            [j.jsxText(buttonLabel)]
          )
        );
      }

      const contentBody = createNestedMemberJSXElement(
        'Coachmark',
        'Content',
        'Body',
        [],
        contentBodyChildren
      );
      const headerAttributes = closeIconDescription
        ? [
            j.jsxAttribute(
              j.jsxIdentifier('closeIconDescription'),
              closeIconDescription
            ),
          ]
        : [];
      const contentHeader = createNestedMemberJSXElement(
        'Coachmark',
        'Content',
        'Header',
        headerAttributes,
        []
      );
      const content = createMemberJSXElement(
        'Coachmark',
        'Content',
        [],
        [contentHeader, contentBody]
      );

      newChildren.push(content);
      path.node.openingElement.attributes = newAttributes;
      path.node.children = newChildren;

      if (themeValue) {
        const themeElement = j.jsxElement(
          j.jsxOpeningElement(j.jsxIdentifier('Theme'), [
            j.jsxAttribute(j.jsxIdentifier('theme'), j.literal(themeValue)),
          ]),
          j.jsxClosingElement(j.jsxIdentifier('Theme')),
          [
            j.jsxElement(
              path.node.openingElement,
              path.node.closingElement,
              path.node.children
            ),
          ]
        );
        j(path).replaceWith(themeElement);
      }
    });

  // Update @carbon/ibm-products imports to preview versions
  root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === '@carbon/ibm-products')
    .forEach((path) => {
      const removedImports = [
        'CoachmarkOverlayElements',
        'CoachmarkOverlayElement',
        'CoachmarkButton',
        'BEACON_KIND',
        'COACHMARK_OVERLAY_KIND',
      ];
      const newSpecifiers = [];

      path.node.specifiers.forEach((specifier) => {
        if (!specifier.imported) {
          newSpecifiers.push(specifier);
          return;
        }

        const importedName = specifier.imported.name;
        if (removedImports.includes(importedName)) return;

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
      });

      path.node.specifiers = newSpecifiers;
    });

  // Add required imports
  if (shouldImportTheme) ensureImport('@carbon/react', 'Theme');
  if (shouldImportButton) ensureImport('@carbon/react', 'Button');
  if (shouldImportUseState) ensureImport('react', 'useState');

  // Inject state management into component functions
  root.find(j.VariableDeclarator).forEach((path) => {
    const init = path.node.init;
    if (
      !init ||
      init.type !== 'ArrowFunctionExpression' ||
      init.body.type !== 'JSXElement'
    )
      return;

    const jsx = init.body;
    const containsTheme = jsx.openingElement?.name?.name === 'Theme';
    const containsCoachmark = jsx.openingElement?.name?.name === 'Coachmark';
    if (!containsTheme && !containsCoachmark) return;

    const jsxSource = j(jsx).toSource();
    const usesBeaconHandler = jsxSource.includes('handleBeaconClick');
    const usesButtonHandler = jsxSource.includes('handleButtonClick');
    if (!usesBeaconHandler && !usesButtonHandler) return;

    shouldImportUseState = true;
    const bodyStatements = [
      j.variableDeclaration('const', [
        j.variableDeclarator(
          j.arrayPattern([j.identifier('isOpen'), j.identifier('setIsOpen')]),
          j.callExpression(j.identifier('useState'), [j.literal(true)])
        ),
      ]),
    ];

    const createHandler = (name) =>
      j.variableDeclaration('const', [
        j.variableDeclarator(
          j.identifier(name),
          j.arrowFunctionExpression(
            [],
            j.blockStatement([
              j.expressionStatement(
                j.callExpression(j.identifier('setIsOpen'), [
                  j.arrowFunctionExpression(
                    [j.identifier('isOpen')],
                    j.unaryExpression('!', j.identifier('isOpen'))
                  ),
                ])
              ),
            ])
          )
        ),
      ]);

    if (usesBeaconHandler)
      bodyStatements.push(createHandler('handleBeaconClick'));
    if (usesButtonHandler)
      bodyStatements.push(createHandler('handleButtonClick'));
    bodyStatements.push(j.returnStatement(jsx));

    init.body = j.blockStatement(bodyStatements);
  });

  return root.toSource();
};

module.exports = transform;
