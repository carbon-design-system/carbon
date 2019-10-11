/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { replace } = require('../../tools/replace');
const { createFunctionRegex } = require('../../tools/regex');

const TARGET_VERSION = '0.0.1-alpha.32';
module.exports = {
  version: TARGET_VERSION,
  from: [
    {
      version: '<=0.0.1-alpha.31',
      async migrate(options) {
        const changes = [
          // Columns
          {
            filename: '_col.scss',
            from: createFunctionRegex('make-col-ready'),
            to: 'carbon--make-col-ready',
          },
          {
            filename: '_col.scss',
            from: createFunctionRegex('make-col'),
            to: 'carbon--make-col',
          },
          {
            filename: '_col.scss',
            from: createFunctionRegex('make-col-offset'),
            to: 'carbon--make-col-offset',
          },
          {
            filename: '_col.scss',
            from: createFunctionRegex('make-grid-columns'),
            to: 'carbon--make-grid-columns',
          },

          // Container
          {
            filename: '_container.scss',
            from: createFunctionRegex('make-container'),
            to: 'carbon--make-container',
          },
          {
            filename: '_container.scss',
            from: createFunctionRegex('set-largest-breakpoint'),
            to: 'carbon--set-largest-breakpoint',
          },
          {
            filename: '_container.scss',
            from: createFunctionRegex('make-container-max-widths'),
            to: 'carbon--make-container-max-widths',
          },

          // Row
          {
            filename: '_row.scss',
            from: createFunctionRegex('make-row'),
            to: 'carbon--make-row',
          },
        ];

        await replace('**/*.scss', changes, options);
      },
    },
  ],
};
