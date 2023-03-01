/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = {
  moduleFileExtensions: ['tsx', 'ts', 'js', 'json', 'node'],
  moduleNameMapper: {
    // This mapping is the result of updating to Jest 28. We currently require
    // this as the version of uuid that gets resolved is ESM but we would like
    // to work in CommonJS until Jest lands support for ESM in stable
    // Reference: https://github.com/microsoft/accessibility-insights-web/pull/5421#issuecomment-1109168149
    '^uuid$': require.resolve('uuid'),
  },
  modulePathIgnorePatterns: ['/build/', '/es/', '/lib/', '/umd/', '/examples/'],
  reporters: ['default'],
  setupFiles: [require.resolve('./setup/setup.js')],
  setupFilesAfterEnv: [require.resolve('./setup/setupAfterEnv.js')],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testMatch: [
    '<rootDir>/**/__tests__/**/*.js?(x)',
    '<rootDir>/**/*.(spec|test).js?(x)',
    '<rootDir>/**/*-(spec|test).js?(x)',
  ],
  transform: {
    '^.+\\.(mjs|cjs|js|jsx|ts|tsx)$': require.resolve(
      './transform/jsTransform.js'
    ),
    '^.+\\.s?css$': require.resolve('./transform/cssTransform.js'),
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': require.resolve(
      './transform/fileTransform.js'
    ),
  },
  testEnvironment: 'jsdom',
  testRunner: 'jest-circus/runner',
  testPathIgnorePatterns: [
    '/.avt/',
    '/cjs/',
    '/dist/',
    '/es/',
    '/lib/',
    '/build/',
    'e2e',
    'examples',
    '/umd/',
    '/vendor/',
  ],
  transformIgnorePatterns: [
    '/build/',
    '/es/',
    '/lib/',
    '/umd/',
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$',
  ],
  watchPathIgnorePatterns: [
    '/.avt/',
    '/cjs/',
    '/dist/',
    '/es/',
    '/examples/',
    '/lib/',
    '/storybook/',
    '/results/',
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
