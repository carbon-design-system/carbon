import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      // suppress mixed-declarations warnings until resolved in
      // https://github.com/carbon-design-system/carbon/issues/16962
      scss: {
        api: 'modern',
        silenceDeprecations: ['mixed-decls'],
      },
    },
  },
  // resolve font paths
  resolve: {
    alias: [
      {
        find: /~@ibm\/plex\/(.*)/,
        replacement: '@ibm/plex/$1',
      },
    ],
  },
  optimizeDeps: {
    include: ['@carbon/react'],
  },
});
