/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Transforms Tearsheet to preview__Tearsheet with composable API:
 *
 * Before:
 * <Tearsheet
 *   title="Title"
 *   label="Label"
 *   actions={[...]}
 *   influencer={<Component />}
 * >
 *   {children}
 * </Tearsheet>
 *
 * After:
 * <Tearsheet>
 *   <Tearsheet.Header>
 *     <Tearsheet.HeaderContent title="Title" label="Label" />
 *   </Tearsheet.Header>
 *   <Tearsheet.Influencer><Component /></Tearsheet.Influencer>
 *   <Tearsheet.Body>
 *     <Tearsheet.MainContent>{children}</Tearsheet.MainContent>
 *   </Tearsheet.Body>
 *   <Tearsheet.Footer actions={[...]} />
 * </Tearsheet>
 */

'use strict';

// Props that stay on the root Tearsheet component
const ROOT_PROPS = [
  'open',
  'onClose',
  'variant',
  'decorator',
  'influencerWidth',
  'summaryContentWidth',
  'verticalGap',
  'preventCloseOnClickOutside',
  'launcherButtonRef',
  'selectorPrimaryFocus',
  'keepMounted',
  'disablePortal',
  'className',
  'portalTarget',
  'height',
  'hasCloseIcon',
];

// Props that move to Tearsheet.HeaderContent
const HEADER_CONTENT_PROPS = ['title', 'label', 'description', 'headerActions'];

// Props that move to Tearsheet.Header
const HEADER_PROPS = [
  'hideCloseButton',
  'disableHeaderCollapse',
  'closeIconDescription',
];

// Props that move to Tearsheet.Footer
const FOOTER_PROPS = ['actions'];

/**
 * Helper to create JSX member expression (e.g., Tearsheet.Header)
 */
function createMemberExpression(j, localName, property) {
  return j.jsxMemberExpression(
    j.jsxIdentifier(localName),
    j.jsxIdentifier(property)
  );
}

/**
 * Helper to extract JSX value from attribute
 */
function extractJSXValue(attributeValue) {
  if (!attributeValue) return null;

  if (attributeValue.type === 'JSXExpressionContainer') {
    return attributeValue.expression;
  }

  return attributeValue;
}

/**
 * Create Tearsheet.Header with HeaderContent
 */
function createHeader(j, localName, headerProps, headerContentProps) {
  const hasHeaderContentProps = headerContentProps.length > 0;
  const hasHeaderProps = headerProps.length > 0;

  if (!hasHeaderContentProps && !hasHeaderProps) {
    return null;
  }

  // Create HeaderContent
  const headerContent = j.jsxElement(
    j.jsxOpeningElement(
      createMemberExpression(j, localName, 'HeaderContent'),
      headerContentProps,
      headerContentProps.length === 0
    ),
    headerContentProps.length === 0
      ? null
      : j.jsxClosingElement(
          createMemberExpression(j, localName, 'HeaderContent')
        ),
    []
  );

  // Create Header wrapping HeaderContent
  const header = j.jsxElement(
    j.jsxOpeningElement(
      createMemberExpression(j, localName, 'Header'),
      headerProps
    ),
    j.jsxClosingElement(createMemberExpression(j, localName, 'Header')),
    [j.jsxText('\n    '), headerContent, j.jsxText('\n  ')]
  );

  return header;
}

/**
 * Create Tearsheet.Influencer
 */
function createInfluencer(j, localName, influencerValue) {
  if (!influencerValue) return null;

  const content = extractJSXValue(influencerValue);
  if (!content) return null;

  return j.jsxElement(
    j.jsxOpeningElement(createMemberExpression(j, localName, 'Influencer'), []),
    j.jsxClosingElement(createMemberExpression(j, localName, 'Influencer')),
    [j.jsxText('\n    '), content, j.jsxText('\n  ')]
  );
}

/**
 * Create Tearsheet.NavigationBar
 */
function createNavigationBar(j, localName, navigationValue) {
  if (!navigationValue) return null;

  const content = extractJSXValue(navigationValue);
  if (!content) return null;

  return j.jsxElement(
    j.jsxOpeningElement(
      createMemberExpression(j, localName, 'NavigationBar'),
      []
    ),
    j.jsxClosingElement(createMemberExpression(j, localName, 'NavigationBar')),
    [j.jsxText('\n    '), content, j.jsxText('\n  ')]
  );
}

/**
 * Create Tearsheet.Body with MainContent
 */
function createBody(j, localName, originalChildren) {
  // Create MainContent with original children
  const mainContent = j.jsxElement(
    j.jsxOpeningElement(
      createMemberExpression(j, localName, 'MainContent'),
      []
    ),
    j.jsxClosingElement(createMemberExpression(j, localName, 'MainContent')),
    originalChildren.length > 0
      ? [j.jsxText('\n      '), ...originalChildren, j.jsxText('\n    ')]
      : []
  );

  // Create Body wrapping MainContent
  const body = j.jsxElement(
    j.jsxOpeningElement(createMemberExpression(j, localName, 'Body'), []),
    j.jsxClosingElement(createMemberExpression(j, localName, 'Body')),
    [j.jsxText('\n    '), mainContent, j.jsxText('\n  ')]
  );

  return body;
}

/**
 * Create Tearsheet.Footer
 */
function createFooter(j, localName, footerProps) {
  if (footerProps.length === 0) return null;

  return j.jsxElement(
    j.jsxOpeningElement(
      createMemberExpression(j, localName, 'Footer'),
      footerProps,
      true // self-closing
    )
  );
}

/**
 * Transform Tearsheet JSX element to composable structure
 */
function transformTearsheetElement(j, path, localName) {
  const element = path.node;
  const openingElement = element.openingElement;
  const attributes = openingElement.attributes || [];
  const originalChildren = element.children || [];

  // Categorize props
  const rootProps = [];
  const headerProps = [];
  const headerContentProps = [];
  const footerProps = [];
  let influencerValue = null;
  let navigationValue = null;

  attributes.forEach((attr) => {
    if (attr.type !== 'JSXAttribute') {
      // Handle spread attributes
      rootProps.push(attr);
      return;
    }

    const propName = attr.name.name;

    // Handle deprecated props
    if (propName === 'slug') {
      // Rename slug to decorator
      attr.name.name = 'decorator';
      rootProps.push(attr);
      return;
    }

    if (propName === 'influencerPosition') {
      // Skip - no longer supported
      return;
    }

    // Categorize props
    if (ROOT_PROPS.includes(propName)) {
      rootProps.push(attr);
    } else if (HEADER_PROPS.includes(propName)) {
      headerProps.push(attr);
    } else if (HEADER_CONTENT_PROPS.includes(propName)) {
      headerContentProps.push(attr);
    } else if (propName === 'influencer') {
      influencerValue = attr.value;
    } else if (propName === 'navigation') {
      navigationValue = attr.value;
    } else if (FOOTER_PROPS.includes(propName)) {
      footerProps.push(attr);
    } else {
      // Unknown props stay on root
      rootProps.push(attr);
    }
  });

  // Build new composable structure
  const newChildren = [];

  // Add Header (if needed)
  const header = createHeader(j, localName, headerProps, headerContentProps);
  if (header) {
    newChildren.push(j.jsxText('\n  '), header);
  }

  // Add Influencer (if needed)
  const influencer = createInfluencer(j, localName, influencerValue);
  if (influencer) {
    newChildren.push(j.jsxText('\n  '), influencer);
  }

  // Add NavigationBar (if needed)
  const navigationBar = createNavigationBar(j, localName, navigationValue);
  if (navigationBar) {
    newChildren.push(j.jsxText('\n  '), navigationBar);
  }

  // Add Body (always)
  const body = createBody(j, localName, originalChildren);
  newChildren.push(j.jsxText('\n  '), body);

  // Add Footer (if needed)
  const footer = createFooter(j, localName, footerProps);
  if (footer) {
    newChildren.push(j.jsxText('\n  '), footer);
  }

  // Add final newline
  if (newChildren.length > 0) {
    newChildren.push(j.jsxText('\n'));
  }

  // Create new Tearsheet element with composable structure
  const newElement = j.jsxElement(
    j.jsxOpeningElement(j.jsxIdentifier(localName), rootProps),
    j.jsxClosingElement(j.jsxIdentifier(localName)),
    newChildren
  );

  return newElement;
}

function transform(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  let jsxTransformed = false;

  // Track local names for Tearsheet imports and their original imported names
  const tearsheetLocalNames = new Map(); // localName -> importedName

  // First pass: identify Tearsheet imports and track local names
  root
    .find(j.ImportDeclaration, {
      source: {
        value: '@carbon/ibm-products',
      },
    })
    .forEach((path) => {
      path.node.specifiers.forEach((specifier) => {
        if (specifier.type === 'ImportSpecifier') {
          const importedName = specifier.imported.name;
          const localName = specifier.local
            ? specifier.local.name
            : importedName;

          // Track Tearsheet imports
          if (
            importedName === 'Tearsheet' ||
            importedName === 'preview__Tearsheet'
          ) {
            tearsheetLocalNames.set(localName, importedName);
          }
        }
      });
    });

  // Second pass: Transform Tearsheet JSX elements
  root.find(j.JSXElement).forEach((path) => {
    const openingElement = path.node.openingElement;
    if (openingElement.name.type === 'JSXIdentifier') {
      const elementName = openingElement.name.name;

      // Check if this element uses a Tearsheet local name
      if (tearsheetLocalNames.has(elementName)) {
        // Check if already using composable API (idempotency check)
        const hasComposableChildren = path.node.children?.some((child) => {
          if (child.type === 'JSXElement') {
            const childName = child.openingElement.name;
            if (childName.type === 'JSXMemberExpression') {
              const objectName = childName.object.name;
              const propertyName = childName.property.name;
              // Check if child is Tearsheet.Header, Tearsheet.Body, etc.
              return (
                objectName === elementName &&
                [
                  'Header',
                  'Body',
                  'Footer',
                  'Influencer',
                  'NavigationBar',
                ].includes(propertyName)
              );
            }
          }
          return false;
        });

        // Only transform if not already using composable API
        if (!hasComposableChildren) {
          const newElement = transformTearsheetElement(j, path, elementName);
          j(path).replaceWith(newElement);
          jsxTransformed = true;
        }
      }
    }
  });

  // Third pass: Only transform imports if JSX was transformed
  if (jsxTransformed) {
    root
      .find(j.ImportDeclaration, {
        source: {
          value: '@carbon/ibm-products',
        },
      })
      .forEach((path) => {
        const seen = new Set();
        const newSpecifiers = [];

        path.node.specifiers.forEach((specifier) => {
          if (specifier.type === 'ImportSpecifier') {
            const importedName = specifier.imported.name;
            const localName = specifier.local
              ? specifier.local.name
              : importedName;

            // Check if this is Tearsheet
            if (
              importedName === 'Tearsheet' ||
              importedName === 'preview__Tearsheet'
            ) {
              // Transform to preview__Tearsheet as localName
              const newImported = j.identifier('preview__Tearsheet');
              const newLocal = j.identifier(localName);
              const newSpecifier = j.importSpecifier(newImported, newLocal);

              if (!seen.has(localName)) {
                newSpecifiers.push(newSpecifier);
                seen.add(localName);
              }
            } else {
              // Keep other imports as-is
              if (!seen.has(localName)) {
                newSpecifiers.push(specifier);
                seen.add(localName);
              }
            }
          } else {
            // Keep default imports and namespace imports
            newSpecifiers.push(specifier);
          }
        });

        path.node.specifiers = newSpecifiers;
      });

    return root.toSource({ quote: 'single', trailingComma: true });
  }

  // Return original source if no transformations were made
  return fileInfo.source;
}

module.exports = transform;
module.exports.parser = 'tsx';
