// Import rollup plugins
// import html from '@web/rollup-plugin-html';
import path from 'path';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { fileURLToPath } from 'url';
import postcss from 'postcss';
import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import summary from 'rollup-plugin-summary';
import typescript from '@rollup/plugin-typescript';
import esbuild from 'rollup-plugin-esbuild'
import litSCSS from './tools/rollup-plugin-lit-scss.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));


export default {
  input: 'src/index.ts',
  plugins: [
    // Entry point for application build; can specify a glob to build multiple
    // HTML files for non-SPA app
    // html({
    //   input: 'index.html',
    // }),
    alias({
      entries: [{ find: /^(.*)\.scss\?lit$/, replacement: '$1.scss' }],
    }),
    // Resolve bare module specifiers to relative paths
    resolve({
      browser: true,
      mainFields: ['jsnext', 'module', 'main'],
      dedupe: ['carbon-components'],
      extensions: ['.js', '.ts'],
    }),
    commonjs({
      include: [/node_modules/],
      sourceMap: true,
    }),
    litSCSS({
      includePaths: [
        path.resolve(__dirname, '../../../node_modules')
      ],
      async preprocessor(contents, id) {
        return (await postcss([autoprefixer(), cssnano()]).process(contents, { from: id }))
          .css;
      },
    }),
    typescript({ exclude: ['tests'], outDir: 'es'}),
    // // Minify HTML template literals
    // minifyHTML(),
    // Minify JS
    terser({
      ecma: 2021,
      module: true,
      warnings: true,
    }),
    // Print bundle summary
    summary(),
  ],
  output: {
    dir: 'es',
    preserveModules: true,
  },
};