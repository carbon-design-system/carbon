/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const jestConfig = require('jest-config-ibm-cloud-cognitive');

module.exports = {
  ...jestConfig,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!**/*.stories.{js,jsx,ts,tsx}',
    '!**/*.story.{js,jsx}',
  ],
  testMatch: [
    '<rootDir>/**/__tests__/**/*.(js|jsx|ts|tsx)?(x)',
    '<rootDir>/**/*.(spec|test).(js|jsx|ts|tsx)?(x)',
    '<rootDir>/**/*-(spec|test).(js|jsx|ts|tsx)?(x)',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/es/', '/lib/', '/build/'],
  transformIgnorePatterns: ['/node_modules/', '/es/', '/lib/'],
};
