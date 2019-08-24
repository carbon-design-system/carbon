/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { builders, buildMetadata } = require('@carbon/icon-build-helpers');
const path = require('path');

const SVG_DIR = path.resolve(__dirname, '../svg');
const CATEGORIES_PATH = path.resolve(__dirname, '../categories.yml');
const METADATA_PATH = path.resolve(__dirname, '../metadata.yml');

async function build() {
  const cwd = process.cwd();
  await builders.vanilla.run(SVG_DIR, {
    cwd,
  });
  await buildMetadata(
    {
      categoriesPath: CATEGORIES_PATH,
      metadataPath: METADATA_PATH,
    },
    {
      cwd,
    }
  );
}

build().catch(error => {
  console.error(error);
});
