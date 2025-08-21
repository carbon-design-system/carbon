/**
 * Copyright IBM Corp. 2018, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export default {
  preset: 'jest-config-carbon',
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    'packages/**/src/**/*.js',
    'packages/**/src/**/*.tsx',
    '!packages/{cli,components}/**',
    '!packages/**/{examples,stories}/**',
    '!**/*-story.js',
    '!**/*.stories.js',
    '!**/*-test.e2e.js',
  ],
  coveragePathIgnorePatterns: [
    'packages/web-components/*',
    // TODO: remove scss-generator once issue is resolved
    // https://github.com/carbon-design-system/carbon/issues/20115
    'packages/scss-generator/*',
  ],
  testPathIgnorePatterns: [
    'packages/web-components/*',
    // TODO: remove scss-generator once issue is resolved
    // https://github.com/carbon-design-system/carbon/issues/20115
    'packages/scss-generator/*',
  ],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!lodash-es|nanoid|chalk)',
  ],
  moduleNameMapper: {
    // Jest uses identity-obj-proxy to mock CSS/SCSS imports.
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  reporters: ['default', 'jest-junit'],
  extensionsToTreatAsEsm: ['.jsx', '.ts', '.tsx'],
};
