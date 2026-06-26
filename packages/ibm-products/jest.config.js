/**
 * Copyright IBM Corp. 2021, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const carbonConfig = resolve(__dirname, '../../config/jest-config-carbon');
const carbonSetup = resolve(carbonConfig, 'setup');

export default {
  // ── Environment ───────────────────────────────────────────────────────────
  testEnvironment: 'jsdom',
  testTimeout: 120000,

  // ── Setup ─────────────────────────────────────────────────────────────────
  // Carbon's setup.js: jest.setTimeout, requestAnimationFrame, ResizeObserver,
  // AnimationEvent, HTMLDialogElement, offsetParent, getComputedStyle polyfills.
  // Then our package-specific additions (IS_REACT_ACT_ENVIRONMENT, matchMedia, etc).
  setupFiles: [
    resolve(carbonSetup, 'setup.js'),
    resolve(__dirname, 'jest.setup.js'),
  ],
  // Local setupFilesAfterEnv: @testing-library/jest-dom, ibm-products custom
  // matchers, console.error/warn strict patching, clearAllMocks.
  setupFilesAfterEnv: [resolve(__dirname, 'jest.setupAfterEnv.js')],

  // ── Transform ─────────────────────────────────────────────────────────────
  transform: {
    '^.+\\.(mjs|cjs|js|jsx|ts|tsx)$': resolve(
      carbonConfig,
      'transform/jsTransform.js'
    ),
    '^.+\\.s?css$': resolve(carbonConfig, 'transform/cssTransform.js'),
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': resolve(
      carbonConfig,
      'transform/fileTransform.js'
    ),
  },
  transformIgnorePatterns: [
    'node_modules/(?!lodash-es|nanoid|chalk|@carbon-labs)',
    'ace-node\\.js',
    'ace-node-([a-zA-Z0-9_-]+).(js|ts)$',
  ],

  // ── Test discovery ────────────────────────────────────────────────────────
  testMatch: [
    '<rootDir>/**/__tests__/**/*.(js|jsx|ts|tsx)',
    '<rootDir>/**/*.(spec|test).(js|jsx|ts|tsx)',
    '<rootDir>/**/*-(spec|test).(js|jsx|ts|tsx)',
  ],
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

  // ── Module resolution ─────────────────────────────────────────────────────
  moduleFileExtensions: ['tsx', 'ts', 'jsx', 'js', 'json', 'node'],
  modulePathIgnorePatterns: ['/build/', '/es/', '/lib/', '/umd/', '/examples/'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    // ?inline imports (Vite-style)
    '\\.(css|less|scss|sass)\\?inline$': resolve(__dirname, 'jest/styleMock.js'),
    // Storybook 10 is ESM-only; mock actions for Jest
    '^storybook/actions$': resolve(__dirname, 'jest/storybookActionsMock.js'),
    // Force CJS resolution of uuid (ESM compat)
    '^uuid$': 'uuid',
    // Redirect @carbon/react to workspace source so Jest transforms it with Babel.
    // Without this, ibm-products tests resolve to packages/react/lib (pre-built CJS/UMD)
    // which includes @floating-ui/react as a UMD bundle. The UMD bundle's ref callback
    // triggers React 19 act() warnings. Using src/ matches how carbon's own tests run.
    '^@carbon/react$': resolve(__dirname, '../../packages/react/src/index.ts'),
    '^@carbon/react/icons$': resolve(
      __dirname,
      '../../packages/react/icons/index.js'
    ),
  },

  // ── Coverage ──────────────────────────────────────────────────────────────
  coverageReporters: ['json', 'html'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!**/*.stories.{js,jsx,ts,tsx}',
    '!**/*.story.{js,jsx}',
    '!**/*.docs-page.{js,jsx}',
    '!**/src/globals/decorators/*',
    '!**/*.deprecated.*',
    '!**/*.figma.*',
    '!**/assets/**.*',
    '!**/_story-assets/**.*',
  ],
  coveragePathIgnorePatterns: [
    'preview-components',
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

  // ── Watch ─────────────────────────────────────────────────────────────────
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
};
