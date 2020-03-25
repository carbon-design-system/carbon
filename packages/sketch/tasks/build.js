/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { Metadata } = require('@carbon/icon-build-helpers');
const path = require('path');

async function build() {
  await Metadata.build({
    input: path.resolve(__dirname, '../../icons'),
    output: path.resolve(__dirname, '../generated/icons'),
    extensions: [
      Metadata.extensions.icons,
      Metadata.extensions.assets,
      Metadata.extensions.moduleName,
      Metadata.extensions.deprecated,
      Metadata.extensions.categories,
    ],
  });

  await Metadata.build({
    input: path.resolve(__dirname, '../../pictograms'),
    output: path.resolve(__dirname, '../generated/pictograms'),
    extensions: [
      Metadata.extensions.pictograms,
      Metadata.extensions.assets,
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
