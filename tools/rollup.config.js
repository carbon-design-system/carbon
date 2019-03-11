'use strict';

const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const replace = require('rollup-plugin-replace');

module.exports = {
  input: 'src/bundle.js',
  plugins: [
    resolve(),
    commonjs({
      include: ['node_modules/**', 'src/globals/js/settings.js', 'src/globals/js/feature-flags.js'],
      sourceMap: false,
    }),
    babel({
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              browsers: ['last 1 version', 'ie >= 11'],
            },
          },
        ],
      ],
      exclude: ['node_modules/**'], // only transpile our source code
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
};
