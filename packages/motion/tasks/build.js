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
  buildDTCGMotionSurfacesJS,
  buildDTCGMotionSurfacesSCSS,
} = require('./builders/dtcg-motion');

// ── Output directories ────────────────────────────────────────────────────────
const jsOutDir = path.resolve(__dirname, '../js/generated');
const scssOutDir = path.resolve(__dirname, '../scss/generated');
fs.mkdirSync(jsOutDir, { recursive: true });
fs.mkdirSync(scssOutDir, { recursive: true });

// ── JS: js/generated/tokens.{js,d.ts} ────────────────────────────────────────
const { js: tokensJS, dts: tokensDTS } = buildDTCGMotionJS();

const jsTokensPath = path.join(jsOutDir, 'tokens.js');
console.log('Generating js/generated/tokens.js from DTCG tokens...');
fs.writeFileSync(jsTokensPath, tokensJS, 'utf8');
console.log(`Written: ${jsTokensPath}`);

const dtsTokensPath = path.join(jsOutDir, 'tokens.d.ts');
console.log('Generating js/generated/tokens.d.ts from DTCG tokens...');
fs.writeFileSync(dtsTokensPath, tokensDTS, 'utf8');
console.log(`Written: ${dtsTokensPath}`);

// ── JS: js/generated/surfaces.{js,d.ts} ──────────────────────────────────────
const { js: surfacesJS, dts: surfacesDTS } = buildDTCGMotionSurfacesJS();

const jsSurfacesPath = path.join(jsOutDir, 'surfaces.js');
console.log('Generating js/generated/surfaces.js from DTCG surfaces...');
fs.writeFileSync(jsSurfacesPath, surfacesJS, 'utf8');
console.log(`Written: ${jsSurfacesPath}`);

const dtsSurfacesPath = path.join(jsOutDir, 'surfaces.d.ts');
console.log('Generating js/generated/surfaces.d.ts from DTCG surfaces...');
fs.writeFileSync(dtsSurfacesPath, surfacesDTS, 'utf8');
console.log(`Written: ${dtsSurfacesPath}`);

// ── Sass: scss/generated/_tokens.scss ────────────────────────────────────────
const scssTokensPath = path.join(scssOutDir, '_tokens.scss');
console.log('Generating scss/generated/_tokens.scss from DTCG tokens...');
fs.writeFileSync(scssTokensPath, buildDTCGMotionSCSS(), 'utf8');
console.log(`Written: ${scssTokensPath}`);

// ── Sass: scss/generated/_surfaces.scss ──────────────────────────────────────
const scssSurfacesPath = path.join(scssOutDir, '_surfaces.scss');
console.log('Generating scss/generated/_surfaces.scss from DTCG surfaces...');
fs.writeFileSync(scssSurfacesPath, buildDTCGMotionSurfacesSCSS(), 'utf8');
console.log(`Written: ${scssSurfacesPath}`);
