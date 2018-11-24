const { resolve } = require('path');

module.exports = {
  TS: resolve(__dirname, '../ts'),
  LIB: resolve(__dirname, '../lib'),
  UMD: resolve(__dirname, '../umd'),
  WASTE: resolve(__dirname, '../waste'),
  EXAMPLES_LIB: resolve(__dirname, '../examples/storybook/lib'),
  STORIES: resolve(__dirname, '../examples/storybook/stories'),
};
