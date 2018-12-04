'use strict';

const { reporter } = require('@carbon/cli-reporter');
const meta = require('@carbon/icons/meta.json');
const fs = require('fs-extra');
const path = require('path');
const { rollup } = require('rollup');
const {
  createModuleFromInfo,
  createEntrypointFromMeta,
} = require('./createFromInfo');
const createIconStory = require('./createIconStory');

const STORYBOOK_DIR = path.resolve(__dirname, '../examples/storybook/stories');

async function build({ cwd }) {
  reporter.info(`Building components for ${meta.length} icons...`);
  const ESM_DIR = path.join(cwd, 'es');
  const BUNDLE_FORMATS = [
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

      await fs.ensureDir(path.dirname(jsFilepath));
      await fs.writeFile(jsFilepath, source);

      await Promise.all(
        BUNDLE_FORMATS.map(async ({ format, directory }) => {
          const bundle = await rollup({
            input: jsFilepath,
            external: ['@carbon/icon-helpers', 'prop-types', 'react'],
          });
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

  reporter.info('Building ESM and bundle entrypoints...');
  const entrypoint = createEntrypointFromMeta(meta);
  const entrypointPath = path.join(ESM_DIR, 'index.js');

  await fs.ensureDir(ESM_DIR);
  await fs.writeFile(entrypointPath, entrypoint);

  await Promise.all(
    BUNDLE_FORMATS.map(async ({ format, directory }) => {
      const bundle = await rollup({
        input: entrypointPath,
        external: ['@carbon/icon-helpers', 'prop-types', 'react'],
      });
      const outputOptions = {
        format,
        file: entrypointPath.replace(/\/es\//, `/${directory}/`),
      };
      if (format === 'umd') {
        outputOptions.name = 'CarbonIconsReact';
        outputOptions.globals = {
          '@carbon/icon-helpers': 'CarbonIconHelpers',
          'prop-types': 'PropTypes',
          react: 'React',
        };
      }
      await bundle.write(outputOptions);
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
