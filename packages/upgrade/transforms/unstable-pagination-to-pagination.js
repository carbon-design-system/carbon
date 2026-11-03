/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Migrate unstable_Pagination / preview_Pagination to the stable Pagination
 * component. Removes the PageSelector import and children render-prop, since
 * the stable Pagination renders an equivalent page-select control by default.
 */

'use strict';

const defaultOptions = {
  quote: 'single',
  trailingComma: true,
};

// All known import names for the deprecated components
const UNSTABLE_PAGINATION_NAMES = new Set([
  'unstable_Pagination',
  'preview_Pagination',
]);

const UNSTABLE_PAGE_SELECTOR_NAMES = new Set([
  'unstable_PageSelector',
  'preview_PageSelector',
]);

function transform(fileInfo, api, options) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const printOptions = options.printOptions || defaultOptions;

  // Collect the local names for the deprecated components from @carbon/react imports
  let paginationLocalName = null; // local JSX name, e.g. "Pagination"
  let paginationLocalAlias = null; // stable replacement name, e.g. "Pagination"

  const carbonImports = root.find(j.ImportDeclaration, {
    source: { value: '@carbon/react' },
  });

  if (!carbonImports.length) {
    return null;
  }

  carbonImports.forEach((path) => {
    path.node.specifiers.forEach((spec) => {
      if (spec.type !== 'ImportSpecifier') return;
      const importedName = spec.imported.name;
      if (UNSTABLE_PAGINATION_NAMES.has(importedName) && !paginationLocalName) {
        paginationLocalName = spec.local.name;
        paginationLocalAlias =
          paginationLocalName === importedName
            ? 'Pagination'
            : paginationLocalName;
      }
    });
  });

  if (!paginationLocalName) {
    return null; // nothing to transform
  }

  // Rewrite import specifiers — swap unstable/preview for stable Pagination,
  // drop PageSelector (no longer needed)
  carbonImports.forEach((path) => {
    const kept = [];
    path.node.specifiers.forEach((spec) => {
      if (spec.type !== 'ImportSpecifier') {
        kept.push(spec);
        return;
      }
      const importedName = spec.imported.name;

      if (UNSTABLE_PAGINATION_NAMES.has(importedName)) {
        // Replace with stable `Pagination`.
        // Only emit `as localName` when the user chose a different local alias.
        const localName = paginationLocalAlias;
        const newSpec =
          localName === 'Pagination'
            ? j.importSpecifier(j.identifier('Pagination'))
            : j.importSpecifier(
                j.identifier('Pagination'),
                j.identifier(localName)
              );
        kept.push(newSpec);
        return;
      }

      if (UNSTABLE_PAGE_SELECTOR_NAMES.has(importedName)) {
        // Drop — no longer needed once the children block is removed
        return;
      }

      kept.push(spec);
    });
    path.node.specifiers = kept;
  });

  // Sort alphabetically for consistency
  carbonImports
    .get(0)
    .node.specifiers.sort((a, b) =>
      (a.imported?.name ?? '').localeCompare(b.imported?.name ?? '')
    );

  // Rename JSX elements to use the stable Pagination name
  root
    .find(j.JSXOpeningElement, { name: { name: paginationLocalName } })
    .forEach((path) => {
      path.node.name = j.jsxIdentifier(paginationLocalAlias);
    });
  root
    .find(j.JSXClosingElement, { name: { name: paginationLocalName } })
    .forEach((path) => {
      path.node.name = j.jsxIdentifier(paginationLocalAlias);
    });

  // Drop any children and make the element self-closing, adding a TODO comment
  // so the user knows to migrate manually using the renderPageSelect prop
  root
    .find(j.JSXElement, {
      openingElement: { name: { name: paginationLocalAlias } },
    })
    .forEach((path) => {
      const element = path.node;

      // Filter out whitespace-only JSX text children
      const meaningfulChildren = element.children.filter(
        (child) => !(child.type === 'JSXText' && child.value.trim() === '')
      );

      if (meaningfulChildren.length === 0) return;

      // Drop children, make self-closing, and attach a TODO comment so the
      // user knows to migrate manually using the renderPageSelect prop
      element.children = [];
      element.openingElement.selfClosing = true;
      element.closingElement = null;

      const todoComment = j.line(
        ' TODO: manually migrate children to the renderPageSelect prop if necessary.'
      );
      path.node.comments = path.node.comments || [];
      todoComment.leading = true;
      todoComment.trailing = false;
      path.node.comments.push(todoComment);
    });

  return root.toSource(printOptions);
}

module.exports = transform;
module.exports.parser = 'tsx';
