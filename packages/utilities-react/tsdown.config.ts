import { defineConfig } from 'tsdown';

const sharedConfig = defineConfig({
  clean: false,
  dts: false,
  entry: ['src/index.ts'],
  logLevel: 'warn',
  target: 'es2022',
  inputOptions(options) {
    // Temporary compatibility shim for tsdown+rolldown option validation.
    if ('define' in options) {
      delete (options as { define?: unknown }).define;
    }
    if ('inject' in options) {
      delete (options as { inject?: unknown }).inject;
    }
    return options;
  },
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
