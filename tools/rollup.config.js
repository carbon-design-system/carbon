const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');

module.exports = {
  entry: 'src/index.js',
  format: 'iife',
  moduleName: 'CarbonComponents',
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**', // only transpile our source code
    }),
  ],
  dest: 'scripts/carbon-components.js',
};
