/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = {
  setupFiles: ['../../tasks/jest/setup.js', './jest-setup.js'],
  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/__tests__/**/*.js?(x)'],
  testPathIgnorePatterns: [
    '/cjs/',
    '/dist/',
    '/es/',
    '/lib/',
    '/build/',
    'e2e',
    'examples',
    '/umd/',
  ],
  transform: {
    '^.+\\.(js|jsx)$': '../../tasks/jest/jsTransform.js',
    '^.+\\.css$': '../../tasks/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|css|json)$)': '../../tasks/jest/fileTransform.js',
  },
};
