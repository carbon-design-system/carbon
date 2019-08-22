/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { resolve } = require('path');

module.exports = {
  TS: resolve(__dirname, '../ts'),
  LIB: resolve(__dirname, '../lib'),
  UMD: resolve(__dirname, '../umd'),
  WASTE: resolve(__dirname, '../waste'),
  EXAMPLES_LIB: resolve(__dirname, '../examples/storybook/lib'),
  STORIES: resolve(__dirname, '../examples/storybook/stories'),
  DIST: resolve(__dirname, '../dist'),
  BAZEL_OUT: resolve(__dirname, '../bazel-out'),
  NPM_PACKAGE: resolve(__dirname, '../dist/bin/ts/npm_package'),
  PACKAGE: resolve(__dirname, '../package'),
};
