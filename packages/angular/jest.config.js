/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/** @type {import('jest').Config} */
export default {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.spec.ts',
    '<rootDir>/src/**/*.spec.ts',
  ],
  // `.entries/package.json` is the publish manifest that build-entries writes;
  // it repeats the package name, which Jest would report as a duplicate.
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/.entries/package.json',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/esm2022/',
    '/fesm2022/',
    '/dist/',
  ],
  // e2e tests run via Playwright, not Jest.
  // The real `@carbon/web-components` build (`es/`) is used, not stubs, so
  // specs can assert on actual web component behavior. CI builds the package
  // first; locally run `yarn workspace @carbon/web-components build`.
  moduleNameMapper: {
    // Wrappers are imported as consumers import them, resolved to the
    // generated source in `.entries/`.
    '^@carbon/angular$': '<rootDir>/.entries/index.ts',
    '^@carbon/angular/(.*)$': '<rootDir>/.entries/$1/index.ts',
    '^#carbon-ng/(.*)$': '<rootDir>/.entries/vendor/$1',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!@carbon/web-components|lit|@lit|@floating-ui)',
  ],
  passWithNoTests: true,
  collectCoverageFrom: ['src/**/*.ts', '!src/index.ts', '!src/**/*.spec.ts'],
};
