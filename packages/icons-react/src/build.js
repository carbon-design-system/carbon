/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { reporter } = require('@carbon/cli-reporter');
const meta = require('@carbon/icons/meta.json');
const fs = require('fs-extra');
const path = require('path');
const { rollup } = require('rollup');
const virtual = require('rollup-plugin-virtual');
const { createModuleFromInfo } = require('./createFromInfo');
const createIconStory = require('./createIconStory');

const STORYBOOK_DIR = path.resolve(__dirname, '../examples/storybook/stories');

async function build({ cwd }) {
  reporter.info(`Building components for ${meta.length} icons...`);
  const BUNDLE_FORMATS = [
    {
      format: 'esm',
      directory: 'es',
    },
    {
      format: 'cjs',
      directory: 'lib',
    },
    {
      format: 'umd',
      directory: 'umd',
    },
  ];

  reporter.info('Building ESM and bundle sources...');

  await Promise.all(
    meta.map(async info => {
      const source = createModuleFromInfo(info);
      const jsFilepath = path.join(cwd, info.outputOptions.file);
      const bundle = await rollup({
        input: '__entrypoint__',
        external: ['@carbon/icon-helpers', 'prop-types', 'react'],
        plugins: [
          virtual({
            __entrypoint__: source,
          }),
        ],
      });

      await Promise.all(
        BUNDLE_FORMATS.map(async ({ format, directory }) => {
          const outputOptions = {
            format,
            file: jsFilepath.replace(/\/es\//, `/${directory}/`),
          };
          if (format === 'umd') {
            outputOptions.name = info.moduleName;
            outputOptions.globals = {
              '@carbon/icon-helpers': 'CarbonIconHelpers',
              'prop-types': 'PropTypes',
              react: 'React',
            };
          }
          await bundle.write(outputOptions);
        })
      );
    })
  );

  reporter.info('Generating Storybook stories...');
  await fs.remove(STORYBOOK_DIR);
  await fs.ensureDir(STORYBOOK_DIR);
  await Promise.all(
    meta.map(info => {
      const { moduleName } = info;
      const outputPath = path.join(STORYBOOK_DIR, `${moduleName}-story.js`);
      return fs.writeFile(outputPath, createIconStory(info));
    })
  );

  reporter.success('Done! 🎉');
}

module.exports = build;
