/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const path = require('path');
const generateOklchHexFallbacks = require('./builders/generate-oklch-hex-fallbacks');
const generateV12DtcgThemes = require('./builders/generate-v12-dtcg-themes');
const { runV12 } = require('../style-dictionary/sd.config');

async function buildV12() {
  generateV12DtcgThemes();
  await runV12();
  await fs.outputFile(
    path.resolve(__dirname, '../scss/generated/_v12-fallbacks.scss'),
    generateOklchHexFallbacks()
  );
}

buildV12().catch((error) => {
  console.error(error);
  process.exit(1);
});
