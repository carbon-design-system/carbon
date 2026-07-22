/**
 * Copyright IBM Corp. 2018, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const {
  buildDTCGMotionJS,
  buildDTCGMotionSCSS,
} = require('./builders/dtcg-motion');

// JS: js/generated/tokens.{js,d.ts}  (gitignored, imported by src/index.ts)
const jsOutDir = path.resolve(__dirname, '../js/generated');
fs.mkdirSync(jsOutDir, { recursive: true });

const { js, dts } = buildDTCGMotionJS();

const jsOutPath = path.join(jsOutDir, 'tokens.js');
console.log('Generating js/generated/tokens.js from DTCG tokens...');
fs.writeFileSync(jsOutPath, js, 'utf8');
console.log(`Written: ${jsOutPath}`);

const dtsOutPath = path.join(jsOutDir, 'tokens.d.ts');
console.log('Generating js/generated/tokens.d.ts from DTCG tokens...');
fs.writeFileSync(dtsOutPath, dts, 'utf8');
console.log(`Written: ${dtsOutPath}`);

// Scss: scss/generated/_tokens.scss  (gitignored, @used by index.scss)
const scssOutPath = path.resolve(__dirname, '../scss/generated/_tokens.scss');
fs.mkdirSync(path.dirname(scssOutPath), { recursive: true });
console.log('Generating scss/generated/_tokens.scss from DTCG tokens...');
fs.writeFileSync(scssOutPath, buildDTCGMotionSCSS(), 'utf8');
console.log(`Written: ${scssOutPath}`);
