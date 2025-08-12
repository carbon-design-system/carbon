/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export default {
  preset: 'jest-config-carbon',
  collectCoverageFrom: [
    'packages/**/src/**/*.js',
    '!packages/{cli,components}/**',
    '!packages/**/{examples,stories}/**',
    '!**/*-story.js',
  ],
  testMatch: ['<rootDir>/e2e/**/*-test.js'],
  testPathIgnorePatterns: [
    'examples',
    '/packages/components/',
    '/packages/react/',
  ],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!lodash-es|nanoid|chalk)',
  ],
  reporters: ['default', 'jest-junit'],
};
