/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');

module.exports = {
  preset: 'jest-config-carbon',
  collectCoverageFrom: [
    'packages/**/src/**/*.js',
    '!packages/{cli,components,sketch}/**',
    '!packages/**/{examples,stories}/**',
    '!**/*-story.js',
    '!**/*.stories.js',
    '!**/*-test.e2e.js',
  ],
  moduleNameMapper: {
    '@carbon/react': path.join(
      __dirname,
      'packages',
      'carbon-react',
      'src',
      'index.js'
    ),
    '@carbon/react/icons': path.join(
      __dirname,
      'packages',
      'carbon-react',
      'icons',
      'index.js'
    ),
    'carbon-components-react': path.join(
      __dirname,
      'packages',
      'react',
      'src',
      'index.js'
    ),
  },
  reporters: ['default', 'jest-junit'],
};
