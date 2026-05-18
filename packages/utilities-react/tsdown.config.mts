import { defineConfig } from 'tsdown';

const chunkFileName = 'chunk.js';

const sharedConfig = defineConfig({
  clean: false,
  entry: {
    index: 'src/index.ts',
    '*': ['src/*/index.{ts,tsx,js,jsx}'],
  },
  logLevel: 'warn',
  target: 'es2022',
  outputOptions(options) {
    return {
      ...options,
      chunkFileNames: chunkFileName,
      entryFileNames: '[name].js',
    };
  },
});

export default defineConfig([
  {
    ...sharedConfig,
    dts: true,
    format: 'esm',
    outDir: 'es',
  },
  {
    ...sharedConfig,
    // The package points `types` at the ESM declaration output. Keeping the
    // CJS build JS-only avoids publishing a second, redundant declaration tree
    // under lib/ that consumers do not resolve through package metadata.
    dts: false,
    format: 'cjs',
    outDir: 'lib',
  },
]);
