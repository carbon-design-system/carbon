/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { reporter } = require('@carbon/cli-reporter');
const fs = require('fs-extra');
const { svgo } = require('./svgo');
const { flatMapAsync } = require('../../tools');
const search = require('../../search');

async function optimize(folder) {
  reporter.info(`Optimizing icons in the folder: \`${folder}\``);

  const files = await search(folder);

  reporter.info(`Optimizing ${files.length} icons...`);

  const optimized = await flatMapAsync(files, async file => {
    const { filepath } = file;
    const source = await fs.readFile(filepath);
    const optimized = await svgo.optimize(source, {
      path: filepath,
    });

    return {
      ...file,
      source,
      optimized,
    };
  });

  reporter.success(`Successfully optimized ${optimized.length} icons 🎉`);

  return optimized;
}

module.exports = optimize;
