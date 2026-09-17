/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { reporter } = require('@carbon/cli-reporter');
const generateDTCGColorAliases = require('./builders/generate-dtcg-color-aliases');
const generateV12DtcgThemes = require('./builders/generate-v12-dtcg-themes');
const { runJs, runV12 } = require('../style-dictionary/sd.config');

// Stage 1 — generate color-palette.json from @carbon/colors (unchanged).
reporter.info('Generating DTCG color palette aliases from @carbon/colors...');
const paletteFile = generateDTCGColorAliases();
reporter.success(`Written: ${paletteFile}`);

// Stage 2–4 — JS theme + component token files via Style Dictionary pipeline.
reporter.info('Generating JS token files via Style Dictionary...');
Promise.all([runJs(), Promise.resolve(generateV12DtcgThemes()).then(runV12)])
  .then(() => {
    reporter.success('JS token files generated successfully! 🎉');
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
