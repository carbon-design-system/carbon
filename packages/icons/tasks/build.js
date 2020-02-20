/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { builders, Metadata } = require('@carbon/icon-build-helpers');
const path = require('path');

const SVG_DIR = path.resolve(__dirname, '../svg');

async function build() {
  await builders.vanilla.run(SVG_DIR, {
    cwd: process.cwd(),
  });

  await Metadata.build({
    directory: path.resolve(__dirname, '../'),
    extensions: [
      Metadata.extensions.icons,
      Metadata.extensions.moduleName,
      Metadata.extensions.deprecated,
      Metadata.extensions.categories,
    ],
  });
}

build().catch(error => {
  console.log(error);
  process.exit(1);
});
