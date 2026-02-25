import { defineConfig } from 'tsdown';

export default defineConfig({
  clean: false,
  dts: false,
  entry: ['src/index.ts'],
  target: 'es2020',
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
