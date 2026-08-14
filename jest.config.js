/**
 * Copyright IBM Corp. 2018, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export default {
  preset: 'jest-config-carbon',
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/**/__tests__/**/*.@(js|jsx|ts|tsx)',
    '<rootDir>/**/*.(spec|test).@(js|jsx|ts|tsx)',
    '<rootDir>/**/*-(spec|test).@(js|jsx|ts|tsx)',
  ],
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
    // scss-generator coverage is collected by `yarn test:scss-generator`,
    // which scopes VM modules to the Prettier 3 dynamic imports in that package.
    'packages/scss-generator/*',
  ],
  testPathIgnorePatterns: [
    'packages/web-components/*',
    // scss-generator is covered by `yarn test:scss-generator`, which scopes
    // VM modules to the Prettier 3 dynamic imports in that package.
    'packages/scss-generator/*',
  ],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!lodash-es|nanoid|chalk)',
  ],
  moduleNameMapper: {
    // Jest uses identity-obj-proxy to mock CSS/SCSS imports.
    '\\.(css|scss)$': 'identity-obj-proxy',
    // Some packages (e.g. @carbon/utilities) write relative imports with an
    // explicit `.js` extension that resolves to a `.ts` source file (valid
    // under "moduleResolution": "bundler"). Jest resolves `.js` literally, so
    // strip it and let `moduleFileExtensions` fall back to `.ts`/`.tsx`.
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  reporters: ['default', 'jest-junit'],
  extensionsToTreatAsEsm: ['.jsx', '.ts', '.tsx'],
};
