/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const fs = require('fs-extra');
const path = require('path');

async function builder(metadata, { output }) {
  const SVG_OUTPUT_DIR = path.join(output, 'svg');

  await fs.emptyDir(SVG_OUTPUT_DIR);

  for (const icon of metadata.icons) {
    for (const asset of icon.assets) {
      const filepath = path.join(SVG_OUTPUT_DIR, asset.filepath);
      await fs.ensureFile(filepath);
      await fs.writeFile(filepath, asset.optimized.data, 'utf8');
    }
  }
}

module.exports = builder;
