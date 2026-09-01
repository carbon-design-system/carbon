/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * merge-theme-files.js
 *
 * One-time migration script. Reads white.json, g10.json, g90.json, g100.json
 * and produces themes.json where every leaf token carries its four per-theme values
 * (and optional per-theme alpha) under $extensions["carbon.themes"].
 *
 * Shape of each per-theme entry:
 *   - No alpha  → bare string   e.g. "white": "{gray.10}"
 *   - With alpha → object       e.g. "white": { "value": "{gray.50}", "alpha": 0.12 }
 *
 * This matches the pattern already used by component token files, extended to
 * fold the scalar `alphaModifier` into the per-theme object so there is a
 * single $extensions namespace ("carbon.themes") for all four theme values.
 *
 * Tokens that are identical across ALL four themes (both value and alpha) stay
 * as plain strings for readability. Tokens where at least one theme differs
 * use the object form only for themes that carry an alpha.
 *
 * Usage:
 *   node packages/themes/tasks/merge-theme-files.js
 */

const fs = require('fs-extra');
const path = require('path');

const DTCG_DIR = path.resolve(__dirname, '../src/dtcg');
const THEME_NAMES = ['white', 'g10', 'g90', 'g100'];

// ---------------------------------------------------------------------------
// Load all four source files
// ---------------------------------------------------------------------------
const themeData = Object.fromEntries(
  THEME_NAMES.map((name) => [
    name,
    JSON.parse(fs.readFileSync(path.join(DTCG_DIR, `${name}.json`), 'utf8')),
  ])
);

// ---------------------------------------------------------------------------
// Deep-merge: walk the white theme tree as the structure reference, pull the
// corresponding node from each of the other three themes at each leaf.
// ---------------------------------------------------------------------------

/**
 * Return all $ keys and all non-$ (group) keys from a node.
 */
function splitKeys(node) {
  const dollar = [];
  const group = [];
  for (const k of Object.keys(node)) {
    if (k.startsWith('$')) dollar.push(k);
    else group.push(k);
  }
  return { dollar, group };
}

/**
 * Recursively merge four parallel nodes (one per theme) into a single unified
 * node using the carbon.themes pattern.
 *
 * @param {Record<string,object>} nodes  { white: node, g10: node, ... }
 * @param {string[]}              keyPath  current path (for error messages)
 * @returns {object}  merged DTCG node
 */
function mergeNodes(nodes, keyPath = []) {
  const ref = nodes.white; // use white as structural reference

  if (!ref || typeof ref !== 'object') return ref;

  const { dollar: dollarKeys, group: groupKeys } = splitKeys(ref);

  const isLeaf = dollarKeys.includes('$value');
  const hasDualRole = isLeaf && groupKeys.length > 0;

  if (isLeaf && !hasDualRole) {
    // ── Pure leaf token ───────────────────────────────────────────────────────
    // Build carbon.themes map. Entry is a bare string if no alpha, object if alpha.
    const carbonThemes = {};
    for (const theme of THEME_NAMES) {
      const node = nodes[theme];
      const value = node?.$value;
      const alpha = node?.$extensions?.['org.carbon']?.alphaModifier;
      carbonThemes[theme] = alpha !== undefined ? { value, alpha } : value;
    }

    // Build the merged leaf, copying shared $ keys from white (type, description)
    const merged = {};
    if (ref.$type) merged.$type = ref.$type;
    if (ref.$description) merged.$description = ref.$description;
    merged.$extensions = { 'carbon.themes': carbonThemes };
    return merged;
  }

  // ── Group or dual-role node ───────────────────────────────────────────────
  const merged = {};

  // Preserve $ keys that are NOT $value/$extensions (i.e. $type, $description
  // on a dual-role node) from the white reference.
  for (const k of dollarKeys) {
    if (k === '$value' || k === '$extensions') continue;
    merged[k] = ref[k];
  }

  // If this is a dual-role node it also needs $value + carbon.themes.
  if (isLeaf) {
    const carbonThemes = {};
    for (const theme of THEME_NAMES) {
      const node = nodes[theme];
      const value = node?.$value;
      const alpha = node?.$extensions?.['org.carbon']?.alphaModifier;
      carbonThemes[theme] = alpha !== undefined ? { value, alpha } : value;
    }
    merged.$extensions = { 'carbon.themes': carbonThemes };
  }

  // Recurse into group children.
  for (const k of groupKeys) {
    const childNodes = {};
    for (const theme of THEME_NAMES) {
      childNodes[theme] = nodes[theme]?.[k];
    }
    merged[k] = mergeNodes(childNodes, [...keyPath, k]);
  }

  return merged;
}

// ---------------------------------------------------------------------------
// Build the top-level merged document
// ---------------------------------------------------------------------------
const white = themeData.white;
const merged = {
  $schema: 'https://tr.designtokens.org/format/',
  $description:
    'Carbon Design System theme tokens — all four themes (white, g10, g90, g100) ' +
    'in a single file. Each token carries per-theme values under ' +
    '$extensions["carbon.themes"]. A bare string entry means no alpha modifier; ' +
    'an object entry { value, alpha } carries an opacity modifier.',
};

// Top-level groups (skip $ keys)
for (const key of Object.keys(white)) {
  if (key.startsWith('$')) continue;
  const groupNodes = Object.fromEntries(
    THEME_NAMES.map((t) => [t, themeData[t][key]])
  );
  merged[key] = mergeNodes(groupNodes, [key]);
}

// ---------------------------------------------------------------------------
// Write output
// ---------------------------------------------------------------------------
const outPath = path.join(DTCG_DIR, 'themes.json');
fs.writeFileSync(outPath, JSON.stringify(merged, null, 2) + '\n', 'utf8');
console.log(`Written: ${outPath}`);
