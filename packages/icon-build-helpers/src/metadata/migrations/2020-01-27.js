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
const search = require('./search');
const cloneDeep = require('lodash.clonedeep');

async function migrate() {
  const metadataPath = path.resolve(__dirname, '../../icons/metadata.yml');
  const metadata = yaml.safeLoad(await fs.readFile(metadataPath, 'utf8'));
  const names = await search(path.resolve(__dirname, '../../icons/svg'));

  const data = {};
  for (const group of metadata.icons) {
    const { name, friendly_name, usage, aliases, variants = [], sizes } = group;
    const entry = names.find(({ basename }) => name === basename);
    if (entry) {
      data[name] = {
        name,
        friendly_name,
        usage,
        // categories: cloneDeep(categories),
        aliases: cloneDeep(aliases),
        sizes: cloneDeep(sizes),
      };
    }

    for (const variant of variants) {
      const entry = names.find(({ basename }) => variant.name === basename);
      if (!entry) {
        throw new Error(`No asset found for ${variant.name}`);
      }

      data[variant.name] = {
        name: variant.name,
        friendly_name: variant.friendly_name,
        usage,
        // categories: cloneDeep(categories),
        sizes: variant.sizes ? cloneDeep(variant.sizes) : cloneDeep(sizes),
        aliases: variant.aliases
          ? cloneDeep(variant.aliases)
          : cloneDeep(aliases),
      };
    }
  }

  await fs.writeFile(
    path.resolve(__dirname, '../../icons/icons.yml'),
    yaml.safeDump(
      { icons: Object.values(data) },
      {
        noRefs: true,
      }
    )
  );
}

migrate().catch((error) => {
  console.log(error);
  process.exit(1);
});
