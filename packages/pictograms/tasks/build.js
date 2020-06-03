/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { builders, Metadata } = require('@carbon/icon-build-helpers');
const path = require('path');

async function build() {
  const metadata = await Metadata.build({
    input: {
      svg: path.resolve(__dirname, '../src/svg'),
      extensions: path.resolve(__dirname, '../'),
    },
    extensions: [
      Metadata.extensions.pictograms,
      Metadata.extensions.assets,
      Metadata.extensions.deprecated,
      [Metadata.extensions.output, { target: 'pictograms' }],
      Metadata.extensions.categories,
    ],
  });

  const output = path.resolve(__dirname, '../');
  await Promise.all([
    builders.svg.run(metadata, { output }),
    builders.vanilla.run(metadata, { output }),
  ]);
}

build().catch((error) => {
  console.log(error);
  process.exit(1);
});
