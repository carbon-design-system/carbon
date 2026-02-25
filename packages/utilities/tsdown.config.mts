import { defineConfig } from 'tsdown';

const sharedConfig = defineConfig({
  clean: false,
  dts: false,
  entry: ['src/index.ts'],
  logLevel: 'warn',
  target: 'es2022',
  outputOptions(options) {
    return {
      ...options,
      chunkFileNames: 'chunk-[hash].js',
      entryFileNames: '[name].js',
    };
  },
});

export default defineConfig([
  {
    ...sharedConfig,
    format: 'esm',
    outDir: 'es',
  },
  {
    ...sharedConfig,
    format: 'cjs',
    outDir: 'lib',
  },
]);
