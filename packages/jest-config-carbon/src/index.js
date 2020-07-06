/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = {
  collectCoverageFrom: [
    'packages/**/src/**/*.js',
    '!packages/{bundler,cli,components,sketch}/**',
    '!packages/**/{examples,stories}/**',
    '!**/*-story.js',
  ],
  moduleFileExtensions: ['js', 'json', 'node'],
  reporters: ['default', 'jest-junit'],
  setupFiles: [require.resolve('./setup/setup')],
  setupFilesAfterEnv: [require.resolve('./setup/setupAfterEnv')],
  snapshotSerializers: [require.resolve('enzyme-to-json/serializer')],
  testMatch: [
    '<rootDir>/**/__tests__/**/*.js?(x)',
    '<rootDir>/**/*.(spec|test).js?(x)',
    '<rootDir>/**/*-(spec|test).js?(x)',
  ],
  transform: {
    '^.+\\.(js|jsx)$': require.resolve('./transforms/javascript'),
    '^.+\\.css$': require.resolve('./transforms/css'),
    '^(?!.*\\.(js|jsx|css|json)$)': require.resolve('./transforms/file'),
  },
  testRunner: require.resolve('jest-circus/runner'),
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
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  watchPathIgnorePatterns: [
    '/cjs/',
    '/dist/',
    '/es/',
    '/examples/',
    '/lib/',
    '/storybook/',
    '/results/',
  ],
};
