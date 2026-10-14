/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const path = require('path');
const { describePublicApi } = require('@carbon/test-utils/public-api');

describePublicApi({
  packageDir: path.resolve(__dirname, '..'),
  sassModules: [
    'index',
    'scss/component-tokens',
    'scss/config',
    'scss/theme',
    'scss/themes',
    'scss/tokens',
    'scss/utilities',
    'scss/compat/themes',
    {
      // v10 tokens resolve against `$theme`, so it must be a compat theme.
      url: 'scss/compat/tokens',
      setup: `
        @use 'scss/compat/themes' as compat;
        @use 'scss/theme' with ($theme: compat.$white);
      `,
    },
  ],
  generated: ['js/generated', 'scss/generated', 'scss/compat/generated'],
});
