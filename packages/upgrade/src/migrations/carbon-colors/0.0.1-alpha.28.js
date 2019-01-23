/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { reporter } = require('../../reporter');

const TARGET_VERSION = '0.0.1-alpha.28';

module.exports = {
  version: TARGET_VERSION,
  from: [
    {
      version: '0.0.1-alpha.27',
      async migrate(dependency, cwd) {
        reporter.info(
          'Running migration from 0.0.1-alpha.27 to 0.0.0-alpha.28'
        );
      },
    },
  ],
};
