/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const { builders, Metadata } = require('@carbon/icon-build-helpers');

async function loadMetadata() {
  const iconsRoot = path.dirname(require.resolve('@carbon/icons/package.json'));
  return Metadata.load({
    input: {
      svg: path.join(iconsRoot, 'src/svg'),
      extensions: iconsRoot,
    },
    extensions: [
      Metadata.extensions.icons,
      Metadata.extensions.assets,
      Metadata.extensions.deprecated,
      Metadata.extensions.output,
      Metadata.extensions.categories,
      Metadata.extensions.moduleInfo,
    ],
  });
}

async function build() {
  const metadata = await loadMetadata();
  await builders.vue.run(metadata, {
    output: process.cwd(),
  });
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
