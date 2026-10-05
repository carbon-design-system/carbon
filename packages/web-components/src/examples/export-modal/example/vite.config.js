/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { resolve } from 'path';
import { defineConfig } from 'vite';
import litcss from 'vite-plugin-lit-css';

export default defineConfig({
  plugins: [litcss()],
  resolve: {
    alias: [
      // When running standalone (e.g. StackBlitz), the relative paths that
      // traverse up to the monorepo source tree won't resolve. Redirect them
      // to the installed @carbon/web-components package instead.
      {
        find: /^\.\.\/\.\.\/\.\.\/\.\.\/globals\/(.*)/,
        replacement: '@carbon/web-components/es/globals/$1',
      },
      {
        find: /^\.\.\/\.\.\/\.\.\/\.\.\/components\/(.*)/,
        replacement: '@carbon/web-components/es/components/$1',
      },
    ],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
});
