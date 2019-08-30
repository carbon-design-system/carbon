/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { check } = require('@carbon/icon-build-helpers');
const path = require('path');

check(
  {
    categoriesPath: path.resolve(__dirname, '../categories.yml'),
    metadataPath: path.resolve(__dirname, '../metadata.yml'),
    iconsPath: path.resolve(__dirname, '../svg'),
  },
  {
    shouldCheckSizes: false,
  }
).catch(error => {
  console.error(error);
  process.exit(1);
});
