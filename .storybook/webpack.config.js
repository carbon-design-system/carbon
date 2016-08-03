const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'postcss', 'sass']
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  postcss: () => {
    return [autoprefixer];
  }
}
