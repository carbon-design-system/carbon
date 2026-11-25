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
 *
 * JSX element name:
 *   <TagSet …> → <TagOverflow …>
 *
 * Prop renames:
 *   tags={…}              → items={…}
 *   overflowAutoAlign={…} → autoAlign={…}
 *
 * Per-item field renames (inside the items/tags array literal):
 *   type → tagType  (shorthand `{ type }` becomes `{ tagType: type }`; computed
 *   keys cannot be renamed safely and get a TODO instead)
 *   Inject a stable `id` field when one is absent (slug from label, fallback
 *   to array index).
 *
 * Removed props (each leaves a TODO describing the behaviour that is lost):
 *   onOverflowClick, containingElementRef, measurementOffset, multiline
 *   TagOverflow does not destructure these, so they would fall into `...rest`
 *   and be spread onto the root <div>.
 *
 * Props whose type changed (kept, with a TODO):
 *   onOverflowTagChange (ReactNode[] → { hiddenItems, minWidth, maxWidth }),
 *   allTagsModalTarget (ReactNode → HTMLElement)
 *
 * Spread props:
 *   `<TagSet {...props} />` cannot be analysed statically, so a TODO is added
 *   asking for the spread object to be migrated manually.
 *
 * Missing default labels:
 *   TagSet defaults allTagsModalTitle, allTagsModalSearchLabel,
 *   allTagsModalSearchPlaceholderText and showAllTagsLabel; TagOverflow does
 *   not. A TODO is added when any of them is absent (English strings are not
 *   injected so that no untranslated text is hard-coded).
 *
 * Imports:
 *   When TagOverflow is already imported from '@carbon/ibm-products', the TagSet
 *   specifier is removed rather than renamed. When a different `TagOverflow`
 *   binding (from another package) exists, the migrated import is aliased as
 *   `IbmProductsTagOverflow` to avoid a name clash. When TagSet is still referenced outside JSX
 *   (`typeof TagSet`, `React.createElement(TagSet)`, …) the TagSet specifier is
 *   kept, TagOverflow is added, and a TODO is left on the import.
 */

'use strict';

const IMPORT_SOURCE = '@carbon/ibm-products';

const defaultOptions = {
  quote: 'single',
  trailingComma: true,
};

// Props that are simply renamed on the element
const PROP_RENAMES = {
  tags: 'items',
  overflowAutoAlign: 'autoAlign',
};

// Props that have been removed; the value is the TODO describing what is lost
const REMOVED_PROPS = {
  onOverflowClick:
    'onOverflowClick was removed. TagOverflow has no equivalent and always' +
    ' opens its own "all tags" modal, so reimplement any custom overflow' +
    ' handling manually.',
  containingElementRef:
    'containingElementRef was removed. TagOverflow forwards its ref to the' +
    ' root element; use that ref if you need access to the container.',
  measurementOffset:
    'measurementOffset was removed. TagOverflow now calculates the offset' +
    ' automatically.',
  multiline:
    'multiline was removed. TagOverflow only hides overflowing items, so the' +
    ' multiline layout is no longer available.',
};

// Props that are kept, but whose type changed; the value is the TODO
const CHANGED_PROPS = {
  onOverflowTagChange:
    'onOverflowTagChange was called by TagSet with the overflow tag elements' +
    ' (ReactNode[]). TagOverflow calls it with `{ hiddenItems, minWidth,' +
    ' maxWidth }`, so update the handler.',
  allTagsModalTarget:
    'allTagsModalTarget was a ReactNode in TagSet. TagOverflow expects an' +
    ' HTMLElement, so update the value.',
};

// TagSet provides default values for these; TagOverflow does not
const LABEL_PROPS = [
  'allTagsModalTitle',
  'allTagsModalSearchLabel',
  'allTagsModalSearchPlaceholderText',
  'showAllTagsLabel',
];

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
  if (prop.computed) return null;
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
      if (prop.shorthand) {
        // `{ type }` → `{ tagType: type }` so the variable stays referenced
        prop.shorthand = false;
        prop.value = j.identifier('type');
      }
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

  // Computed keys (`{ ['type']: … }`) cannot be renamed reliably
  const hasComputedKey = (el) => el.properties.some((prop) => prop.computed);

  return expr.elements.every((el) => isObject(el) && !hasComputedKey(el));
}

/**
 * Attach a `TODO: TagSet → TagOverflow migration` comment to an element path.
 * A `//` comment placed before a JSX child would render as text, so inside JSX
 * children a block comment in an expression container is inserted instead.
 */
function addTodo(j, path, text) {
  const message = ` TODO: TagSet → TagOverflow migration: ${text}`;
  const parent = path.parent.node;
  const isJsxChild =
    (parent.type === 'JSXElement' || parent.type === 'JSXFragment') &&
    Array.isArray(parent.children) &&
    parent.children.includes(path.node);

  if (isJsxChild) {
    const empty = j.jsxEmptyExpression();
    const block = j.commentBlock(`${message} `, false, true);
    empty.comments = [block];
    const container = j.jsxExpressionContainer(empty);
    parent.children.splice(parent.children.indexOf(path.node), 0, container);
    return;
  }

  const comment = j.line(message);
  comment.leading = true;
  comment.trailing = false;
  path.node.comments = path.node.comments || [];
  path.node.comments.push(comment);
}

/**
 * True when an Identifier path is a real reference to a binding (as opposed to
 * a property name, an object key, or part of an import specifier).
 */
function isReference(path) {
  const parent = path.parent.node;
  const node = path.node;
  switch (parent.type) {
    case 'ImportSpecifier':
    case 'ImportDefaultSpecifier':
    case 'ImportNamespaceSpecifier':
      return false;
    case 'MemberExpression':
    case 'OptionalMemberExpression':
      return parent.object === node || parent.computed;
    case 'ObjectProperty':
    case 'Property':
    case 'ClassProperty':
    case 'TSPropertySignature':
      return parent.value === node || parent.computed;
    default:
      return true;
  }
}

function transform(fileInfo, api, options) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const printOptions = options.printOptions || defaultOptions;

  const tagSetLocalNames = new Map(); // localName → { importPath }

  root
    .find(j.ImportDeclaration, { source: { value: IMPORT_SOURCE } })
    .forEach((importPath) => {
      importPath.node.specifiers.forEach((spec) => {
        if (spec.type !== 'ImportSpecifier') return;
        if (spec.imported.name === 'TagSet') {
          const localName = spec.local ? spec.local.name : 'TagSet';
          tagSetLocalNames.set(localName, { importPath });
        }
      });
    });

  if (tagSetLocalNames.size === 0) {
    return null; // nothing to transform
  }

  let changed = false;

  // A TagOverflow binding that is already imported must not be duplicated.
  // A `TagOverflow` binding from another package must not be shadowed.
  let hasTagOverflowImport = false;
  let hasConflictingTagOverflow = false;
  root.find(j.ImportDeclaration).forEach((p) => {
    (p.node.specifiers || []).forEach((spec) => {
      if (!spec.local || spec.local.name !== 'TagOverflow') return;
      if (
        p.node.source.value === IMPORT_SOURCE &&
        spec.type === 'ImportSpecifier' &&
        spec.imported.name === 'TagOverflow'
      ) {
        hasTagOverflowImport = true;
      } else {
        hasConflictingTagOverflow = true;
      }
    });
  });
  const tagOverflowName = hasConflictingTagOverflow
    ? 'IbmProductsTagOverflow'
    : 'TagOverflow';

  // Local names that are still referenced somewhere other than JSX / imports
  const otherRefs = new Set();
  tagSetLocalNames.forEach((_, localName) => {
    const count = root
      .find(j.Identifier, { name: localName })
      .filter((p) => p.node.type === 'Identifier' && isReference(p)).length;
    if (count > 0) otherRefs.add(localName);
  });

  tagSetLocalNames.forEach((_, localName) => {
    // Aliased imports (`TagSet as MyAlias`) keep their JSX identifier, unless
    // the alias must stay bound to TagSet for non-JSX references
    const jsxTargetName =
      localName === 'TagSet' || otherRefs.has(localName)
        ? tagOverflowName
        : localName;

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
        let hasSpread = false;
        for (const attr of opening.attributes) {
          if (attr.type !== 'JSXAttribute') {
            if (attr.type === 'JSXSpreadAttribute') hasSpread = true;
            newAttrs.push(attr);
            continue;
          }

          const propName = attr.name.name;

          if (Object.prototype.hasOwnProperty.call(REMOVED_PROPS, propName)) {
            // The attribute is dropped; the TODO goes on the element instead
            addTodo(j, elPath, REMOVED_PROPS[propName]);
            continue;
          }

          if (propName === 'tags') {
            attr.name = j.jsxIdentifier('items');

            const handled = transformItemsArray(j, attr.value);
            if (!handled) {
              addTodo(
                j,
                elPath,
                'rename `type` → `tagType` and add a unique `id` field to' +
                  ' each item object.'
              );
            }

            newAttrs.push(attr);
            continue;
          }

          if (Object.prototype.hasOwnProperty.call(CHANGED_PROPS, propName)) {
            addTodo(j, elPath, CHANGED_PROPS[propName]);
          }

          if (PROP_RENAMES[propName]) {
            attr.name = j.jsxIdentifier(PROP_RENAMES[propName]);
          }
          newAttrs.push(attr);
        }

        opening.attributes = newAttrs;

        const present = new Set(
          newAttrs
            .filter((a) => a.type === 'JSXAttribute')
            .map((a) => a.name.name)
        );
        const missingLabels = LABEL_PROPS.filter((name) => !present.has(name));
        if (hasSpread) {
          addTodo(
            j,
            elPath,
            'props are spread onto this element, so they could not be' +
              ' migrated. In the spread object rename `tags` → `items` and' +
              ' `overflowAutoAlign` → `autoAlign`, rename `type` → `tagType`' +
              ' and add an `id` in each item, remove onOverflowClick,' +
              ' containingElementRef, measurementOffset and multiline, update' +
              ' onOverflowTagChange and allTagsModalTarget, and provide' +
              ` ${LABEL_PROPS.join(', ')} (TagSet defaulted them; TagOverflow` +
              ' does not).'
          );
        } else if (missingLabels.length > 0) {
          addTodo(
            j,
            elPath,
            `TagSet defaulted ${missingLabels.join(', ')}; TagOverflow has no` +
              ' defaults. Provide translated values to keep the "view all"' +
              ' link, modal title and search field labelled.'
          );
        }
      });
  });

  if (!changed) {
    return null;
  }

  tagSetLocalNames.forEach(({ importPath }, localName) => {
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
        : hasConflictingTagOverflow
          ? tagOverflowName
          : null;

    if (otherRefs.has(localName)) {
      // Keep TagSet bound for the remaining references, add TagOverflow
      addTodo(
        j,
        importPath,
        `${localName} is still referenced outside JSX. Migrate those` +
          ' references to TagOverflow, then remove the TagSet import.'
      );
      if (!hasTagOverflowImport) {
        specifiers.splice(
          idx + 1,
          0,
          hasConflictingTagOverflow
            ? j.importSpecifier(
                j.identifier('TagOverflow'),
                j.identifier(tagOverflowName)
              )
            : j.importSpecifier(j.identifier('TagOverflow'))
        );
      }
      return;
    }

    if (!alias && hasTagOverflowImport) {
      // TagOverflow is already imported; renaming would duplicate the binding
      specifiers.splice(idx, 1);
      if (specifiers.length === 0) {
        j(importPath).remove();
      }
      return;
    }

    specifiers[idx] = alias
      ? j.importSpecifier(j.identifier('TagOverflow'), j.identifier(alias))
      : j.importSpecifier(j.identifier('TagOverflow'));
  });

  return root.toSource(printOptions);
}

module.exports = transform;
module.exports.parser = 'tsx';
