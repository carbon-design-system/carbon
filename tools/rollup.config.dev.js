'use strict';

const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const replace = require('rollup-plugin-replace');

module.exports = {
  input: 'demo/index.js',
  format: 'iife',
  name: 'CarbonComponents',
  plugins: [
    {
      load(id) {
        if (id === require.resolve('markdown-it')) {
          return `
            export default class Markdown {
              render() { return '' }
            }
          `;
        }
        return undefined;
      },
    },
    resolve({
      jsnext: true,
      main: true,
    }),
    commonjs({
      include: 'node_modules/**',
      sourceMap: true,
      namedExports: {
        'node_modules/react/index.js': [
          'Children',
          'Component',
          'PureComponent',
          'Fragment',
          'PropTypes',
          'createElement',
          'isValidElement',
        ],
        'node_modules/react-dom/index.js': ['render'],
      },
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  file: 'demo/demo.js',
  sourcemap: 'inline',
};
