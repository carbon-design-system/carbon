/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { PRODUCTS_SOURCES, resolveImport } = require('./productsToCoreMapping');

/**
 * Moves exports of `@carbon/ibm-products` (and `@carbon/ibm-products-utilities`)
 * that now live in `@carbon/react`, `@carbon/utilities` or Carbon Labs to their
 * new packages and drops the `preview__` / `previewCandidate__` prefix.
 *
 * - Aliases are kept. A redundant alias (`preview__Tearsheet as Tearsheet`) is
 *   dropped.
 * - Specifiers are merged into an existing import of the target package.
 * - `import type` declarations and inline `type` specifiers are carried over.
 * - Imports that mix moved and untouched names are split.
 * - Names that are not in the mapping are left exactly as they are.
 *
 * Run it after `ibm-products-update-tearsheet`, `ibm-products-update-coachmark`
 * and `ibm-products-update-page-header-composable`.
 */

const nameOf = (node) => (node.type === 'Identifier' ? node.name : node.value);

const PROPERTY_LIKE = new Set([
  'Property',
  'ObjectProperty',
  'ObjectMethod',
  'ClassProperty',
  'ClassMethod',
  'ClassPrivateProperty',
  'MethodDefinition',
  'PropertyDefinition',
  'TSPropertySignature',
  'TSMethodSignature',
]);

/**
 * Returns false for identifiers that only share a name with a binding, like
 * `foo.preview__Bar` or `{ preview__Bar: 1 }`.
 */
function isReference(path) {
  const parent = path.parent.node;
  const key = path.name;

  switch (parent.type) {
    case 'ImportSpecifier':
    case 'ImportDefaultSpecifier':
    case 'ImportNamespaceSpecifier':
      return false;
    case 'MemberExpression':
    case 'OptionalMemberExpression':
      return !(key === 'property' && !parent.computed);
    case 'JSXMemberExpression':
      return key !== 'property';
    case 'TSQualifiedName':
      return key !== 'right';
    case 'JSXAttribute':
      return key !== 'name';
    case 'ExportSpecifier':
      return key === 'local';
    default:
      if (PROPERTY_LIKE.has(parent.type)) {
        return !(key === 'key' && !parent.computed);
      }
      return true;
  }
}

function renameReferences(j, root, from, to) {
  root
    .find(j.Identifier, { name: from })
    .filter(isReference)
    .forEach((path) => {
      const parent = path.parent.node;
      if (
        (parent.type === 'Property' || parent.type === 'ObjectProperty') &&
        parent.shorthand
      ) {
        parent.shorthand = false;
      }
      path.node.name = to;
    });

  root
    .find(j.JSXIdentifier, { name: from })
    .filter(isReference)
    .forEach((path) => {
      path.node.name = to;
    });
}

function isNameUsed(j, root, name) {
  return (
    root.find(j.Identifier, { name }).some((path) => isReference(path)) ||
    root.find(j.JSXIdentifier, { name }).some((path) => isReference(path))
  );
}

/**
 * Rewrites `Local.Member` for namespace-style exports. A `null` mapping
 * collapses `Local.Member` to `Local`.
 */
function rewriteMembers(j, root, local, memberMap) {
  root
    .find(j.JSXMemberExpression, {
      object: { type: 'JSXIdentifier', name: local },
    })
    .forEach((path) => {
      const member = path.node.property.name;
      if (!Object.prototype.hasOwnProperty.call(memberMap, member)) {
        return;
      }
      const mapped = memberMap[member];
      if (mapped === null) {
        path.replace(j.jsxIdentifier(local));
      } else {
        path.node.property = j.jsxIdentifier(mapped);
      }
    });

  root
    .find(j.MemberExpression, { object: { type: 'Identifier', name: local } })
    .filter(
      (path) => !path.node.computed && path.node.property.type === 'Identifier'
    )
    .forEach((path) => {
      const member = path.node.property.name;
      if (!Object.prototype.hasOwnProperty.call(memberMap, member)) {
        return;
      }
      const mapped = memberMap[member];
      if (mapped === null) {
        path.replace(j.identifier(local));
      } else {
        path.node.property = j.identifier(mapped);
      }
    });
}

function isPlainNamedImport(node, kind) {
  return (
    node.type === 'ImportDeclaration' &&
    (node.importKind === 'type' ? 'type' : 'value') === kind &&
    node.specifiers.length > 0 &&
    node.specifiers.every((specifier) => specifier.type === 'ImportSpecifier')
  );
}

function sameSpecifier(a, b) {
  return (
    nameOf(a.imported) === nameOf(b.imported) &&
    nameOf(a.local || a.imported) === nameOf(b.local || b.imported)
  );
}

function transform(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let dirty = false;

  const declarations = root
    .find(j.ImportDeclaration)
    .filter((path) => PRODUCTS_SOURCES.includes(path.node.source.value));

  if (declarations.length === 0) {
    return file.source;
  }

  declarations.forEach((path) => {
    const node = path.node;
    const kind = node.importKind === 'type' ? 'type' : 'value';
    const keep = [];
    const moves = [];

    node.specifiers.forEach((specifier) => {
      if (specifier.type !== 'ImportSpecifier') {
        keep.push(specifier);
        return;
      }
      const importedName = nameOf(specifier.imported);
      const target = resolveImport(node.source.value, importedName);
      if (!target) {
        keep.push(specifier);
        return;
      }
      moves.push({
        specifier,
        importedName,
        localName: specifier.local ? specifier.local.name : importedName,
        target,
      });
    });

    if (moves.length === 0) {
      return;
    }
    dirty = true;

    // Group the new specifiers by target package, in the order they appear.
    const groups = new Map();
    moves.forEach(({ specifier, importedName, localName, target }) => {
      const hasAlias = localName !== importedName;
      let newLocal = localName;

      if (target.memberMap) {
        rewriteMembers(j, root, localName, target.memberMap);
      }

      if (!hasAlias && importedName !== target.name) {
        if (isNameUsed(j, root, target.name)) {
          // Keep the old local name rather than clash with another binding.
          newLocal = importedName;
        } else {
          newLocal = target.name;
          renameReferences(j, root, importedName, target.name);
        }
      }

      const next =
        newLocal === target.name
          ? j.importSpecifier(j.identifier(target.name))
          : j.importSpecifier(
              j.identifier(target.name),
              j.identifier(newLocal)
            );
      if (specifier.importKind === 'type') {
        next.importKind = 'type';
      }

      if (!groups.has(target.pkg)) {
        groups.set(target.pkg, []);
      }
      groups.get(target.pkg).push(next);
    });

    node.specifiers = keep;

    const created = [];
    groups.forEach((specifiers, pkg) => {
      const existing = root
        .find(j.ImportDeclaration, { source: { value: pkg } })
        .filter((candidate) => candidate.node !== node)
        .filter((candidate) => isPlainNamedImport(candidate.node, kind))
        .paths()[0];

      if (existing) {
        specifiers.forEach((specifier) => {
          if (
            !existing.node.specifiers.some((s) => sameSpecifier(s, specifier))
          ) {
            existing.node.specifiers.push(specifier);
          }
        });
        return;
      }

      const sibling = created.find(
        (declaration) => declaration.source.value === pkg
      );
      if (sibling) {
        specifiers.forEach((specifier) => sibling.specifiers.push(specifier));
        return;
      }

      const declaration = j.importDeclaration(specifiers, j.stringLiteral(pkg));
      if (kind === 'type') {
        declaration.importKind = 'type';
      }
      created.push(declaration);
    });

    if (keep.length === 0) {
      if (created.length > 0) {
        // Reuse the original statement so comments and position are kept.
        const [first, ...rest] = created;
        node.source = first.source;
        node.specifiers = first.specifiers;
        if (rest.length > 0) {
          path.insertAfter(...rest);
        }
      } else {
        const body = path.parentPath.value;
        const index = body.indexOf(node);
        const next = body[index + 1];
        if (node.comments && next) {
          next.comments = node.comments.concat(next.comments || []);
        }
        j(path).remove();
      }
    } else if (created.length > 0) {
      path.insertAfter(...created);
    }
  });

  return dirty ? root.toSource({ quote: 'single' }) : file.source;
}

module.exports = transform;
module.exports.parser = 'tsx';
