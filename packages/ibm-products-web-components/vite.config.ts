/// <reference types="@vitest/browser/providers/playwright" />
/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineConfig, configDefaults } from 'vitest/config';
import { litStyleLoader, litTemplateLoader } from '@mordech/vite-lit-loader';
import externalizeSourceDependencies from '@blockquote/rollup-plugin-externalize-source-dependencies';

export default defineConfig({
  plugins: [
    litStyleLoader(),
    litTemplateLoader(),
    externalizeSourceDependencies([
      /* @web/test-runner-commands needs to establish a web-socket
       * connection. It expects a file to be served from the
       * @web/dev-server. So it should be ignored by Vite */
      '/__web-dev-server__web-socket.js',
    ]),
  ],
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.test.ts'],
    exclude: [...configDefaults.exclude],
    // Lit recommends using browser environment for testing
    // https://lit.dev/docs/tools/testing/#testing-in-the-browser
    browser: {
      provider: 'playwright',
      enabled: true,
      headless: true,
      instances: [{ browser: 'chromium' }],
    },
    coverage: {
      provider: 'v8',
      include: ['src/**/*'],
      exclude: [
        'src/**/*.stories.{js,ts}',
        'src/components/*/_story-assets/*',
        'src/**/*.figma.*',
      ],
      reporter: ['text', 'html', 'json'],
    },
    css: {
      include: /page-header/,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
        quietDeps: true,
        silenceDeprecations: ['global-builtin', 'legacy-js-api'],
      },
    },
  },
});
