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

// ─── helpers ──────────────────────────────────────────────────────────────────

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
 * Transform object properties within an item object literal:
 *   - rename `type` → `tagType`
 *   - inject `id` when absent
 *
 * @param {object} j         - jscodeshift API
 * @param {object} objExpr   - ObjectExpression AST node (one tag item)
 * @param {number} index     - array index (fallback for id generation)
 */
function transformItemObject(j, objExpr, index) {
  if (!objExpr || objExpr.type !== 'ObjectExpression') return;

  const props = objExpr.properties;
  let hasId = false;
  let labelValue = undefined;

  // Pass 1: rename `type` → `tagType`, collect `label` for id generation
  for (const prop of props) {
    if (prop.type !== 'ObjectProperty' && prop.type !== 'Property') continue;

    const keyName =
      prop.key.type === 'Identifier'
        ? prop.key.name
        : prop.key.type === 'StringLiteral'
          ? prop.key.value
          : null;

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

  // Pass 2: inject `id` when missing
  if (!hasId) {
    let idStr;
    if (labelValue !== undefined && labelValue !== '') {
      idStr = slugify(labelValue);
    } else {
      idStr = `tag-${index}`;
    }
    const idProp = j.objectProperty(j.identifier('id'), j.stringLiteral(idStr));
    // Insert id as the first property for visibility
    props.unshift(idProp);
  }
}

/**
 * Walk an expression (possibly ArrayExpression, possibly a reference) and
 * transform every ObjectExpression that looks like a tag item.
 * Only handles statically-inlined arrays; dynamic references are left as-is
 * with a TODO comment.
 *
 * @returns {boolean} true when the array was handled inline
 */
function transformItemsArray(j, valueNode) {
  // Unwrap JSXExpressionContainer
  const expr =
    valueNode && valueNode.type === 'JSXExpressionContainer'
      ? valueNode.expression
      : valueNode;

  if (!expr || expr.type !== 'ArrayExpression') {
    return false; // dynamic — caller adds a TODO
  }

  expr.elements.forEach((el, idx) => {
    if (el && el.type === 'ObjectExpression') {
      transformItemObject(j, el, idx);
    }
  });
  return true;
}

// ─── main transform ───────────────────────────────────────────────────────────

function transform(fileInfo, api, options) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const printOptions = options.printOptions || defaultOptions;

  // ── 1. Collect local names imported as TagSet ──────────────────────────────
  // Supports both '@carbon/ibm-products' and '@carbon/react'
  const tagSetLocalNames = new Map(); // localName → { path, sourceValue }

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

  // ── 2. Transform JSX elements ──────────────────────────────────────────────
  tagSetLocalNames.forEach((_, localName) => {
    // When the consumer wrote `TagSet as MyAlias`, localName is `MyAlias`.
    // After the import is rewritten to `TagOverflow as MyAlias` the JSX
    // identifier stays as `MyAlias`, so we only rename when there is NO alias
    // (i.e. localName === 'TagSet').
    const jsxTargetName = localName === 'TagSet' ? 'TagOverflow' : localName;

    // Find every <TagSet …> / <MyAlias …> (opening + closing)
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: localName } },
      })
      .forEach((elPath) => {
        changed = true;
        const opening = elPath.node.openingElement;
        const closing = elPath.node.closingElement;

        // Rename element (no-op when an alias is in use)
        opening.name = j.jsxIdentifier(jsxTargetName);
        if (closing) {
          closing.name = j.jsxIdentifier(jsxTargetName);
        }

        // Process attributes
        const newAttrs = [];
        for (const attr of opening.attributes) {
          // Keep spread attributes unchanged
          if (attr.type !== 'JSXAttribute') {
            newAttrs.push(attr);
            continue;
          }

          const propName = attr.name.name;

          // ── onOverflowClick: remove and insert a TODO comment ──────────────
          if (REMOVED_PROPS.has(propName)) {
            // We attach a leading comment on the next sibling attribute, or on
            // the element itself if this is the last attribute.
            // Simplest approach: replace with a comment-only placeholder that
            // jscodeshift will render, then filter it out.
            // Instead, we annotate the JSX element node with a leading comment.
            const todo = j.line(
              ' TODO: TagSet → TagOverflow migration: onOverflowClick has no' +
                ' direct equivalent in TagOverflow. Handle overflow manually or remove this prop.'
            );
            todo.leading = true;
            todo.trailing = false;
            elPath.node.comments = elPath.node.comments || [];
            elPath.node.comments.push(todo);
            // Do not push attr — it is removed
            continue;
          }

          // ── Deprecated props: keep but annotate ───────────────────────────
          if (DEPRECATED_PROPS.has(propName)) {
            const deprecatedComment = j.line(
              ` @deprecated ${propName} — safe to remove; see TagOverflow docs`
            );
            deprecatedComment.leading = true;
            deprecatedComment.trailing = false;
            attr.comments = attr.comments || [];
            attr.comments.push(deprecatedComment);
            newAttrs.push(attr);
            continue;
          }

          // ── tags → items ──────────────────────────────────────────────────
          if (propName === 'tags') {
            const newAttrName = j.jsxIdentifier('items');
            attr.name = newAttrName;

            // Transform item objects inside the array (when static)
            const handled = transformItemsArray(j, attr.value);
            if (!handled) {
              // Dynamic reference — add a TODO comment on the element
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

          // ── overflowAutoAlign → autoAlign ─────────────────────────────────
          if (PROP_RENAMES[propName]) {
            attr.name = j.jsxIdentifier(PROP_RENAMES[propName]);
            newAttrs.push(attr);
            continue;
          }

          // All other props pass through unchanged
          newAttrs.push(attr);
        }

        opening.attributes = newAttrs;
      });
  });

  if (!changed) {
    return null;
  }

  // ── 3. Rewrite import specifiers ──────────────────────────────────────────
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
