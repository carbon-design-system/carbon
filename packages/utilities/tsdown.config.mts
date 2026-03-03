import { defineConfig } from 'tsdown';

const sharedConfig = defineConfig({
  clean: false,
  entry: {
    index: 'src/index.ts',
    '*': ['src/*/index.ts'],
  },
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
    dts: true,
    format: 'esm',
    outDir: 'es',
  },
  {
    ...sharedConfig,
    // The package publishes one canonical declaration tree from the ESM build.
    // The CJS build only needs runtime JS, so duplicate lib/*.d.ts files would
    // add redundant output without improving consumer type resolution.
    dts: false,
    format: 'cjs',
    outDir: 'lib',
  },
]);
