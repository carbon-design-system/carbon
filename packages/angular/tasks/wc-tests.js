#!/usr/bin/env node
/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import {
  ENTRIES_ROOT,
  PREFIX,
  VENDOR,
  vendorPrefixedCopy,
  walk,
  WC_ROOT,
} from './vendor.js';

/**
 * Copies the `@carbon/web-components` test suites into `.entries/.wc-tests/`,
 * rewritten to test the vendored `cds-ng` copy that `@carbon/angular` ships.
 * The web components tests are the source of truth for component behavior;
 * `@carbon/angular` does not port them (ADR 0019). `yarn test:wc` runs the
 * result with the web components' own test runner settings.
 *
 * The rewrite matches what `create-prefixed-build` does to the components:
 * imports of `@carbon/web-components/es/` point at the vendored copy and the
 * `cds` prefix becomes `cds-ng`. `--cds` design tokens and identifiers that
 * merely contain `cds` (e.g. `cdsSearch`) are left alone.
 */

const WC_SRC = join(WC_ROOT, 'src');
const REPO_ROOT = join(WC_ROOT, '../..');
// A dot folder, so build-entries and the specs do not take it for an entry point.
export const WC_TESTS = join(ENTRIES_ROOT, '.wc-tests');

/**
 * Test files and folders not run against the vendored copy, with the reason.
 * Paths are relative to `packages/web-components/src`.
 */
const EXCLUDED = [
  [
    'components/date-picker/__tests__/',
    'the classic Date Picker is not vendored (ADR 0021)',
  ],
  [
    'components/fluid-date-picker/',
    'the fluid Date Picker is not vendored (ADR 0021)',
  ],
  [
    'globals/mixins/__tests__/form-associated-test.js',
    'imports the fluid Date Picker (ADR 0021)',
  ],
  [
    'components/side-panel/__tests__/side-panel-test.js',
    'imports a story asset that is not vendored',
  ],
  // TODO: remove these three once the web components stop comparing
  // `tagName` with uppercase `'CDS-…'` literals, which `create-prefixed-build`
  // does not rewrite, so they never match a prefixed element.
  [
    'components/combo-button/__tests__/combo-button-test.js',
    'uppercase CDS- tag literals in the web components',
  ],
  [
    'components/menu/__tests__/menu-item-test.js',
    'uppercase CDS- tag literals in the web components',
  ],
  [
    'components/feature-flags/__tests__/feature-flags-test.js',
    'uppercase CDS- tag literals in the web components',
  ],
];

/** Served path of the vendored copy; the test runner's root is the repo. */
const VENDOR_URL = `/${relative(REPO_ROOT, VENDOR)}/`;

function rewrite(source) {
  return source
    .replaceAll('@carbon/web-components/es/', VENDOR_URL)
    .replace(/(?<![-A-Za-z0-9])cds(?![A-Za-z0-9])/g, PREFIX)
    .replace(/(?<![-A-Za-z0-9])CDS-/g, `${PREFIX.toUpperCase()}-`);
}

function main() {
  vendorPrefixedCopy();
  rmSync(WC_TESTS, { recursive: true, force: true });

  let copied = 0;
  const skipped = new Map();
  for (const file of walk(WC_SRC)) {
    const rel = relative(WC_SRC, file);
    if (!rel.split('/').includes('__tests__')) {
      continue;
    }
    const exclusion = EXCLUDED.find(([path]) => rel.startsWith(path));
    if (exclusion) {
      skipped.set(exclusion[0], exclusion[1]);
      continue;
    }
    const out = join(WC_TESTS, rel);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, rewrite(readFileSync(file, 'utf8')));
    copied++;
  }

  console.log(
    `Copied ${copied} web components test files to ${relative(process.cwd(), WC_TESTS)}`
  );
  for (const [path, reason] of skipped) {
    console.log(`  ⏭  Skipped ${path} (${reason})`);
  }
}

main();
