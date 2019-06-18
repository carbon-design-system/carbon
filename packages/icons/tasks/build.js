/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const build = require('../src/build');
const { SVG_DIR } = require('../src/paths');

build(SVG_DIR, { cwd: process.cwd() }).catch(error => {
  // eslint-disable-next-line no-console
  console.error(error);
});
