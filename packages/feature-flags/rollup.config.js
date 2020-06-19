/**
 * Copyright IBM Corp. 2015, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import path from 'path';

const baseConfig = {
  external: [],
  plugins: [],
};

export default [
  {
    input: path.join(__dirname, './src/index.js'),
    output: {
      file: 'es/index.js',
      format: 'esm',
    },
  },
  {
    input: path.join(__dirname, './src/index.js'),
    output: {
      file: 'lib/index.js',
      format: 'commonjs',
    },
  },
];
