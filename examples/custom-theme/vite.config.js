import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
