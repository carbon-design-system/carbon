import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const { CODESANDBOX_SSE } = process.env;
const server = {};

if (CODESANDBOX_SSE) {
  server.hmr = {
    port: 443,
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server,
});
