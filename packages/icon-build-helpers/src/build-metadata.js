/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

'use strict';

const fs = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');

async function buildMetadata({ categoriesPath, metadataPath }, { cwd }) {
  const metadata = yaml.safeLoad(await fs.readFile(metadataPath, 'utf8'));
  const categories = yaml.safeLoad(await fs.readFile(categoriesPath, 'utf8'));
  const outputPath = path.join(cwd, 'metadata.json');

  await fs.writeJson(
    outputPath,
    { ...metadata, ...categories },
    {
      spaces: 2,
    }
  );
}

module.exports = buildMetadata;
