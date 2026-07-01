/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { reporter } = require('@carbon/cli-reporter');
const path = require('path');
const buildDTCGJsThemeFile = require('./builders/dtcg-js-themes');
const buildDTCGJsComponentTokensFile = require('./builders/dtcg-js-component-tokens');
const generateDTCGColorAliases = require('./builders/generate-dtcg-color-aliases');

const JS_DIR = path.resolve(__dirname, '../js');
const GENERATED_JS_THEMES_DIR = path.join(JS_DIR, 'generated', 'themes');
const GENERATED_JS_COMPONENT_TOKENS_DIR = path.join(
  JS_DIR,
  'generated',
  'component-tokens'
);

// 1. Generate color-palette.json from @carbon/colors.
reporter.info('Generating DTCG color palette aliases from @carbon/colors...');
const paletteFile = generateDTCGColorAliases();
reporter.success(`Written: ${paletteFile}`);

reporter.info('Generating JS theme files from DTCG JSON...');
for (const themeName of ['white', 'g10', 'g90', 'g100']) {
  buildDTCGJsThemeFile(themeName, GENERATED_JS_THEMES_DIR);
}

reporter.info('Generating JS component token files from DTCG JSON...');
for (const componentName of [
  'button',
  'tag',
  'notification',
  'status',
  'content-switcher',
]) {
  buildDTCGJsComponentTokensFile(
    componentName,
    GENERATED_JS_COMPONENT_TOKENS_DIR
  );
}

reporter.success('JS token files generated successfully! 🎉');
