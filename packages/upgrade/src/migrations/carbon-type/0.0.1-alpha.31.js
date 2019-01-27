/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { reporter } = require('../../reporter');
const { replace } = require('../../tools/replace');
const {
  createFunctionRegex,
  createVariableRegex,
} = require('../../tools/regex');

const TARGET_VERSION = '0.0.1-alpha.31';

module.exports = {
  version: TARGET_VERSION,
  from: [
    {
      version: '<=0.0.1-alpha.30',
      async migrate(options) {
        const changes = [
          // Classes
          {
            filename: '_classes.scss',
            from: createFunctionRegex('type-classes'),
            to: 'carbon--type-classes',
          },

          // Font family
          {
            filename: '_font-family.scss',
            from: createVariableRegex('font-families'),
            to: '$carbon--font-families',
          },
          {
            filename: '_font-family.scss',
            from: createFunctionRegex('font-family'),
            to: 'carbon--font-family',
          },
          {
            filename: '_font-family.scss',
            from: createVariableRegex('font-weights'),
            to: '$carbon--font-weights',
          },
          {
            filename: '_font-family.scss',
            from: createFunctionRegex('font-weight'),
            to: 'carbon--font-weight',
          },

          // Reset
          {
            filename: '_reset.scss',
            from: createFunctionRegex('type-reset'),
            to: 'carbon--type-reset',
          },

          // Scale
          {
            filename: '_scale.scss',
            from: createFunctionRegex('get-type-size'),
            to: 'carbon--get-type-size',
          },
          {
            filename: '_scale.scss',
            from: createVariableRegex('type-scale'),
            to: '$carbon--type-scale',
          },
          {
            filename: '_scale.scss',
            from: createFunctionRegex('font-size'),
            to: 'carbon--font-size',
          },

          // Spacing
          {
            filename: '_spacing.scss',
            from: createVariableRegex('type-tokens'),
            to: '$carbon--type-tokens',
          },
          {
            filename: '_spacing.scss',
            from: createFunctionRegex('type-spacing'),
            to: 'carbon--type-spacing',
          },

          // Styles
          {
            filename: '_styles.scss',
            from: createFunctionRegex('type-style'),
            to: 'carbon--type-style',
          },
        ];

        await replace('**/*.scss', changes, options);
      },
    },
  ],
};
