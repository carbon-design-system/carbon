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
        logger: {
          warn: (message) =>
            message.includes('mixed-decls')
              ? undefined
              : { type: 'warn', message },
        },
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
});
