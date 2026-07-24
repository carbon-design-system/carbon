import { defineConfig } from 'tsdown';

export default defineConfig({
  clean: false,
  deps: {
    neverBundle: ['jscodeshift'],
    onlyBundle: false,
  },
  dts: false,
  entry: ['src/cli.js'],
  failOnWarn: true,
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
