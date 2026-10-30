/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { spawnSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const PKG_ROOT = join(__dirname, '..');
export const WC_ROOT = join(PKG_ROOT, '../web-components');
export const WC_ES = join(WC_ROOT, 'es');
export const ENTRIES_ROOT = join(PKG_ROOT, '.entries');
export const VENDOR = join(ENTRIES_ROOT, 'vendor');
const PREFIXED_TMP = join(ENTRIES_ROOT, '.prefixed');
/** Records the newest file time in `WC_ES` that the vendor tree was built from. */
const STAMP = join(VENDOR, '.source-stamp');

export const PREFIX = 'cds-ng';

/**
 * Directory names never shipped in the vendored copy.
 * - `node_modules`: only holds flatpickr, which only the classic Date Picker
 *   needs (ADR 0021).
 * - stories, tests and story assets: `stories/helpers.js` imports
 *   `storybook/actions` (ADR 0020 constraint 2).
 */
export const VENDOR_EXCLUDED_DIRS = new Set([
  'node_modules',
  'stories',
  '__stories__',
  '__tests__',
  '_story-assets',
]);

/**
 * Files inside an excluded directory that non-story code imports at runtime.
 * `page-header/utils.js` imports its overflow handler from `_story-assets`.
 * Paths are relative to the vendor root.
 */
export const VENDOR_KEPT_FILES = new Set([
  'components/page-header/_story-assets/overflowHandler.js',
]);

/**
 * Files at the vendor root that are not shipped. `index.js` is the
 * whole-library barrel: it registers every component, including the Date
 * Pickers ADR 0021 drops, and defeats the per-folder entry points.
 */
export const VENDOR_EXCLUDED_ROOT_FILES = new Set(['index.js']);

/** Bare imports that are satisfied without being declared in `dependencies`. */
export const TRANSITIVE_BARE_IMPORTS = new Set();

/** Recursively list files under a directory. */
export function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(path));
    else files.push(path);
  }
  return files;
}

/**
 * Builds `.entries/vendor`: a `cds-ng` prefixed copy of `web-components/es`
 * without anything the wrappers cannot use.
 */
export function vendorPrefixedCopy() {
  if (!existsSync(join(WC_ES, 'components'))) {
    console.error(
      `Error: ${WC_ES} not found. Build @carbon/web-components first.`
    );
    process.exit(1);
  }

  // Reuse the vendor tree while it matches the web components build. Both
  // generate-wrappers and build-entries call this function, and rebuilding
  // `web-components/es` must not leave a stale copy behind.
  const stamp = String(
    Math.max(...walk(WC_ES).map((file) => statSync(file).mtimeMs))
  );
  if (existsSync(STAMP) && readFileSync(STAMP, 'utf8') === stamp) {
    return;
  }

  mkdirSync(ENTRIES_ROOT, { recursive: true });

  const result = spawnSync(
    process.execPath,
    [
      join(WC_ROOT, 'bin/create-prefixed-build.js'),
      '--prefix',
      PREFIX,
      '--src',
      WC_ES,
      '--out',
      PREFIXED_TMP,
    ],
    { stdio: 'pipe', encoding: 'utf8' }
  );
  if (result.status !== 0) {
    console.error(result.stderr || result.stdout);
    process.exit(1);
  }

  rmSync(VENDOR, { recursive: true, force: true });
  mkdirSync(VENDOR, { recursive: true });

  cpSync(PREFIXED_TMP, VENDOR, {
    recursive: true,
    filter: (source) => {
      const rel = relative(PREFIXED_TMP, source);
      if (!rel) return true;
      if (VENDOR_KEPT_FILES.has(rel)) return true;
      // Keep the directories that lead to a kept file.
      if ([...VENDOR_KEPT_FILES].some((kept) => kept.startsWith(`${rel}/`))) {
        return true;
      }
      if (VENDOR_EXCLUDED_ROOT_FILES.has(rel)) return false;
      const segments = rel.split('/');
      if (segments.some((s) => VENDOR_EXCLUDED_DIRS.has(s))) return false;
      // fluid-date-picker is entirely excluded (ADR 0021).
      if (segments[0] === 'components' && segments[1] === 'fluid-date-picker') {
        return false;
      }
      // date-picker keeps only the folder itself, `next/`, and `defs.js`.
      if (segments[0] === 'components' && segments[1] === 'date-picker') {
        if (segments.length === 2) return true;
        if (segments[2] !== 'next' && segments[2] !== 'defs.js') {
          return false;
        }
      }
      if (statSync(source).isDirectory()) return true;
      // Types and maps are not used: wrappers import the vendor tree for its
      // side effects only (ADR 0020 constraint 2 and "Not checked").
      return source.endsWith('.js') && !source.endsWith('.map');
    },
  });
  rmSync(PREFIXED_TMP, { recursive: true, force: true });
  writeFileSync(STAMP, stamp);
}

/**
 * Fails the build if the vendored copy has an import that will not resolve
 * once installed: a missing relative file, or a bare package that
 * `@carbon/angular` does not declare (ADR 0020 constraint 2).
 */
export function verifyVendorImports(declaredDependencies) {
  const importPattern =
    /(?:^|\n)\s*(?:import(?:\s+[\s\S]*?\s+from|\s+)|\s*export\s+[\s\S]*?\s+from\s+)["']([^"']+)["']/g;
  const problems = [];
  const files = walk(VENDOR).filter((f) => f.endsWith('.js'));

  for (const file of files) {
    // Ignore imports shown in comments (e.g. JSDoc usage examples).
    const source = readFileSync(file, 'utf8')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/^\s*\/\/.*$/gm, '');
    for (const [, specifier] of source.matchAll(importPattern)) {
      if (specifier.startsWith('.')) {
        if (!existsSync(resolve(dirname(file), specifier))) {
          problems.push(`${relative(VENDOR, file)}: missing ${specifier}`);
        }
        continue;
      }
      const parts = specifier.split('/');
      const packageName = specifier.startsWith('@')
        ? parts.slice(0, 2).join('/')
        : parts[0];
      if (
        !declaredDependencies.has(packageName) &&
        !TRANSITIVE_BARE_IMPORTS.has(packageName)
      ) {
        problems.push(
          `${relative(VENDOR, file)}: undeclared package ${packageName}`
        );
      }
    }
  }

  if (problems.length) {
    console.error(
      `Vendored copy has unresolved imports:\n  ${problems.join('\n  ')}`
    );
    process.exit(1);
  }
  return files.length;
}
