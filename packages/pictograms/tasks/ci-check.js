/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { Metadata } = require('@carbon/icon-build-helpers');
const path = require('path');

async function check() {
  await Metadata.check({
    input: {
      svg: path.resolve(__dirname, '../src/svg'),
      extensions: path.resolve(__dirname, '../'),
    },
    extensions: [
      Metadata.extensions.pictograms,
      Metadata.extensions.moduleName,
      Metadata.extensions.deprecated,
      Metadata.extensions.categories,
    ],
  });
}

check().catch((error) => {
  console.log(error);
  process.exit(1);
});
