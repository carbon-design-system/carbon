const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');

module.exports = {
  entry: 'demo/index.js',
  format: 'iife',
  moduleName: 'CarbonComponents',
  plugins: [
    resolve({
      jsnext: true,
      main: true,
    }),
    commonjs({
      include: 'node_modules/**',
      sourceMap: false,
    }),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
  dest: 'demo/demo.js',
};
