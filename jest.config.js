/**
 * Copyright IBM Corp. 2018, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = {
  preset: 'jest-config-carbon',
  collectCoverageFrom: [
    'packages/**/src/**/*.js',
    'packages/**/src/**/*.tsx',
    '!packages/{cli,components}/**',
    '!packages/**/{examples,stories}/**',
    '!**/*-story.js',
    '!**/*.stories.js',
    '!**/*-test.e2e.js',
  ],
  coveragePathIgnorePatterns: ['packages/web-components/*'],
  testPathIgnorePatterns: ['packages/web-components/*'],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es|nanoid)'],
  moduleNameMapper: {
    // This is a temporary workaround from moving to Jest v28. In this update,
    // certain dependencies are only providing ESM through exports and so we use
    // `require.resolve` to force CommonJS resolution
    //
    // @see https://jestjs.io/docs/upgrading-to-jest28#packagejson-exports
    // @see https://github.com/microsoft/accessibility-insights-web/pull/5421#issuecomment-1109168149
    nanoid: require.resolve('nanoid'),
  },
  reporters: ['default', 'jest-junit'],

  // This is a temporary workaround until Jest supports Prettier 3 (and ESM)
  // @see https://jestjs.io/docs/configuration#prettierpath-string
  prettierPath: require.resolve('prettier2'),
};
