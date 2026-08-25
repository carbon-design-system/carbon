/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Rewrites stable PageHeader to composable PageHeader
 *
 * Transforms:
 *
 * <PageHeader
 *   title="Page title"
 *   subtitle="Optional subtitle"
 *   breadcrumbs={[...]}
 *   pageActions={[...]}
 *   actionBarItems={[...]}
 *   navigation={<Tabs>...</Tabs>}
 *   tags={[...]}
 * >
 *   <p>Content</p>
 * </PageHeader>
 *
 * Into:
 *
 * <PageHeader>
 *   <PageHeader.BreadcrumbBar breadcrumbs={[...]} />
 *   <PageHeader.Content title="Page title" pageActions={[...]} contextualActions={[...]}>
 *     <PageHeader.ContentText subtitle="Optional subtitle" />
 *     <p>Content</p>
 *   </PageHeader.Content>
 *   <PageHeader.TabBar>{<Tabs>...</Tabs>}</PageHeader.TabBar>
 *   <PageHeader.TagOverflow tags={[...]} />
 * </PageHeader>
 */

'use strict';

const transform = (fileInfo, api) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  let dirtyFlag = false;

  // Find the local name used for PageHeader import (could be aliased)
  let pageHeaderLocalName = null;
  root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === '@carbon/ibm-products')
    .forEach((path) => {
      path.node.specifiers.forEach((specifier) => {
        if (
          specifier.type === 'ImportSpecifier' &&
          specifier.imported &&
          specifier.imported.name === 'PageHeader'
        ) {
          pageHeaderLocalName = specifier.local
            ? specifier.local.name
            : 'PageHeader';
        }
      });
    });

  // If PageHeader is not imported, nothing to transform
  if (!pageHeaderLocalName) {
    return root.toSource();
  }

  // Helper to create JSX member expression (e.g., PageHeader.Content)
  const createMemberExpression = (object, property) => {
    return j.jsxMemberExpression(
      j.jsxIdentifier(object),
      j.jsxIdentifier(property)
    );
  };

  // Helper to create JSX element with member expression
  const createMemberJSXElement = (object, property, attributes, children) => {
    const memberExpression = createMemberExpression(object, property);
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

  // Transform PageHeader components (using the local name which could be an alias)
  root
    .find(j.JSXElement, {
      openingElement: { name: { name: pageHeaderLocalName } },
    })
    .forEach((path) => {
      const attributes = path.node.openingElement.attributes;
      const originalChildren = path.node.children || [];

      // Props to extract
      let titleProp = null;
      let subtitleProp = null;
      let breadcrumbsProp = null;
      let breadcrumbOverflowAriaLabelProp = null;
      let pageActionsProp = null;
      let actionBarItemsProp = null;
      let navigationProp = null;
      let tagsProp = null;
      let showAllTagsLabelProp = null;
      let allTagsModalTitleProp = null;
      let allTagsModalSearchLabelProp = null;
      let allTagsModalSearchPlaceholderTextProp = null;

      // Props to keep on root PageHeader
      const rootAttributes = [];

      // Deprecated props to ignore
      const deprecatedProps = [
        'collapseHeader',
        'collapseHeaderIconDescription',
        'expandHeaderIconDescription',
        'hasCollapseHeaderToggle',
        'enableBreadcrumbScroll',
        'withoutBackground',
      ];

      // Process attributes
      attributes.forEach((attr) => {
        if (attr.type !== 'JSXAttribute') {
          rootAttributes.push(attr);
          return;
        }

        const attrName = attr.name.name;

        // Extract props for transformation
        if (attrName === 'title') {
          titleProp = attr;
        } else if (attrName === 'subtitle') {
          subtitleProp = attr;
        } else if (attrName === 'breadcrumbs') {
          breadcrumbsProp = attr;
        } else if (attrName === 'breadcrumbOverflowAriaLabel') {
          breadcrumbOverflowAriaLabelProp = attr;
        } else if (attrName === 'pageActions') {
          pageActionsProp = attr;
        } else if (attrName === 'actionBarItems') {
          actionBarItemsProp = attr;
        } else if (attrName === 'navigation') {
          navigationProp = attr;
        } else if (attrName === 'tags') {
          tagsProp = attr;
        } else if (attrName === 'showAllTagsLabel') {
          showAllTagsLabelProp = attr;
        } else if (attrName === 'allTagsModalTitle') {
          allTagsModalTitleProp = attr;
        } else if (attrName === 'allTagsModalSearchLabel') {
          allTagsModalSearchLabelProp = attr;
        } else if (attrName === 'allTagsModalSearchPlaceholderText') {
          allTagsModalSearchPlaceholderTextProp = attr;
        } else if (deprecatedProps.includes(attrName)) {
          // Ignore deprecated props
        } else {
          // Keep other props on root
          rootAttributes.push(attr);
        }
      });

      // Only transform if we have any props that need migration
      const needsTransformation =
        titleProp ||
        subtitleProp ||
        breadcrumbsProp ||
        pageActionsProp ||
        actionBarItemsProp ||
        navigationProp ||
        tagsProp;

      if (!needsTransformation) {
        return; // Skip this PageHeader, no transformation needed
      }

      dirtyFlag = true;

      const newChildren = [];

      // 1. Add BreadcrumbBar if breadcrumbs exist
      if (breadcrumbsProp) {
        const breadcrumbBarAttrs = [breadcrumbsProp];
        if (breadcrumbOverflowAriaLabelProp) {
          breadcrumbBarAttrs.push(breadcrumbOverflowAriaLabelProp);
        }
        newChildren.push(
          createMemberJSXElement(
            pageHeaderLocalName,
            'BreadcrumbBar',
            breadcrumbBarAttrs,
            []
          )
        );
      }

      // 2. Add Content if title exists
      if (titleProp) {
        const contentAttrs = [titleProp];

        // Handle title as object with icon
        if (
          titleProp.value &&
          titleProp.value.type === 'JSXExpressionContainer'
        ) {
          const titleExpr = titleProp.value.expression;
          if (titleExpr.type === 'ObjectExpression') {
            // Extract text and icon from title object
            const textProp = titleExpr.properties.find(
              (p) => p.key && p.key.name === 'text'
            );
            const iconProp = titleExpr.properties.find(
              (p) => p.key && p.key.name === 'icon'
            );

            if (textProp) {
              // Replace title with just the text value
              contentAttrs[0] = j.jsxAttribute(
                j.jsxIdentifier('title'),
                j.jsxExpressionContainer(textProp.value)
              );
            }

            if (iconProp) {
              // Add renderIcon prop
              contentAttrs.push(
                j.jsxAttribute(
                  j.jsxIdentifier('renderIcon'),
                  j.jsxExpressionContainer(iconProp.value)
                )
              );
            }
          }
        }

        // Add pageActions if exists
        if (pageActionsProp) {
          contentAttrs.push(pageActionsProp);
        }

        // Add contextualActions (from actionBarItems) if exists
        if (actionBarItemsProp) {
          const contextualActionsAttr = j.jsxAttribute(
            j.jsxIdentifier('contextualActions'),
            actionBarItemsProp.value
          );
          contentAttrs.push(contextualActionsAttr);
        }

        const contentChildren = [];

        // Add ContentText if subtitle exists
        if (subtitleProp) {
          contentChildren.push(
            createMemberJSXElement(
              pageHeaderLocalName,
              'ContentText',
              [subtitleProp],
              []
            )
          );
        }

        // Add original children to Content
        contentChildren.push(...originalChildren);

        newChildren.push(
          createMemberJSXElement(
            pageHeaderLocalName,
            'Content',
            contentAttrs,
            contentChildren
          )
        );
      }

      // 3. Add TabBar if navigation exists
      if (navigationProp) {
        const tabBarChildren = [];
        if (navigationProp.value.type === 'JSXExpressionContainer') {
          tabBarChildren.push(navigationProp.value.expression);
        }
        newChildren.push(
          createMemberJSXElement(
            pageHeaderLocalName,
            'TabBar',
            [],
            tabBarChildren
          )
        );
      }

      // 4. Add TagOverflow if tags exist
      if (tagsProp) {
        const tagOverflowAttrs = [tagsProp];
        if (showAllTagsLabelProp) {
          tagOverflowAttrs.push(showAllTagsLabelProp);
        }
        if (allTagsModalTitleProp) {
          tagOverflowAttrs.push(allTagsModalTitleProp);
        }
        if (allTagsModalSearchLabelProp) {
          tagOverflowAttrs.push(allTagsModalSearchLabelProp);
        }
        if (allTagsModalSearchPlaceholderTextProp) {
          tagOverflowAttrs.push(allTagsModalSearchPlaceholderTextProp);
        }
        newChildren.push(
          createMemberJSXElement(
            pageHeaderLocalName,
            'TagOverflow',
            tagOverflowAttrs,
            []
          )
        );
      }

      // Update the PageHeader element
      path.node.openingElement.attributes = rootAttributes;
      path.node.children = newChildren;

      // If PageHeader was self-closing, convert it to have opening/closing tags
      if (path.node.openingElement.selfClosing) {
        path.node.openingElement.selfClosing = false;
      }
      if (!path.node.closingElement) {
        path.node.closingElement = j.jsxClosingElement(
          j.jsxIdentifier(pageHeaderLocalName)
        );
      }
    });

  // Update imports if transformation occurred
  if (dirtyFlag) {
    root
      .find(j.ImportDeclaration)
      .filter((path) => path.node.source.value === '@carbon/ibm-products')
      .forEach((path) => {
        const specifiers = path.node.specifiers;
        let hasPageHeader = false;

        // Check if PageHeader is imported
        specifiers.forEach((specifier) => {
          if (
            specifier.type === 'ImportSpecifier' &&
            specifier.imported &&
            specifier.imported.name === 'PageHeader'
          ) {
            hasPageHeader = true;
          }
        });

        // If PageHeader is imported, update to preview version
        if (hasPageHeader) {
          const newSpecifiers = specifiers.map((specifier) => {
            if (
              specifier.type === 'ImportSpecifier' &&
              specifier.imported &&
              specifier.imported.name === 'PageHeader'
            ) {
              // Change to preview__PageHeader, preserving the local name (alias)
              // If there's a local name (alias), preserve it; otherwise use 'PageHeader'
              const localName = specifier.local
                ? specifier.local.name
                : 'PageHeader';
              return j.importSpecifier(
                j.identifier('preview__PageHeader'),
                j.identifier(localName)
              );
            }
            return specifier;
          });

          path.node.specifiers = newSpecifiers;
        }
      });
  }

  return root.toSource();
};

module.exports = transform;
