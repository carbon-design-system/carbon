/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const yaml = require('js-yaml');
const path = require('path');

// Remove the "usage" field from icons in icons.yml
async function migrate() {
  const metadataPath = path.resolve(__dirname, '../../../../icons/icons.yml');
  const metadata = yaml.safeLoad(await fs.readFile(metadataPath, 'utf8'));

  for (const icon of metadata) {
    if (icon.usage) {
      delete icon.usage;
    }
  }

  await fs.writeFile(
    metadataPath,
    yaml.safeDump(metadata, {
      noRefs: true,
    })
  );
}

migrate().catch((error) => {
  console.log(error);
  process.exit(1);
});
