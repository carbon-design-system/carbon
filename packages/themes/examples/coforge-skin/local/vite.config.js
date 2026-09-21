import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const here = fileURLToPath(new URL('.', import.meta.url));
const repo = path.resolve(here, '../../../../..');

export default defineConfig({
  root: here,
  plugins: [
    react({
      include: /\.[jt]sx?$/,
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
        loadPaths: [
          path.join(repo, 'packages/react'),
          path.join(repo, 'packages/styles'),
          path.join(repo, 'packages/themes/scss'),
          path.join(repo, 'node_modules'),
        ],
      },
    },
  },
  server: {
    port: 5180,
    fs: {
      allow: [repo],
    },
  },
  optimizeDeps: {
    exclude: ['@carbon/motion'],
  },
  resolve: {
    preserveSymlinks: true,
    alias: {
      '@carbon/utilities/overflowHandler': path.join(
        repo,
        'packages/utilities/src/overflowHandler'
      ),
      '@carbon/utilities/date-picker': path.join(
        repo,
        'packages/utilities/src/date-picker'
      ),
      '~@ibm/plex': '@ibm/plex',
      '~@ibm/plex/': '@ibm/plex/',
      '@carbon/themes': path.join(repo, 'packages/themes'),
      '@carbon/feature-flags': path.join(repo, 'packages/feature-flags'),
      '@carbon/icons-react': path.join(repo, 'packages/icons-react'),
      '@carbon/utilities': path.join(repo, 'packages/utilities'),
      '@carbon/icon-helpers': path.join(repo, 'packages/icon-helpers'),
      '@carbon/react/icons': path.join(
        repo,
        'packages/react/icons/src/index.ts'
      ),
    },
  },
});
