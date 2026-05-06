/**
 * Copyright IBM Corp. 2026, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Rewrites PageHeader imports from Carbon packages to IBM Products packages.
 *
 * Transforms:
 *
 * import { preview__PageHeader as PageHeader } from '@carbon/react';
 *
 * Into:
 *
 * import { PageHeader } from '@carbon/ibm-products';
 */

'use strict';

const PRODUCTS_REACT_PATH = '@carbon/ibm-products';
const PRODUCTS_WEB_COMPONENTS_PATH = '@carbon/ibm-products-web-components';
const REACT_PAGE_HEADER_IMPORTS = new Set([
  'PageHeader',
  'PageHeaderBreadcrumbBar',
  'PageHeaderContent',
  'PageHeaderContentPageActions',
  'PageHeaderContentText',
  'PageHeaderHeroImage',
  'PageHeaderTabBar',
  'preview__PageHeader',
  'unstable__PageHeader',
]);

const normalizeReactImportName = (name) => {
  if (name === 'preview__PageHeader' || name === 'unstable__PageHeader') {
    return 'PageHeader';
  }

  return name;
};

const isReactPageHeaderPath = (value) =>
  /^@carbon\/react\/(es|lib)\/components\/PageHeader(?:\/index(?:\.js)?)?$/.test(
    value
  );

const rewriteWebComponentsPath = (value) => {
  if (value.startsWith('@carbon/web-components/es/components/page-header')) {
    return value.replace(
      '@carbon/web-components/es/components/page-header',
      `${PRODUCTS_WEB_COMPONENTS_PATH}/es/components/page-header`
    );
  }

  if (value.startsWith('@carbon/web-components/lib/components/page-header')) {
    return value.replace(
      '@carbon/web-components/lib/components/page-header',
      `${PRODUCTS_WEB_COMPONENTS_PATH}/lib/components/page-header`
    );
  }

  return value;
};

const dedupeSpecifiers = (specifiers) => {
  const seen = new Set();

  return specifiers.filter((specifier) => {
    if (specifier.type !== 'ImportSpecifier') {
      return true;
    }

    const importedName = specifier.imported.name;
    const localName = specifier.local?.name ?? importedName;
    const key = `${importedName}:${localName}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
};

const createPageHeaderSpecifier = (j, specifier) => {
  if (
    specifier.type !== 'ImportSpecifier' ||
    !REACT_PAGE_HEADER_IMPORTS.has(specifier.imported.name)
  ) {
    return specifier;
  }

  const importedName = normalizeReactImportName(specifier.imported.name);
  const localName = specifier.local?.name;

  return localName && localName !== importedName
    ? j.importSpecifier(j.identifier(importedName), j.identifier(localName))
    : j.importSpecifier(j.identifier(importedName));
};

function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  function findProductsReactImport(excludePath) {
    let productsReactImport = null;

    root
      .find(j.ImportDeclaration, {
        source: {
          value: PRODUCTS_REACT_PATH,
        },
      })
      .forEach((path) => {
        if (!productsReactImport && path !== excludePath) {
          productsReactImport = path;
        }
      });

    return productsReactImport;
  }

  function addProductsReactSpecifiers(specifiers, insertAfterPath) {
    const productsReactImport = findProductsReactImport();

    if (productsReactImport) {
      productsReactImport.node.specifiers = dedupeSpecifiers([
        ...productsReactImport.node.specifiers,
        ...specifiers,
      ]);
      return;
    }

    const newImportDeclaration = j.importDeclaration(
      dedupeSpecifiers(specifiers),
      j.literal(PRODUCTS_REACT_PATH)
    );

    j(insertAfterPath).insertAfter(newImportDeclaration);
  }

  root
    .find(j.ImportDeclaration, {
      source: {
        value: '@carbon/react',
      },
    })
    .forEach((path) => {
      const movedSpecifiers = [];
      const remainingSpecifiers = [];

      path.node.specifiers.forEach((specifier) => {
        if (
          specifier.type === 'ImportSpecifier' &&
          REACT_PAGE_HEADER_IMPORTS.has(specifier.imported.name)
        ) {
          movedSpecifiers.push(createPageHeaderSpecifier(j, specifier));
          return;
        }

        remainingSpecifiers.push(specifier);
      });

      if (movedSpecifiers.length === 0) {
        return;
      }

      if (remainingSpecifiers.length === 0) {
        const productsReactImport = findProductsReactImport(path);

        if (productsReactImport) {
          productsReactImport.node.specifiers = dedupeSpecifiers([
            ...productsReactImport.node.specifiers,
            ...movedSpecifiers,
          ]);
          j(path).remove();
        } else {
          const newImportDeclaration = j.importDeclaration(
            dedupeSpecifiers(movedSpecifiers),
            j.literal(PRODUCTS_REACT_PATH)
          );

          j(path).replaceWith(newImportDeclaration);
        }

        return;
      }

      path.node.specifiers = remainingSpecifiers;
      addProductsReactSpecifiers(movedSpecifiers, path);
    });

  root.find(j.ImportDeclaration).forEach((path) => {
    const sourceValue = path.node.source.value;

    if (typeof sourceValue !== 'string') {
      return;
    }

    if (isReactPageHeaderPath(sourceValue)) {
      const specifiers = path.node.specifiers.map((specifier) =>
        createPageHeaderSpecifier(j, specifier)
      );
      const productsReactImport = findProductsReactImport(path);

      if (productsReactImport) {
        productsReactImport.node.specifiers = dedupeSpecifiers([
          ...productsReactImport.node.specifiers,
          ...specifiers,
        ]);
        j(path).remove();
      } else {
        path.node.source = j.literal(PRODUCTS_REACT_PATH);
        path.node.specifiers = dedupeSpecifiers(specifiers);
      }

      return;
    }

    const rewrittenWebComponentsPath = rewriteWebComponentsPath(sourceValue);

    if (rewrittenWebComponentsPath !== sourceValue) {
      path.node.source = j.literal(rewrittenWebComponentsPath);
    }
  });

  return root.toSource();
}

module.exports = transformer;
