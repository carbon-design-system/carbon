/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fileURLToPath } from 'node:url';
import webComponentsConfig from '../web-components/web-test-runner.config.mjs';

/**
 * Runs the web components test suites, rewritten by `tasks/wc-tests.js`,
 * against the vendored `cds-ng` copy. Everything else (browser, timeouts, the
 * test page) comes from the web components' own configuration.
 */
const wcTests = fileURLToPath(new URL('.entries/.wc-tests', import.meta.url));

export default {
  ...webComponentsConfig,
  // The tests import the vendored copy by its path from the repository root.
  rootDir: fileURLToPath(new URL('../..', import.meta.url)),
  files: [`${wcTests}/**/__tests__/**/*.js`, '!**/__snapshots__/**'],
  coverage: false,
};
