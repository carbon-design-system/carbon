/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  moduleFileExtensions: ['tsx', 'ts', 'js', 'json', 'node'],
  moduleNameMapper: {
    // This mapping is the result of updating to Jest 28. We currently require
    // this as the version of uuid that gets resolved is ESM but we would like
    // to work in CommonJS until Jest lands support for ESM in stable
    // Reference: https://github.com/microsoft/accessibility-insights-web/pull/5421#issuecomment-1109168149
    '^uuid$': resolve(__dirname, 'node_modules/uuid'),
  },
  modulePathIgnorePatterns: ['/build/', '/es/', '/lib/', '/umd/', '/examples/'],
  reporters: ['default'],
  setupFiles: [resolve(__dirname, './setup/setup.js')],
  setupFilesAfterEnv: [resolve(__dirname, './setup/setupAfterEnv.js')],
  testMatch: [
    '<rootDir>/**/__tests__/**/*.js?(x)',
    '<rootDir>/**/*.(spec|test).js?(x)',
    '<rootDir>/**/*-(spec|test).js?(x)',
  ],
  transform: {
    '^.+\\.(mjs|cjs|js|jsx|ts|tsx)$': resolve(
      __dirname,
      './transform/jsTransform.js'
    ),
    '^.+\\.s?css$': resolve(__dirname, './transform/cssTransform.js'),
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': resolve(
      __dirname,
      './transform/fileTransform.js'
    ),
  },
  testEnvironment: 'jsdom',
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
