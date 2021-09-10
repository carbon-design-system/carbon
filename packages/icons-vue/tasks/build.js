/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { builders } = require('@carbon/icon-build-helpers');
const metadata = require('@carbon/icons/metadata.json');

async function build() {
  await builders.vue.run(metadata, {
    output: process.cwd(),
  });
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
