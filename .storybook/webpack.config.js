const autoprefixer = require('autoprefixer');
const path = require('path');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'postcss', 'sass'],
      },
    ],
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, '..', 'node_modules')],
  },
  postcss() {
    return [autoprefixer];
  },
};
