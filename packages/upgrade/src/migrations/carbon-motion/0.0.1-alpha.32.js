/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { replace } = require('../../tools/replace');
const {
  createFunctionRegex,
  createVariableRegex,
} = require('../../tools/regex');

const TARGET_VERSION = '0.0.1-alpha.32';

module.exports = {
  version: TARGET_VERSION,
  from: [
    {
      version: '<=0.0.1-alpha.31',
      async migrate(options) {
        const changes = [
          {
            filename: 'motion.scss',
            from: createVariableRegex('easings'),
            to: '$carbon--easings',
          },
          {
            filename: 'motion.scss',
            from: createFunctionRegex('motion'),
            to: 'carbon--motion',
          },
        ];

        await replace('**/*.scss', changes, options);
      },
    },
  ],
};
