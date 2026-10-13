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
const { describeTokenConformance } = require('@carbon/test-utils/tokens');

// Theme and component tokens store their values in
// `$extensions["carbon.themes"]` instead of `$value`, so every token currently
// fails `token-values`.
const themeTokenFailures = [
  'schema-url',
  'token-values',
  'extension-namespace',
];

describeTokenConformance({
  packageDir: path.resolve(__dirname, '..'),
  include: ['src/dtcg/**/*.json'],
  // generated from @carbon/colors during build
  exclude: ['src/dtcg/color-palette.json'],
  knownFailures: {
    'src/dtcg/themes.json': themeTokenFailures,
    'src/dtcg/components/button.json': themeTokenFailures,
    'src/dtcg/components/content-switcher.json': themeTokenFailures,
    'src/dtcg/components/notification.json': themeTokenFailures,
    'src/dtcg/components/status.json': themeTokenFailures,
    'src/dtcg/components/tag.json': themeTokenFailures,
  },
});
