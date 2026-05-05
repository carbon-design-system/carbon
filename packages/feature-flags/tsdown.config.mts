import { defineConfig } from 'tsdown';

const BANNER = `/**
 * Copyright IBM Corp. 2015, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
`;

const sharedConfig = defineConfig({
  banner: BANNER,
  clean: false,
  dts: false,
  entry: ['src/index.js'],
  failOnWarn: false,
  logLevel: 'warn',
  outputOptions(options) {
    return {
      ...options,
      entryFileNames: 'index.js',
    };
  },
  platform: 'browser',
  report: false,
  target: 'es2022',
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
