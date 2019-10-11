/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { reporter } = require('@carbon/cli-reporter');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const fs = require('fs-extra');
const path = require('path');
const postcss = require('postcss');
const compile = require('../tools/compile');
const findPackageFolder = require('../tools/findPackageFolder');

const autoprefixerOptions = {
  browsers: ['last 1 version', 'ie >= 11', 'Firefox ESR'],
};

async function bundle(entrypoint, options) {
  reporter.info(`Bundling ${entrypoint}...`);

  const basename = options.name || path.basename(entrypoint, '.scss');
  const packageFolder = await findPackageFolder(entrypoint);
  const outputFolder = path.join(packageFolder, options.output);

  await fs.remove(outputFolder);
  await fs.ensureDir(outputFolder);

  const [uncompressed] = await Promise.all(compile([entrypoint]));
  const processedUncompressed = await postcss([
    autoprefixer(autoprefixerOptions),
    cssnano({
      preset: {
        plugins: [require('postcss-discard-comments')],
      },
    }),
  ]).process(uncompressed.result.css, {
    from: entrypoint,
    to: path.join(outputFolder, `${basename}.css`),
  });

  await fs.writeFile(
    path.join(outputFolder, `${basename}.css`),
    processedUncompressed.css
  );

  const [compressed] = await Promise.all(
    compile([entrypoint], {
      outputStyle: 'compressed',
    })
  );
  const processedCompressed = await postcss([
    autoprefixer(autoprefixerOptions),
    cssnano({
      preset: 'default',
    }),
  ]).process(compressed.result.css, {
    from: entrypoint,
    to: path.join(outputFolder, `${basename}.min.css`),
  });

  await fs.writeFile(
    path.join(outputFolder, `${basename}.min.css`),
    processedCompressed.css
  );
}

module.exports = bundle;
