/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const fs = require('fs');
const path = require('path');
const packageJson = require('../package.json');

const PACKAGE_ROOT = path.resolve(__dirname, '..');

function isPublished(file) {
  const relativePath = path.relative(PACKAGE_ROOT, file).split(path.sep);
  return packageJson.files.some((entry) => {
    const segments = entry.split('/');
    return segments.every((segment, i) => relativePath[i] === segment);
  });
}

function resolveDeclaration(fromFile, specifier) {
  const base = path.resolve(path.dirname(fromFile), specifier);
  const candidates = [
    base.replace(/\.js$/, '.d.ts'),
    `${base}.d.ts`,
    path.join(base, 'index.d.ts'),
  ];
  return candidates.find((candidate) => fs.existsSync(candidate));
}

function collectDeclarationFiles(entry, seen = new Set()) {
  if (seen.has(entry)) {
    return seen;
  }
  seen.add(entry);

  const source = fs.readFileSync(entry, 'utf8');
  const specifiers = source.matchAll(/from\s+['"](\.{1,2}\/[^'"]+)['"]/g);
  for (const [, specifier] of specifiers) {
    const resolved = resolveDeclaration(entry, specifier);
    if (!resolved) {
      throw new Error(
        `Unable to resolve \`${specifier}\` from ${path.relative(PACKAGE_ROOT, entry)}`
      );
    }
    collectDeclarationFiles(resolved, seen);
  }
  return seen;
}

describe('@carbon/colors package', () => {
  test('type declarations only reference published files', () => {
    const entry = path.join(PACKAGE_ROOT, packageJson.types);
    const declarationFiles = Array.from(collectDeclarationFiles(entry));
    const unpublished = declarationFiles
      .filter((file) => !isPublished(file))
      .map((file) => path.relative(PACKAGE_ROOT, file));

    expect(declarationFiles.length).toBeGreaterThan(1);
    expect(unpublished).toEqual([]);
  });
});
