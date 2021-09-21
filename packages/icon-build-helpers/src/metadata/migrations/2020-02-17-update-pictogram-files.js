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
const Registry = require('../registry');

// This migration script transforms a nested pictograms file to a flat file
async function migrate() {
  const metadataPath = path.resolve(
    __dirname,
    '../../../../pictograms/metadata.yml'
  );
  const metadata = yaml.safeLoad(await fs.readFile(metadataPath, 'utf8'));
  const registry = await Registry.create(
    path.resolve(__dirname, '../../../../pictograms/svg')
  );

  const pictograms = [];
  for (const entry of metadata.icons) {
    if (registry.has(entry.name)) {
      const pictogram = {
        name: entry.name,
        friendly_name: entry.friendly_name,
      };

      if (Array.isArray(entry.aliases)) {
        pictogram.aliases = entry.aliases;
      }

      pictograms.push(pictogram);
    }

    if (!Array.isArray(entry.variants)) {
      continue;
    }

    for (const variant of entry.variants) {
      if (registry.has(variant.name)) {
        const pictogram = {
          name: variant.name,
          friendly_name: variant.friendly_name,
        };

        if (Array.isArray(variant.aliases)) {
          pictogram.aliases = variant.aliases;
        }

        pictograms.push(pictogram);
      }
    }
  }

  await fs.writeFile(
    path.resolve(__dirname, '../../../../pictograms/pictograms.yml'),
    yaml.safeDump(pictograms, { noRefs: true })
  );
}

migrate().catch((error) => {
  console.log(error);
  process.exit(1);
});
