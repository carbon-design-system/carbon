/**
 * Copyright IBM Corp. 2020, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  coverageReporters: ['json', 'html'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!**/*.stories.{js,jsx,ts,tsx}',
    '!**/*.story.{js,jsx}',
    '!**/*.docs-page.{js,jsx}',
    '!**/src/globals/decorators/*',
    '!packages/ibm-products/src/globals/js/utils/props-helper.js', // This file contains utilities to help with prop-types which we're moving away from now that we've introduced TypeScript support
    '!packages/ibm-products/src/globals/js/utils/story-helper.js', // Contains bespoke storybook utilities that we want to move away from
    '!packages/ibm-products/src/globals/js/utils/StoryDocsPage.js', // Contains bespoke storybook utilities that we want to move away from
    '!**/*.deprecated.*',
    '!**/*.figma.*',
    '!**/assets/**.*',
    '!**/_story-assets/**.*',
  ],
  coveragePathIgnorePatterns: [
    'preview-components',
    // for deprecated components that contain more than 1 js file
    'Datagrid',
    'DecoratorDualButton',
    'DecoratorLink',
    'DecoratorSingleButton',
    'DescriptionList',
    'EditFullPage',
    'EditSidePanel',
    'EditTearsheet',
    'EditTearsheetNarrow',
    'EditUpdateCards',
    'FilterPanel',
    'FilterSummary',
    'HttpErrors',
    'Nav',
    'StatusIndicator',
    'UserProfileImage',
    'ComboButton',
    'CoachmarkButton',
    'CoachmarkBeacon',
    'CoachmarkFixed',
    'CoachmarkOverlayElement',
    'CoachmarkOverlayElements',
    'CoachmarkStack',
    'APIKeyModal',
    'CreateModal',
    'CreateTearsheetNarrow',
    'EmptyStates',
    'ExportModal',
    'HTTPErrors',
    'RemoveModal',
    'src/patterns',
  ],
  moduleFileExtensions: ['tsx', 'ts', 'jsx', 'js', 'json', 'node'],
  moduleNameMapper: {
    // This mapping is the result of updating to Jest 28. We currently require
    // this as the version of uuid that gets resolved is ESM but we would like
    // to work in CommonJS until Jest lands support for ESM in stable
    // Reference: https://github.com/microsoft/accessibility-insights-web/pull/5421#issuecomment-1109168149
    '^uuid$': 'uuid',
    // Mock Storybook actions for Jest tests (Storybook 10 is ESM-only)
    '^storybook/actions$': resolve(
      __dirname,
      './setup/storybookActionsMock.js'
    ),
    // This mapping is added to resolve the alias that is set in our webpack config
    // otherwise the webpack alias does not work in the jest environment
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(css|less|scss|sass)\\?inline$': resolve(
      __dirname,
      './setup/styleMock.js'
    ),
  },
  modulePathIgnorePatterns: ['/build/', '/es/', '/lib/', '/umd/', '/examples/'],
  reporters: ['default'],
  setupFiles: [resolve(__dirname, './setup/setupFiles.js')],
  setupFilesAfterEnv: [resolve(__dirname, './setup/setupFilesAfterEnv.js')],
  testMatch: [
    '<rootDir>/**/__tests__/**/*.(js|jsx|ts|tsx)?(x)',
    '<rootDir>/**/*.(spec|test).(js|jsx|ts|tsx)?(x)',
    '<rootDir>/**/*-(spec|test).(js|jsx|ts|tsx)?(x)',
  ],
  transform: {
    '^.+\\.(mjs|cjs|js|jsx|ts|tsx)$': resolve(
      __dirname,
      './transform/javascript.js'
    ),
    '^.+\\.s?css$': resolve(__dirname, './transform/css.js'),
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': resolve(
      __dirname,
      './transform/file.js'
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
    '/scripts/',
    'test-helper.js',
    '<rootDir>/src/globals/decorators/.*\\.stories\\.ts$',
  ],
  transformIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/es/',
    '<rootDir>/lib/',
    '<rootDir>/umd/',
    'node_modules/(?!@carbon-labs|uuid)',
    'ace-node\\.js',
    'ace-node-([a-zA-Z0-9_-]+).(js|ts)$',
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
    '/scripts/',
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  testTimeout: 120000,
};
