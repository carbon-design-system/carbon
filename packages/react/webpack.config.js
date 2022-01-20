'use strict';

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /packages\/.*\/(es|lib|umd)/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [require.resolve('./scripts/env.js')],
            },
          },
        ],
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
