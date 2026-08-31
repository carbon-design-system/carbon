/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 *
 * DTCG source files (g10.json, g90.json, g100.json) contain nodes that are
 * simultaneously token leaves (they have a `$value`) AND token groups (they
 * have non-`$`-prefixed children).  Style Dictionary v5 does not support this
 * pattern — when a node has `$value`, SD treats it as a leaf token and silently
 * drops any non-`$` children.
 *
 * Example (g10.json):
 *
 *   background: {
 *     $type:  "color",
 *     $value: "{gray.10}",            ← token leaf value
 *     active: { $type: "color", $value: "{gray.50}", ... },  ← child token
 *     brand:  { ... }
 *   }
 *
 * Without this preprocessor, SD emits `background` but loses `background-active`
 * and `background-brand`.  There are 27 such dual-role nodes in each of
 * g10 / g90 / g100, causing 48 tokens to go missing from the generated output.
 *
 * ── Solution ────────────────────────────────────────────────────────────────
 *
 * For any dual-role node (has `$value` AND non-`$` children), this preprocessor
 * splits the node:
 *
 *   1. The parent's token value (`$value`, `$type`, `$extensions`) is moved into
 *      a synthetic `_self` child at the same level.
 *   2. The parent node becomes a pure group (its `$value` is removed).
 *
 * After this transform, the tree becomes:
 *
 *   background: {
 *     _self:  { $type: "color", $value: "{gray.10}" },   ← parent value
 *     active: { $type: "color", $value: "{gray.50}", ... },
 *     brand:  { ... }
 *   }
 *
 * SD sees `background._self` as path `['background', '_self']` and
 * `background.active` as path `['background', 'active']`.
 *
 * A companion custom name transform (`carbon/name-kebab`, registered in
 * sd.config.js) strips `_self` from the path when building the token name:
 *
 *   ['background', '_self'] → 'background'       (parent token)
 *   ['background', 'active'] → 'background-active'
 *   ['layer', '_self'] → 'layer'
 *   ['layer', '01'] → 'layer-01'
 *
 * This reproduces the flat token names that the old dtcg-converter produced,
 * while preserving correct hierarchy for SD's alias resolution and path-based
 * name computation.
 *
 * ── Alias resolution ────────────────────────────────────────────────────────
 *
 * The color-palette.json file is loaded as `source:` (not pre-processed) by
 * sd.config.js, so its tokens stay in their original nested form and SD alias
 * resolution ({blue.60} etc.) continues to work.
 *
 * This preprocessor is called with only the theme JSON as input (passed as
 * `tokens:` in themeConfig()), never seeing the merged palette+theme tree.
 * Therefore palette tokens are unaffected.
 *
 * @param {object} dictionary  Raw DTCG token tree (theme file only)
 * @returns {object}           Normalised tree with dual-role nodes split
 */

/**
 * Process a single DTCG token node.
 *
 * The node may be:
 *   - A pure leaf token (has `$value`, no non-`$` children) → returned as-is.
 *   - A pure group (no `$value`, has non-`$` children) → children are recursed.
 *   - A dual-role node (has BOTH `$value` AND non-`$` children) → split: the
 *     `$value`/`$type`/`$extensions` are moved to a `_self` synthetic leaf, and
 *     the node becomes a pure group whose children include `_self` plus the
 *     original children (each recursively processed).
 *
 * @param {object} node  A single DTCG node object.
 * @returns {object}     The normalised node.
 */
function processNode(node) {
  if (!node || typeof node !== 'object') return node;

  const hasValue = '$value' in node;
  const nonDollarChildren = Object.keys(node).filter((k) => !k.startsWith('$'));
  const hasChildren = nonDollarChildren.length > 0;

  if (hasValue && hasChildren) {
    // ── Dual-role node ────────────────────────────────────────────────────────
    // Collect the DTCG metadata into a `_self` leaf.
    const selfLeaf = {};
    for (const [k, v] of Object.entries(node)) {
      if (k.startsWith('$')) selfLeaf[k] = v;
    }
    // Build the pure-group: _self first, then recursively-processed children.
    const group = { _self: selfLeaf };
    for (const childKey of nonDollarChildren) {
      group[childKey] = processNode(node[childKey]);
    }
    return group;
  } else if (hasChildren) {
    // ── Pure group ────────────────────────────────────────────────────────────
    const out = {};
    for (const [k, v] of Object.entries(node)) {
      if (k.startsWith('$')) {
        out[k] = v;
      } else {
        out[k] = processNode(v);
      }
    }
    return out;
  } else {
    // ── Pure leaf token ───────────────────────────────────────────────────────
    return node;
  }
}

/**
 * Top-level preprocessor function.
 *
 * The top-level dictionary itself is always a group (never a token), so we
 * iterate its entries and call processNode() on each non-`$` child.
 *
 * @param {object} dictionary  Raw DTCG token tree from the theme JSON file
 * @returns {object}           Normalised tree with all dual-role nodes split
 */
function carbonDualRolePreprocessor(dictionary) {
  if (!dictionary || typeof dictionary !== 'object') return dictionary;

  const out = {};
  for (const [key, value] of Object.entries(dictionary)) {
    if (key.startsWith('$')) {
      // Top-level DTCG metadata — preserve as-is.
      out[key] = value;
    } else if (value && typeof value === 'object') {
      out[key] = processNode(value);
    } else {
      out[key] = value;
    }
  }
  return out;
}

module.exports = {
  name: 'carbon/dual-role',
  preprocessor: carbonDualRolePreprocessor,
};
