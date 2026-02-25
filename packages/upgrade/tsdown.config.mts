import { defineConfig } from 'tsdown';

export default defineConfig({
  clean: false,
  dts: false,
  entry: ['src/cli.js'],
  inlineOnly: false,
  logLevel: 'warn',
  platform: 'node',
  target: 'node14',
  external: ['jscodeshift'],
  outputOptions(options) {
    return {
      ...options,
      entryFileNames: 'cli.js',
    };
  },
});
