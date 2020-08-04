/*
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = {
  plugins: ['header'],
  rules: {
    'header/header': [
      'error',
      'block',
      `
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
`,
    ],
  },
  overrides: [
    {
      files: [
        '**/packages/components/demo/**/*.js',
        '**/fixtures/**/*.js',
        '**/__fixtures__/**/*.js',
        '**/__testfixtures__/**/*.js',
      ],
      rules: {
        'header/header': 0,
      },
    },
  ],
};
