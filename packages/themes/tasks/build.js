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
const buildDTCGThemesFile = require('./builders/dtcg-themes');
const buildDTCGComponentTokensFile = require('./builders/dtcg-component-tokens');
const buildDTCGTokens = require('./builders/dtcg-tokens');
const generateDTCGColorAliases = require('./builders/generate-dtcg-color-aliases');
const migrateToColorAliases = require('./builders/migrate-to-color-aliases');

async function build() {
  reporter.info('Building scss files for themes...');

  // 1. Generate color-palette.json from @carbon/colors.
  reporter.info('Generating DTCG color palette aliases from @carbon/colors...');
  const paletteFile = generateDTCGColorAliases();
  reporter.success(`Written: ${paletteFile}`);

  // 2. Rewrite theme + component JSON files to use palette aliases.
  reporter.info('Migrating theme and component tokens to color aliases...');
  const migrated = migrateToColorAliases();
  migrated.forEach((f) =>
    reporter.success(`Migrated: ${path.relative(process.cwd(), f)}`)
  );

  const SCSS_DIR = path.resolve(__dirname, '../scss');
  const GENERATED_DTCG_DIR = path.join(SCSS_DIR, 'generated');

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
    // DTCG-based generation
    {
      filepath: path.join(GENERATED_DTCG_DIR, '_themes.scss'),
      builder() {
        return buildDTCGThemesFile();
      },
    },
    {
      filepath: path.join(GENERATED_DTCG_DIR, '_tokens.scss'),
      builder() {
        return buildDTCGTokens();
      },
    },
    {
      filepath: path.join(GENERATED_DTCG_DIR, '_button-tokens.scss'),
      builder() {
        return buildDTCGComponentTokensFile('button');
      },
    },
    {
      filepath: path.join(GENERATED_DTCG_DIR, '_tag-tokens.scss'),
      builder() {
        return buildDTCGComponentTokensFile('tag');
      },
    },
    {
      filepath: path.join(GENERATED_DTCG_DIR, '_notification-tokens.scss'),
      builder() {
        return buildDTCGComponentTokensFile('notification');
      },
    },
    {
      filepath: path.join(GENERATED_DTCG_DIR, '_status-tokens.scss'),
      builder() {
        return buildDTCGComponentTokensFile('status');
      },
    },
    {
      filepath: path.join(GENERATED_DTCG_DIR, '_content-switcher-tokens.scss'),
      builder() {
        return buildDTCGComponentTokensFile('content-switcher');
      },
    },
  ];

  for (const { filepath, builder } of files) {
    await fs.ensureFile(filepath);

    const { code } = generate(builder());
    await fs.writeFile(filepath, await code);
  }

  reporter.success('Done! 🎉');
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
