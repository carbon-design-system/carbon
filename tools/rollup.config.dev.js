'use strict';

const path = require('path');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const replace = require('rollup-plugin-replace');

module.exports = {
  input: 'demo/index.js',
  plugins: [
    {
      load(id) {
        if (id === require.resolve('markdown-it')) {
          return `
            function Markdown() {}
            Markdown.prototype = {
              render() { return '' }
            };
            export default Markdown;
          `;
        }
        if (id === path.resolve(__dirname, '../src/globals/js/feature-flags.js')) {
          return `
            export * from ${JSON.stringify('../../../demo/feature-flags')};
            export { default } from ${JSON.stringify('../../../demo/feature-flags')};
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
      include: ['node_modules/**', 'src/globals/js/settings.js', 'demo/feature-flags.js'],
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
      exclude: ['node_modules/**'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
};
