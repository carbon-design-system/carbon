#!/usr/bin/env node
/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Component scaffold generator for @carbon/angular.
 *
 * Usage:
 *   node tasks/generate/index.js <DisplayName>
 *
 * Example:
 *   node tasks/generate/index.js Button
 *
 * Generates the following files under src/components/<DisplayName>/:
 *   - <DisplayName>.component.ts
 *   - index.ts
 *   - __stories__/<DisplayName>.stories.ts
 *   - __tests__/<DisplayName>.spec.ts
 */

import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const DISPLAY_NAME = process.argv[2];

if (!DISPLAY_NAME) {
  console.error('Usage: node tasks/generate/index.js <DisplayName>');
  process.exit(1);
}

// Validate: PascalCase only, e.g. "Button", "TextInput"
if (!/^[A-Z][A-Za-z0-9]+$/.test(DISPLAY_NAME)) {
  console.error(
    'DisplayName must be PascalCase (e.g. Button, TextInput, ComboBox).'
  );
  process.exit(1);
}

/** Kebab-case version of the display name, e.g. "TextInput" → "text-input" */
const kebab = DISPLAY_NAME.replace(
  /([A-Z])/g,
  (m, p, offset) => (offset === 0 ? '' : '-') + m.toLowerCase()
).replace(/^-/, '');

const TEMPLATES_DIR = join(__dirname, 'templates');

function readTemplate(relPath) {
  return readFileSync(join(TEMPLATES_DIR, relPath), 'utf8')
    .replaceAll('DISPLAY_NAME', DISPLAY_NAME)
    .replaceAll('KEBAB_NAME', kebab);
}

const OUTPUT_ROOT = join(__dirname, '../../src/components', DISPLAY_NAME);

/** Write a file, creating parent directories as needed. */
function writeOut(relPath, content) {
  const abs = join(OUTPUT_ROOT, relPath);
  mkdirSync(dirname(abs), { recursive: true });
  if (existsSync(abs)) {
    console.warn(`  [skip] ${abs} already exists`);
    return;
  }
  writeFileSync(abs, content, 'utf8');
  console.log(`  [create] ${abs}`);
}

writeOut(
  `${DISPLAY_NAME}.component.ts`,
  readTemplate('components/DISPLAY_NAME.component.ts')
);
writeOut('index.ts', readTemplate('index.ts'));
writeOut(
  `__stories__/${DISPLAY_NAME}.stories.ts`,
  readTemplate('__stories__/DISPLAY_NAME.stories.ts')
);
writeOut(
  `__tests__/${DISPLAY_NAME}.spec.ts`,
  readTemplate('__tests__/DISPLAY_NAME.spec.ts')
);

console.log(`\nScaffolded ${DISPLAY_NAME} in src/components/${DISPLAY_NAME}/`);
