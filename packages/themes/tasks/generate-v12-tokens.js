/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const path = require('path');
const { generateTheme } = require('../src/theme-generator/generate-theme');
const { generateV12Tokens } = require('../src/theme-generator/generate-tokens');
const { validateTheme } = require('../src/theme-generator/validate-theme');

const TOKENS_DIR = path.resolve(__dirname, '../tokens/next/themes');

for (const [mode, tokens] of Object.entries(generateV12Tokens())) {
  const validation = validateTheme(generateTheme(mode));
  if (!validation.valid) {
    const issues = validation.issues
      .map(({ token, message }) => `${token}: ${message}`)
      .join('\n');
    throw new Error(`Invalid V12 ${mode} theme:\n${issues}`);
  }

  fs.outputFileSync(
    path.join(TOKENS_DIR, mode, 'theme.tokens.json'),
    JSON.stringify(tokens, null, 2) + '\n',
    'utf8'
  );
}
