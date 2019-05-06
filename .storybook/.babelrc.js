'use strict';

const path = require('path');
const packageJson = require('../package.json');

const root = path.resolve(__dirname, '../');
const babelConfig = Object.keys(packageJson.babel).reduce((acc, key) => {
  const options = packageJson.babel[key].map(option => {
    // If the preset/plugin is not a relative path, we can use it directly
    if (option[0] !== '.') {
      return option;
    }
    // Otherwise, resolve the full path for storybook to work as intended
    return path.resolve(root, option);
  });

  return {
    ...acc,
    [key]: options,
  };
}, {});

babelConfig.plugins.push('transform-inline-environment-variables');

module.exports = babelConfig;
