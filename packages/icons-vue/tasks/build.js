/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

'use strict';

const path = require('path');
const build = require('../src/build');

build({ cwd: path.resolve(__dirname, '../') }).catch(error => {
  console.log(error);
});
