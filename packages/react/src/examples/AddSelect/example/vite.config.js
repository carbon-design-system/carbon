/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({ jsxRuntime: 'classic' })],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  resolve: {
    alias: {
      // Mirror the alias used in the Storybook build so that SCSS files that
      // use `@use 'ALIAS_STORY_STYLE_CONFIG'` to read $pkg-prefix also compile
      // in the standalone example app.
      ALIAS_STORY_STYLE_CONFIG: resolve(
        __dirname,
        'node_modules/@carbon/ibm-products-styles/scss/global/styles/_project-settings.scss'
      ),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ['node_modules'],
      },
    },
  },
});
