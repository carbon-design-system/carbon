#!/usr/bin/env node
/* eslint-disable no-console */
// Build a Sass token index by walking the @carbon/styles and @carbon/layout
// Sass source files in the monorepo and extracting every variable declaration.
//
// Run once before `node compare/capture.mjs`:
//   node compare/sass-index.mjs
//
// Output:
//   compare-data/sass-index.json   — value → Sass variable name map
//     {
//       "0.25rem":  "$border-radius-04",
//       "0.125rem": "$border-radius-02",
//       "#0f62fe":  "$interactive",
//       ...
//     }
//
// Used by capture.mjs to resolve plain CSS values (literals that the CDP
// approach can't trace) back to Sass variable names.
//
// How it works:
//   Walks all *.scss files under the Sass source directories in this monorepo
//   (packages/styles/scss and packages/layout/scss) and matches lines of the
//   form:
//     $variable-name: <value> [!default];
//   Plain, non-function values (hex colors, rem/em/px lengths, unitless
//   numbers) are indexed.  When multiple variables share the same value the
//   longer (more specific) name wins.
//
// No Storybook build required — the source files are already present.

import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const COMPARE_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(COMPARE_DIR, '../../..');
const DATA = path.resolve(COMPARE_DIR, './data');

// Sass source roots to walk (relative to repo root).
// Add more if other Carbon packages define tokens we care about.
const SASS_ROOTS = [
  'packages/styles/scss',
  'packages/layout/scss',
  // @carbon/themes tokens live here in the monorepo
  'packages/themes/scss',
];

// Also check node_modules for @carbon/layout and @carbon/themes in case
// they are not in the monorepo's packages/ (older checkouts, CI).
const NODE_MODULES_ROOTS = [
  'node_modules/@carbon/styles/scss',
  'node_modules/@carbon/layout/scss',
  'node_modules/@carbon/themes/scss',
];

// ---------------------------------------------------------------------------
// Helpers

const SASS_VAR_RE = /^\$([a-z][a-z0-9-]+)\s*:\s*(.+?)(?:\s*!default)?\s*;?\s*$/;

function normValue(v) {
  return (
    v
      .trim()
      // expand shorthand 3-digit hex to 6-digit
      .replace(
        /#([0-9a-f]{3})\b/gi,
        (_, h) =>
          '#' +
          h
            .split('')
            .map((c) => c + c)
            .join('')
      )
      .replace(/^['"]|['"]$/g, '')
      .toLowerCase()
  );
}

function isPlainValue(v) {
  return (
    /^#[0-9a-f]{3,8}$/.test(v) || // hex color
    /^[\d.]+r?em$/.test(v) || // rem / em length
    /^[\d.]+px$/.test(v) || // px length
    /^\d+(\.\d+)?$/.test(v) // unitless number
  );
}

// Priority order for token families — higher number wins when two variables
// share the same value.  Spacing and border-radius are the design-scale tokens
// most likely to appear as plain numbers in computed styles; component-local
// variables (font-size, line-height, etc.) are lower priority.
function tokenPriority(varName) {
  if (/^\$spacing-\d/.test(varName)) return 5;
  if (/^\$border-radius-/.test(varName)) return 4;
  if (/^\$layout-\d/.test(varName)) return 3;
  if (/^\$fluid-spacing-/.test(varName)) return 2;
  if (/^\$container-/.test(varName)) return 1;
  return 0;
}

async function* walkScss(dir) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* walkScss(full);
    else if (e.name.endsWith('.scss')) yield full;
  }
}

// ---------------------------------------------------------------------------
// Main

async function main() {
  // Determine which roots actually exist
  const roots = [
    ...SASS_ROOTS.map((r) => path.join(REPO_ROOT, r)),
    ...NODE_MODULES_ROOTS.map((r) => path.join(REPO_ROOT, r)),
  ].filter(existsSync);

  if (!roots.length) {
    console.error(
      '[sass-index] No Sass source roots found. Is this the Carbon monorepo?'
    );
    process.exit(1);
  }

  console.log('[sass-index] Scanning Sass source roots:');
  roots.forEach((r) => console.log(' ', path.relative(REPO_ROOT, r)));

  const index = {}; // value → "$variable-name"
  let files = 0,
    vars = 0;

  for (const root of roots) {
    for await (const file of walkScss(root)) {
      files++;
      const lines = (await fs.readFile(file, 'utf8')).split('\n');
      for (const line of lines) {
        const m = SASS_VAR_RE.exec(line.trim());
        if (!m) continue;
        const varName = '$' + m[1];
        const sassValue = normValue(m[2]);
        if (!isPlainValue(sassValue)) continue;
        vars++;
        const existing = index[sassValue];
        const pri = tokenPriority(varName);
        const existingPri = existing ? tokenPriority(existing) : -1;
        // Higher-priority family wins; within the same family, longer name wins
        if (
          !existing ||
          pri > existingPri ||
          (pri === existingPri && varName.length > existing.length)
        ) {
          index[sassValue] = varName;
        }
      }
    }
  }

  const count = Object.keys(index).length;
  await fs.mkdir(DATA, { recursive: true });
  await fs.writeFile(
    path.join(DATA, 'sass-index.json'),
    JSON.stringify(index, null, 1) + '\n'
  );

  console.log(
    `[sass-index] Scanned ${files} files, found ${vars} plain-value declarations`
  );
  console.log(
    `[sass-index] Wrote compare-data/sass-index.json with ${count} unique values`
  );
  console.log('[sass-index] Sample entries:');
  Object.entries(index)
    .slice(0, 12)
    .forEach(([v, t]) => console.log(`  ${v} → ${t}`));
}

main().catch((e) => {
  console.error('[sass-index]', e.message);
  process.exit(1);
});
