/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const path = require('path');
const { generateV12DtcgThemes } = require('../../src/oklch/generate-dtcg');
const { generateTheme } = require('../../src/oklch/generate-theme');
const { validateTheme } = require('../../src/oklch/validate-theme');

const MODES = ['light', 'dark'];

function generateV12DtcgThemesTask() {
  const outputDirectory = path.resolve(__dirname, '../../src/dtcg/v12');
  fs.ensureDirSync(outputDirectory);

  // Validate both modes before writing anything.
  for (const mode of MODES) {
    const validation = validateTheme(generateTheme(mode));
    if (!validation.valid) {
      const issues = validation.issues
        .map(({ token, message }) => `${token}: ${message}`)
        .join('\n');
      throw new Error(`Invalid V12 ${mode} theme:\n${issues}`);
    }
  }

  const outputPath = path.join(outputDirectory, 'themes.json');
  fs.writeFileSync(
    outputPath,
    JSON.stringify(generateV12DtcgThemes(), null, 2) + '\n',
    'utf8'
  );
  return [outputPath];
}

module.exports = generateV12DtcgThemesTask;
