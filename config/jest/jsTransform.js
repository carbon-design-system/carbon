'use strict';

const { createTransformer } = require('babel-jest');

// This is a custom Jest transformer that process *.js files
// http://facebook.github.io/jest/docs/tutorial-webpack.html
const babelOptions = {
  presets: [
    [
      'env',
      {
        targets: {
          browsers: ['last 1 versions', 'Firefox ESR'],
        },
      },
    ],
    'react',
    'stage-1',
  ],
  plugins: ['transform-object-assign'],
};

module.exports = createTransformer(babelOptions);
