'use strict';

const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');

module.exports = {
  entry: 'src/index.js',
  format: 'iife',
  moduleName: 'CarbonComponents',
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
  dest: 'scripts/carbon-components.js',
};
