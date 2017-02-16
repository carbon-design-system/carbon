const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');

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
  plugins: [
    new webpack.DefinePlugin({
      'process.env.importSASS': true,
    })
  ],
  postcss() {
    return [autoprefixer];
  },
};
