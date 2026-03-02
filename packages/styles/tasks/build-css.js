/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { existsSync } = require('fs');
const fs = require('fs/promises');
const path = require('path');
const postcss = require('postcss');
const sass = require('sass');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const flexbugs = require('postcss-flexbugs-fixes');

async function build() {
  const filepath = path.resolve(__dirname, '..', 'index.scss');
  const loadPaths = [
    __dirname,
    path.resolve(__dirname, '..'),
    path.resolve(__dirname, '..', '..', '..', 'node_modules'),
  ];
  const entrypoint = `
    @use '../index.scss' with (
      $use-akamai-cdn: true,
      $fonts: (
        IBM-Plex-Mono: true,
        IBM-Plex-Sans-Arabic: true,
        IBM-Plex-Sans-Devanagari: true,
        IBM-Plex-Sans-Hebrew: true,
        IBM-Plex-Sans-Thai-Looped: true,
        IBM-Plex-Sans-Thai: true,
        IBM-Plex-Sans: true,
        IBM-Plex-Serif: true,
      ),
    );
  `;
  const { css } = sass.compileString(entrypoint, {
    loadPaths,
  });
  const bundles = [
    {
      filename: 'styles.css',
      postcss: [
        autoprefixer({
          overrideBrowserslist: 'extends browserslist-config-carbon',
        }),
        flexbugs(),
      ],
    },
    {
      filename: 'styles.min.css',
      postcss: [
        autoprefixer({
          overrideBrowserslist: 'extends browserslist-config-carbon',
        }),
        flexbugs(),
        cssnano({
          preset: 'default',
        }),
      ],
    },
  ];

  const OUTPUT_DIRECTORY = path.resolve(__dirname, '..', 'css');

  if (!existsSync(OUTPUT_DIRECTORY)) {
    await fs.mkdir(OUTPUT_DIRECTORY);
  }

  for (const bundle of bundles) {
    const result = await postcss(bundle.postcss).process(css, {
      from: filepath,
    });
    await fs.writeFile(
      path.join(OUTPUT_DIRECTORY, bundle.filename),
      result.css
    );
  }
}

build().catch((error) => {
  console.log(error);
  process.exit(1);
});
