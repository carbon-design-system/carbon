/**
 * Copyright IBM Corp. 2023, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const carbonConfig = resolve(__dirname, '../../config/jest-config-carbon');

export default {
  testEnvironment: 'node',
  testTimeout: 120000,

  transform: {
    '^.+\\.(mjs|cjs|js|jsx|ts|tsx)$': resolve(
      carbonConfig,
      'transform/jsTransform.js'
    ),
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': resolve(
      carbonConfig,
      'transform/fileTransform.js'
    ),
  },
  transformIgnorePatterns: ['node_modules/'],

  testMatch: [
    '<rootDir>/**/__tests__/**/*.(js|jsx|ts|tsx)',
    '<rootDir>/**/*.(spec|test).(js|jsx|ts|tsx)',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/css/', '/scss/', 'test-helper'],

  moduleFileExtensions: ['tsx', 'ts', 'jsx', 'js', 'json', 'node'],
  modulePathIgnorePatterns: ['/css/', '/scss/'],

  watchPathIgnorePatterns: ['/css/', '/scss/'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
