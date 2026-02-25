import { defineConfig } from 'tsdown';

export default defineConfig({
  clean: false,
  dts: false,
  entry: ['src/cli.js'],
  platform: 'node',
  target: 'node14',
  external: ['jscodeshift'],
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
      entryFileNames: 'cli.js',
    };
  },
});
