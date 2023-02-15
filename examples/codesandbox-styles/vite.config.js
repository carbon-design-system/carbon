import { defineConfig } from 'vite';

const { CODESANDBOX_SSE } = process.env;
const server = {};

if (CODESANDBOX_SSE) {
  server.hmr = {
    port: 443,
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  server,
});
