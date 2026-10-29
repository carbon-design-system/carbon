#!/usr/bin/env node
/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Parity guard for @carbon/angular.
 *
 * Checks two things for every component that has a parity spec:
 *
 * 1. TEST TITLE PARITY
 *    Every `it(` title in the WC source test file must appear in the Angular
 *    parity spec as either a real `it(` or an `it.todo(`. A title present as
 *    `it.todo` is considered covered — it records the gap intentionally.
 *
 * 2. STORY NAME PARITY
 *    Every `export const` name in the WC stories file must appear in the
 *    Angular stories file, either as a real story or as a `// TODO(parity):`
 *    comment. Angular-only stories (`tags: ['!dev', '!autodocs']`) are allowed
 *    extras and are not checked against the WC file.
 *
 * The WC source file for each parity spec is declared in a `Source :` comment
 * at the top of the spec file.
 *
 * Exit 0 = all clear. Exit 1 = gaps found (prints a report).
 */

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PKG_ROOT = join(__dirname, '..');
const REPO_ROOT = join(PKG_ROOT, '../..');
const STORIES_ROOT = join(PKG_ROOT, 'src/stories');
const WC_COMPONENTS = join(REPO_ROOT, 'packages/web-components/src/components');

// ─── helpers ──────────────────────────────────────────────────────────────────

/**
 * Extract all `it(` and `it.todo(` titles from a JS/TS source string.
 *
 * Handles:
 *   it('title', ...)
 *   it("title", ...)
 *   it(`title`, ...)
 *   it(`title with ${expr}`, ...)   — kept as-is with the ${expr} text
 *   it.todo('title')
 *   it.todo(`title`)
 *
 * Returns a Map<title, 'real' | 'todo'>.
 * When the same title appears as both real and todo, 'real' wins.
 */
function extractItTitles(source) {
  const titles = new Map();
  // Match: it( or it.todo(  followed by a string/template literal
  const pattern =
    /\bit(?:\.todo)?\s*\(\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"|`((?:[^`\\]|\\.)*)`)/g;
  let m;
  while ((m = pattern.exec(source)) !== null) {
    const raw = m[0];
    const title = (m[1] ?? m[2] ?? m[3]).replace(/\\n/g, '\n');
    const isTodo = raw.startsWith('it.todo');
    if (!titles.has(title) || titles.get(title) === 'todo') {
      titles.set(title, isTodo ? 'todo' : 'real');
    }
  }
  return titles;
}

/**
 * Extract all `export const <Name>` identifiers from a stories file.
 * Returns a Set<string>.
 */
function extractStoryNames(source) {
  const names = new Set();
  for (const m of source.matchAll(/^export\s+const\s+([A-Za-z0-9_]+)/gm)) {
    names.add(m[1]);
  }
  return names;
}

/**
 * Return the set of story names in an Angular stories file that are tagged
 * as Angular-only (`tags: ['!dev', '!autodocs']` within ~10 lines of the
 * export). These are excluded from gap reporting.
 */
function angularOnlyStories(source) {
  const angularOnly = new Set();
  // Find each export const, then scan the next 200 chars for the angular-only tag
  const exportRe = /^export\s+const\s+([A-Za-z0-9_]+)/gm;
  let m;
  while ((m = exportRe.exec(source)) !== null) {
    const name = m[1];
    const snippet = source.slice(m.index, m.index + 400);
    if (snippet.includes("'!dev'") || snippet.includes('"!dev"')) {
      angularOnly.add(name);
    }
  }
  return angularOnly;
}

// ─── discovery ────────────────────────────────────────────────────────────────

/** Find all *.parity.spec.ts files under STORIES_ROOT. */
function findParitySpecs() {
  const specs = [];
  for (const component of readdirSync(STORIES_ROOT, { withFileTypes: true })) {
    if (!component.isDirectory()) continue;
    const testsDir = join(STORIES_ROOT, component.name, '__tests__');
    if (!existsSync(testsDir)) continue;
    for (const f of readdirSync(testsDir)) {
      if (f.endsWith('.parity.spec.ts')) {
        specs.push(join(testsDir, f));
      }
    }
  }
  return specs;
}

/**
 * Read the `Source :` comment from a parity spec and return the absolute path
 * to the WC test file. Returns null if the comment is missing.
 */
function wcSourcePath(specPath) {
  const src = readFileSync(specPath, 'utf8');
  const m = src.match(/\*\s+Source\s*:\s*(packages\/web-components\/[^\s]+)/);
  if (!m) return null;
  return join(REPO_ROOT, m[1]);
}

/**
 * Given an Angular component folder name (e.g. "Button", "TextInput"), find
 * the WC stories file(s). Convention: the WC stories live at
 *   packages/web-components/src/components/<kebab>/[<kebab>.stories.ts]
 * We skip feature-flag story files.
 */
function wcStoriesPath(componentName) {
  // PascalCase -> kebab-case
  const kebab = componentName
    .replace(/([A-Z])/g, (_, c, i) => (i ? '-' : '') + c.toLowerCase())
    .replace(/^-/, '');
  const dir = join(WC_COMPONENTS, kebab);
  if (!existsSync(dir)) return null;
  const candidate = join(dir, `${kebab}.stories.ts`);
  return existsSync(candidate) ? candidate : null;
}

/**
 * Given an Angular component folder name, find its Angular stories file.
 */
function angularStoriesPath(componentName) {
  const p = join(
    STORIES_ROOT,
    componentName,
    '__stories__',
    `${componentName}.stories.ts`
  );
  return existsSync(p) ? p : null;
}

// ─── main ─────────────────────────────────────────────────────────────────────

const errors = [];

const specs = findParitySpecs();
if (specs.length === 0) {
  console.error('No *.parity.spec.ts files found under', STORIES_ROOT);
  process.exit(1);
}

for (const specPath of specs.sort()) {
  const relSpec = relative(REPO_ROOT, specPath);

  // ── 1. Test title parity ──────────────────────────────────────────────────
  const wcTestPath = wcSourcePath(specPath);
  if (!wcTestPath) {
    errors.push(`${relSpec}: missing "Source :" comment`);
  } else if (!existsSync(wcTestPath)) {
    errors.push(
      `${relSpec}: Source file not found: ${relative(REPO_ROOT, wcTestPath)}`
    );
  } else {
    const wcTitles = extractItTitles(readFileSync(wcTestPath, 'utf8'));
    const angTitles = extractItTitles(readFileSync(specPath, 'utf8'));

    for (const [title] of wcTitles) {
      if (!angTitles.has(title)) {
        errors.push(
          `${relSpec}: missing WC test title:\n    "${title}"\n    (from ${relative(REPO_ROOT, wcTestPath)})`
        );
      }
    }
  }

  // ── 2. Story name parity ──────────────────────────────────────────────────
  // Derive component name from the spec directory (e.g. Button, TextInput)
  const componentName = specPath
    .split('/')
    .reverse()
    .find((seg) => seg !== '__tests__' && !seg.endsWith('.ts'));

  const wcStories = wcStoriesPath(componentName);
  const angStories = angularStoriesPath(componentName);

  if (wcStories && angStories) {
    const wcNames = extractStoryNames(readFileSync(wcStories, 'utf8'));
    const angSrc = readFileSync(angStories, 'utf8');
    const angNames = extractStoryNames(angSrc);
    const angularOnly = angularOnlyStories(angSrc);

    for (const name of wcNames) {
      if (angNames.has(name)) continue;
      // Accept a TODO(parity) comment that mentions the story name
      if (angSrc.includes(`TODO(parity): ${name}`)) continue;
      // Skip if the WC story itself is angular-only (already filtered, but be safe)
      if (angularOnly.has(name)) continue;
      errors.push(
        `${relative(REPO_ROOT, angStories)}: missing WC story "${name}"\n    (from ${relative(REPO_ROOT, wcStories)}; add the story or a // TODO(parity): ${name} comment)`
      );
    }
  }
}

// ─── report ───────────────────────────────────────────────────────────────────

const checkedSpecs = specs.length;
console.log(`Checked ${checkedSpecs} parity spec(s).`);

if (errors.length === 0) {
  console.log('✓ All test titles and story names are at parity.');
  process.exit(0);
} else {
  console.error(`\n✗ ${errors.length} parity gap(s) found:\n`);
  for (const err of errors) {
    console.error(`  • ${err}\n`);
  }
  process.exit(1);
}
