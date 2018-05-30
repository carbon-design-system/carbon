'use strict';

const { createTransformer } = require('babel-jest');

// This is a custom Jest transformer that process *.js files
// http://facebook.github.io/jest/docs/tutorial-webpack.html
const babelOptions = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 1 versions', 'Firefox ESR'],
        },
      },
    ],
    ['@babel/preset-stage-1', { decoratorsLegacy: true }],
    '@babel/preset-react',
  ],
  // Adding in here otherwise Jest complains about no plugin for class
  // properties
  plugins: ['@babel/plugin-proposal-class-properties', 'dev-expression'],
};

module.exports = createTransformer(babelOptions);
