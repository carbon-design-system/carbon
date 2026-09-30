/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Migrate v11 theme names to v12 two-theme model.
 *
 * JSX transforms:
 *
 *   <Theme theme="white"> → <Theme theme="light">
 *   <Theme theme="g10">   → <Theme theme="light">
 *   <Theme theme="g90">   → <Theme theme="dark">
 *   <Theme theme="g100">  → <Theme theme="dark">
 *
 * Nested same-group detection:
 *   When an outer <Theme> and an inner <Theme> both map to the same v12 group
 *   (e.g. g10 wrapping white, both → light), the inner <Theme> is converted
 *   to <Layer> to preserve the original layering intent.
 *
 *   <Theme theme="g10">          <Theme theme="light">
 *     <Theme theme="white">  →     <Layer>
 *     </Theme>                     </Layer>
 *   </Theme>                     </Theme>
 *
 * Sass/HTML string transforms (via raw source replacement):
 *   data-carbon-theme="white" → data-carbon-theme="light"
 *   data-carbon-theme="g10"   → data-carbon-theme="light"
 *   data-carbon-theme="g90"   → data-carbon-theme="dark"
 *   data-carbon-theme="g100"  → data-carbon-theme="dark"
 */

'use strict';

const defaultOptions = {
  quote: 'single',
  trailingComma: true,
};

// Maps every v11 theme name to its v12 equivalent.
const THEME_MAP = {
  white: 'light',
  g10: 'light',
  g90: 'dark',
  g100: 'dark',
};

const V11_NAMES = new Set(Object.keys(THEME_MAP));

/**
 * Returns the v12 theme name for a v11 name, or null if not a v11 name.
 *
 * @param {string} value
 * @returns {string|null}
 */
function toV12Theme(value) {
  return THEME_MAP[value] ?? null;
}

/**
 * Returns true when a JSX attribute value is a plain string literal.
 * Handles both Babel (`Literal`) and recast/TSX (`StringLiteral`) parsers.
 *
 * @param {object} node  JSX attribute value node
 * @returns {boolean}
 */
function isStringLiteral(node) {
  return node && (node.type === 'StringLiteral' || node.type === 'Literal');
}

/**
 * Ensures `Layer` is imported from `@carbon/react`. Adds a specifier to an
 * existing `@carbon/react` import, or inserts a new import declaration.
 *
 * @param {object} root  jscodeshift root
 * @param {object} j     jscodeshift
 */
function ensureLayerImport(root, j) {
  const carbonImport = root.find(j.ImportDeclaration, {
    source: { value: '@carbon/react' },
  });

  if (carbonImport.length) {
    const specifiers = carbonImport.get('specifiers');
    const alreadyImported = specifiers.value.some(
      (s) => s.imported && s.imported.name === 'Layer'
    );
    if (!alreadyImported) {
      specifiers.value.push(j.importSpecifier(j.identifier('Layer')));
    }
  } else {
    const newImport = j.importDeclaration(
      [j.importSpecifier(j.identifier('Layer'))],
      j.literal('@carbon/react')
    );
    const firstImport = root.find(j.ImportDeclaration).at(0);
    if (firstImport.length) {
      firstImport.insertAfter(newImport);
    } else {
      root.find(j.Program).get('body', 0).insertBefore(newImport);
    }
  }
}

function transform(fileInfo, api, options) {
  const { jscodeshift: j } = api;
  const root = j(fileInfo.source);
  const printOptions = options.printOptions || defaultOptions;

  // Collect all <Theme theme="<v11-name>"> paths first, before any mutation.
  // We snapshot the original v11 name on each path so ancestor checks still
  // see the original values even after siblings have been rewritten.
  const candidates = [];
  root
    .find(j.JSXElement, { openingElement: { name: { name: 'Theme' } } })
    .forEach((path) => {
      const themeProp = path.node.openingElement.attributes.find(
        (attr) =>
          attr.type === 'JSXAttribute' &&
          attr.name.name === 'theme' &&
          isStringLiteral(attr.value) &&
          V11_NAMES.has(attr.value.value)
      );
      if (themeProp) {
        candidates.push({ path, themeProp, v11Name: themeProp.value.value });
      }
    });

  if (candidates.length === 0) {
    return null; // nothing to do
  }

  // Build a map from JSX node → original v11 name so ancestor lookups
  // use the pre-mutation name rather than whatever we may have already written.
  const originalNames = new Map(
    candidates.map(({ path, v11Name }) => [path.node, v11Name])
  );

  let needsLayerImport = false;

  // Process deepest nodes first (reverse document order) so that when we
  // replace an inner <Theme> with <Layer>, the outer <Theme> is still intact.
  candidates.reverse().forEach(({ path, themeProp, v11Name }) => {
    const v12Name = toV12Theme(v11Name);

    // Walk up to find the nearest ancestor <Theme> and read its *original* name.
    let current = path.parent;
    let ancestorOriginalV11 = null;
    while (current) {
      if (
        current.node.type === 'JSXElement' &&
        current.node.openingElement.name.name === 'Theme'
      ) {
        ancestorOriginalV11 =
          originalNames.get(current.node) ??
          (() => {
            const p = current.node.openingElement.attributes.find(
              (attr) =>
                attr.type === 'JSXAttribute' &&
                attr.name.name === 'theme' &&
                isStringLiteral(attr.value)
            );
            return p ? p.value.value : null;
          })();
        break;
      }
      current = current.parent;
    }

    // If the nearest ancestor Theme maps to the same v12 group, this Theme
    // exists only for visual layering — convert it to <Layer> instead.
    if (ancestorOriginalV11 && toV12Theme(ancestorOriginalV11) === v12Name) {
      needsLayerImport = true;
      const layerElement = j.jsxElement(
        j.jsxOpeningElement(j.jsxIdentifier('Layer'), []),
        j.jsxClosingElement(j.jsxIdentifier('Layer')),
        path.node.children
      );
      j(path).replaceWith(layerElement);
      return;
    }

    // Otherwise update the theme prop value in place.
    // Use j.literal for Babel-parser compatibility (j.stringLiteral is TSX-only).
    themeProp.value = j.literal(v12Name);
  });

  if (needsLayerImport) {
    ensureLayerImport(root, j);
  }

  return root.toSource(printOptions);
}

module.exports = transform;
