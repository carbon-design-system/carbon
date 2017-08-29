'use strict';

const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');

module.exports = {
  input: 'src/index.js',
  format: 'iife',
  name: 'CarbonComponents',
  plugins: [
    resolve(),
    commonjs({
      include: 'node_modules/**',
      sourceMap: false,
    }),
    babel({
      exclude: ['node_modules/**'], // only transpile our source code
      plugins: ['external-helpers'],
    }),
  ],
  file: 'scripts/carbon-components.js',
};
