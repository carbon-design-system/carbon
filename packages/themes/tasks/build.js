/**
 * Copyright IBM Corp. 2015, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { reporter } = require('@carbon/cli-reporter');
const { generate } = require('@carbon/scss-generator');
const fs = require('fs-extra');
const path = require('path');
const buildCompatThemesFile = require('./builders/compat/themes');
const buildCompatTokensFile = require('./builders/compat/tokens');
const buildModulesThemesFile = require('./builders/modules-themes');
const buildModulesTokensFile = require('./builders/modules-tokens');
const buildModulesButtonTokens = require('./builders/modules-button-tokens');
const buildModulesTagTokens = require('./builders/modules-tag-tokens');
const buildModulesNotificationTokens = require('./builders/modules-notification-tokens');
const buildModulesStatusTokens = require('./builders/modules-status-tokens');
const buildModulesContentSwitcherTokens = require('./builders/modules-content-switcher-tokens');
const { buildAllDTCGTokens } = require('./builders/dtcg-tokens');
const { buildAllScssFromDTCG } = require('./builders/dtcg-to-scss');

async function build() {
  reporter.info('Building scss files for themes...');

  const SCSS_DIR = path.resolve(__dirname, '../scss');
  const GENERATED_SCSS_DIR = path.join(SCSS_DIR, 'generated');
  const files = [
    {
      filepath: path.join(SCSS_DIR, 'compat', 'generated', '_themes.scss'),
      builder() {
        return buildCompatThemesFile();
      },
    },
    {
      filepath: path.resolve(SCSS_DIR, 'compat', 'generated', '_tokens.scss'),
      builder() {
        return buildCompatTokensFile();
      },
    },
    {
      filepath: path.join(GENERATED_SCSS_DIR, '_themes.scss'),
      builder() {
        return buildModulesThemesFile();
      },
    },
    {
      filepath: path.join(GENERATED_SCSS_DIR, '_tokens.scss'),
      builder() {
        return buildModulesTokensFile();
      },
    },
    {
      filepath: path.join(GENERATED_SCSS_DIR, '_button-tokens.scss'),
      builder() {
        return buildModulesButtonTokens();
      },
    },
    {
      filepath: path.join(GENERATED_SCSS_DIR, '_tag-tokens.scss'),
      builder() {
        return buildModulesTagTokens();
      },
    },
    {
      filepath: path.join(GENERATED_SCSS_DIR, '_notification-tokens.scss'),
      builder() {
        return buildModulesNotificationTokens();
      },
    },
    {
      filepath: path.join(GENERATED_SCSS_DIR, '_status-tokens.scss'),
      builder() {
        return buildModulesStatusTokens();
      },
    },
    {
      filepath: path.join(GENERATED_SCSS_DIR, '_content-switcher-tokens.scss'),
      builder() {
        return buildModulesContentSwitcherTokens();
      },
    },
  ];

  for (const { filepath, builder } of files) {
    await fs.ensureFile(filepath);

    const { code } = generate(builder());
    await fs.writeFile(filepath, await code);
  }

  reporter.success('SCSS generation complete! 🎉');
}

async function buildDTCG() {
  reporter.info('Building DTCG token files...');

  const TOKENS_DIR = path.resolve(__dirname, '../tokens');
  await fs.ensureDir(TOKENS_DIR);

  // Check if lib directory exists (built by carbon-cli bundle)
  const LIB_DIR = path.resolve(__dirname, '../lib');
  const libExists = await fs.pathExists(LIB_DIR);

  if (!libExists) {
    reporter.info(
      'lib directory not found. DTCG tokens will be generated after main build completes.'
    );
    reporter.info('Run the full build command: yarn build');
    return;
  }

  const dtcgTokens = buildAllDTCGTokens();

  if (Object.keys(dtcgTokens).length === 0) {
    reporter.info(
      'No DTCG tokens generated. Make sure the lib directory contains built theme files.'
    );
    return;
  }

  for (const [themeName, tokens] of Object.entries(dtcgTokens)) {
    const filepath = path.join(TOKENS_DIR, `${themeName}.json`);
    await fs.writeFile(filepath, JSON.stringify(tokens, null, 2));
    reporter.success(`Generated DTCG tokens for ${themeName} theme`);
  }

  reporter.success('DTCG token generation complete! 🎉');

  // Generate SCSS from DTCG tokens
  reporter.info('Generating SCSS from DTCG tokens...');
  const DTCG_SCSS_DIR = path.join(TOKENS_DIR, 'scss');
  await fs.ensureDir(DTCG_SCSS_DIR);

  const scssFromDTCG = buildAllScssFromDTCG(TOKENS_DIR);

  for (const [themeName, scssAst] of Object.entries(scssFromDTCG)) {
    const filepath = path.join(DTCG_SCSS_DIR, `_${themeName}.scss`);
    const { code } = generate(scssAst);
    await fs.writeFile(filepath, await code);
    reporter.success(`Generated SCSS from DTCG for ${themeName} theme`);
  }

  // Create an index file that imports all themes
  const indexContent = `//
// Copyright IBM Corp. 2018, 2025
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

// DTCG-generated SCSS tokens
// These files are generated from DTCG JSON tokens

@forward 'white';
@forward 'g10';
@forward 'g90';
@forward 'g100';
`;

  await fs.writeFile(path.join(DTCG_SCSS_DIR, '_index.scss'), indexContent);
  reporter.success('Generated DTCG SCSS index file');
}

// Run both build processes
async function runBuild() {
  await build();
  await buildDTCG();
}

runBuild().catch((error) => {
  console.error(error);
  process.exit(1);
});
