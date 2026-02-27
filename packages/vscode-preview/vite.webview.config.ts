/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname, 'src/webview'),
  // Use relative paths so asset URLs work in VS Code webviews,
  // which have no web server root — absolute paths like /assets/index.js fail.
  base: './',
  build: {
    outDir: resolve(__dirname, 'dist/webview'),
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'src/webview/index.html'),
      output: {
        // Stable filenames so the extension can reference them without hashes
        entryFileNames: 'assets/index.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: (assetInfo) => {
          if (
            assetInfo.name &&
            (assetInfo.name.endsWith('.woff2') ||
              assetInfo.name.endsWith('.woff'))
          ) {
            return 'assets/[name][extname]';
          }
          return 'assets/[name][extname]';
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Mirror the Storybook alias for IBM Plex fonts
        additionalData: '',
      },
    },
  },
  resolve: {
    alias: {
      '~@ibm/plex': '@ibm/plex',
      '~@ibm/plex/': '@ibm/plex/',
    },
  },
});

// Made with Bob
