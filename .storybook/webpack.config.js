const path = require('path');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.json$/,
        loaders: ['json']
      }
    ]
  }
}
