/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Migrates TagSet (deprecated) to TagOverflow. Summary of changes:
 *
 * Imports:
 *   import { TagSet } from '@carbon/ibm-products'
 *   → import { TagOverflow } from '@carbon/ibm-products'
 *   (or '@carbon/react' when the consumer opts into the core package)
 *
 * JSX element name:
 *   <TagSet …> → <TagOverflow …>
 *
 * Prop renames:
 *   tags={…}              → items={…}
 *   overflowAutoAlign={…} → autoAlign={…}
 *
 * Per-item field renames (inside the items/tags array literal):
 *   type → tagType
 *   Inject a stable `id` field when one is absent (slug from label, fallback
 *   to array index).
 *
 * Removed / flagged props:
 *   onOverflowClick  — no equivalent; replaced with a TODO comment
 *
 * Deprecated-but-kept props (left in place, given an inline @deprecated note):
 *   containingElementRef, measurementOffset, multiline
 */

'use strict';

const defaultOptions = {
  quote: 'single',
  trailingComma: true,
};

// Props that are simply renamed on the element
const PROP_RENAMES = {
  tags: 'items',
  overflowAutoAlign: 'autoAlign',
};

// Props that have been removed with no equivalent
const REMOVED_PROPS = new Set(['onOverflowClick']);

// Props that are deprecated but kept – we annotate them
const DEPRECATED_PROPS = new Set([
  'containingElementRef',
  'measurementOffset',
  'multiline',
]);

/**
 * Convert an arbitrary string into a simple slug (lowercase, hyphens).
 * Used to synthesise a stable `id` value from an item's `label`.
 */
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Attempt to read a static string value from a JSX attribute value node.
 * Returns undefined when the value is dynamic / not a string literal.
 */
function staticStringValue(valueNode) {
  if (!valueNode) return undefined;
  // <Comp prop="value" />  → StringLiteral
  if (valueNode.type === 'StringLiteral') return valueNode.value;
  // <Comp prop={'value'} /> → JSXExpressionContainer > StringLiteral
  if (
    valueNode.type === 'JSXExpressionContainer' &&
    valueNode.expression.type === 'StringLiteral'
  ) {
    return valueNode.expression.value;
  }
  return undefined;
}

/**
 * Read the key name of an object property, or null when it is not static.
 */
function getKeyName(prop) {
  if (prop.type !== 'ObjectProperty' && prop.type !== 'Property') return null;
  if (prop.key.type === 'Identifier') return prop.key.name;
  if (prop.key.type === 'StringLiteral') return prop.key.value;
  return null;
}

/**
 * Return an id based on `base` that is not in `usedIds` (`info`, `info-1`, …)
 * and record it as used.
 */
function uniqueId(base, usedIds) {
  let candidate = base;
  let counter = 1;
  while (usedIds.has(candidate)) {
    candidate = `${base}-${counter++}`;
  }
  usedIds.add(candidate);
  return candidate;
}

/**
 * Transform object properties within an item object literal:
 *   - rename `type` → `tagType`
 *   - inject a unique `id` when absent
 *
 * @param {object} j            - jscodeshift API
 * @param {object} objExpr      - ObjectExpression AST node (one tag item)
 * @param {number} index        - array index (fallback for id generation)
 * @param {Set<string>} usedIds - ids already used in the same array
 */
function transformItemObject(j, objExpr, index, usedIds) {
  const props = objExpr.properties;
  let hasId = false;
  let labelValue;

  for (const prop of props) {
    const keyName = getKeyName(prop);

    if (keyName === 'type') {
      prop.key = j.identifier('tagType');
    }
    if (keyName === 'id') {
      hasId = true;
    }
    if (keyName === 'label') {
      labelValue = staticStringValue(prop.value);
    }
  }

  if (!hasId) {
    // slugify returns '' for non-Latin or punctuation-only labels
    const base = (labelValue && slugify(labelValue)) || `tag-${index}`;
    props.unshift(
      j.objectProperty(
        j.identifier('id'),
        j.stringLiteral(uniqueId(base, usedIds))
      )
    );
  }
}

/**
 * Transform every object literal in an inline array of tag items.
 * Arrays containing anything other than object literals (spreads,
 * conditionals, references) cannot be fully migrated, so they are reported as
 * not handled and the caller adds a TODO comment.
 *
 * @returns {boolean} true when every element was migrated
 */
function transformItemsArray(j, valueNode) {
  const expr =
    valueNode && valueNode.type === 'JSXExpressionContainer'
      ? valueNode.expression
      : valueNode;

  if (!expr || expr.type !== 'ArrayExpression') {
    return false;
  }

  const isObject = (el) => el && el.type === 'ObjectExpression';

  // Reserve explicit ids first so generated ids never collide with them
  const usedIds = new Set();
  expr.elements.filter(isObject).forEach((obj) => {
    obj.properties.forEach((prop) => {
      if (getKeyName(prop) === 'id') {
        const value = staticStringValue(prop.value);
        if (value !== undefined) usedIds.add(value);
      }
    });
  });

  expr.elements.forEach((el, idx) => {
    if (isObject(el)) transformItemObject(j, el, idx, usedIds);
  });

  return expr.elements.every(isObject);
}

function transform(fileInfo, api, options) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const printOptions = options.printOptions || defaultOptions;

  const tagSetLocalNames = new Map(); // localName → { importPath, sourceValue }

  const IMPORT_SOURCES = ['@carbon/ibm-products', '@carbon/react'];

  IMPORT_SOURCES.forEach((src) => {
    root
      .find(j.ImportDeclaration, { source: { value: src } })
      .forEach((importPath) => {
        importPath.node.specifiers.forEach((spec) => {
          if (spec.type !== 'ImportSpecifier') return;
          if (spec.imported.name === 'TagSet') {
            const localName = spec.local ? spec.local.name : 'TagSet';
            tagSetLocalNames.set(localName, {
              importPath,
              sourceValue: src,
            });
          }
        });
      });
  });

  if (tagSetLocalNames.size === 0) {
    return null; // nothing to transform
  }

  let changed = false;

  tagSetLocalNames.forEach((_, localName) => {
    // Aliased imports (`TagSet as MyAlias`) keep their JSX identifier
    const jsxTargetName = localName === 'TagSet' ? 'TagOverflow' : localName;

    root
      .find(j.JSXElement, {
        openingElement: { name: { name: localName } },
      })
      .forEach((elPath) => {
        changed = true;
        const opening = elPath.node.openingElement;
        const closing = elPath.node.closingElement;

        opening.name = j.jsxIdentifier(jsxTargetName);
        if (closing) {
          closing.name = j.jsxIdentifier(jsxTargetName);
        }

        const newAttrs = [];
        for (const attr of opening.attributes) {
          if (attr.type !== 'JSXAttribute') {
            newAttrs.push(attr);
            continue;
          }

          const propName = attr.name.name;

          if (REMOVED_PROPS.has(propName)) {
            // The attribute is dropped; the TODO goes on the element instead
            const todo = j.line(
              ' TODO: TagSet → TagOverflow migration: onOverflowClick has no' +
                ' direct equivalent in TagOverflow. Handle overflow manually or remove this prop.'
            );
            todo.leading = true;
            todo.trailing = false;
            elPath.node.comments = elPath.node.comments || [];
            elPath.node.comments.push(todo);
            continue;
          }

          if (DEPRECATED_PROPS.has(propName)) {
            const deprecatedComment = j.line(
              ` @deprecated ${propName} is deprecated in TagOverflow; review before removing`
            );
            deprecatedComment.leading = true;
            deprecatedComment.trailing = false;
            attr.comments = attr.comments || [];
            attr.comments.push(deprecatedComment);
            newAttrs.push(attr);
            continue;
          }

          if (propName === 'tags') {
            attr.name = j.jsxIdentifier('items');

            const handled = transformItemsArray(j, attr.value);
            if (!handled) {
              const todoItems = j.line(
                ' TODO: TagSet → TagOverflow migration: rename `type` → `tagType`' +
                  ' and add a unique `id` field to each item object.'
              );
              todoItems.leading = true;
              todoItems.trailing = false;
              elPath.node.comments = elPath.node.comments || [];
              elPath.node.comments.push(todoItems);
            }

            newAttrs.push(attr);
            continue;
          }

          if (PROP_RENAMES[propName]) {
            attr.name = j.jsxIdentifier(PROP_RENAMES[propName]);
          }
          newAttrs.push(attr);
        }

        opening.attributes = newAttrs;
      });
  });

  if (!changed) {
    return null;
  }

  tagSetLocalNames.forEach(({ importPath }) => {
    const specifiers = importPath.node.specifiers;
    const idx = specifiers.findIndex(
      (s) => s.type === 'ImportSpecifier' && s.imported.name === 'TagSet'
    );
    if (idx === -1) return;

    const existing = specifiers[idx];
    // Determine alias: if user wrote `TagSet as MyTagSet`, keep `MyTagSet`
    const alias =
      existing.local && existing.local.name !== 'TagSet'
        ? existing.local.name
        : null;

    const newSpecifier = alias
      ? j.importSpecifier(j.identifier('TagOverflow'), j.identifier(alias))
      : j.importSpecifier(j.identifier('TagOverflow'));

    specifiers[idx] = newSpecifier;
  });

  return root.toSource(printOptions);
}

module.exports = transform;
module.exports.parser = 'tsx';
