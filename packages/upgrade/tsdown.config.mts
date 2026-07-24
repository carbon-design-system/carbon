import { defineConfig } from 'tsdown';

export default defineConfig({
  clean: false,
  dts: false,
  entry: ['src/cli.js'],
  deps: {
    onlyBundle: false,
    neverBundle: ['jscodeshift'],
  },
  logLevel: 'warn',
  platform: 'node',
  target: 'node14',
  outputOptions(options) {
    return {
      ...options,
      entryFileNames: 'cli.js',
    };
  },
});
