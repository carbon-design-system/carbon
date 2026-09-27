/**
 * Copyright IBM Corp. 2018, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { run } = require('../style-dictionary/sd.config');

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
