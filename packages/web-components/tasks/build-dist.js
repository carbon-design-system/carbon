/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import path from 'path';
import { fileURLToPath } from 'url';
import { rollup } from 'rollup';
import autoprefixer from 'autoprefixer';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import cssnano from 'cssnano';
import fs from 'fs';
import postcss from 'postcss';
import replace from '@rollup/plugin-replace';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { promisify } from 'util';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import carbonIcons from '../tools/rollup-plugin-dist-icons.js';
import fixHostPseudo from '../tools/postcss-fix-host-pseudo.js';
import license from '../tools/rollup-plugin-license.js';
import litSCSS from '../tools/rollup-plugin-lit-scss.js';

const readFile = promisify(fs.readFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Gets all of the folders and returns out
 *
 * @param {string} dir Directory to check
 * @returns {string[]} List of folders
 * @private
 */
function _getFolders(dir) {
  return fs
    .readdirSync(dir)
    .filter((file) => fs.statSync(path.join(dir, file)).isDirectory());
}

/**
 * Builds all of the rollup bundles for all components
 *
 * @param {object} [options] The build options.
 * @param {string} [options.mode=development] The build mode.
 */
async function buildDist() {
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
  }

  const folders = _getFolders('src/components');

  for (let i = folders.length - 1; i >= 0; i--) {
    if (!fs.existsSync(`src/components/${folders[i]}/index.ts`)) {
      folders.splice(i, 1);
    }
  }

  // Generate inputs with flat file names
  const inputs = {};
  folders.forEach((folder) => {
    inputs[`${folder}.min`] = `src/components/${folder}/index.ts`;
  });

  return rollup(getRollupConfig({ inputs }))
    .then((bundle) => {
      bundle.write({
        format: 'es',
        dir: 'dist',
        // This ensures output files are named based on input keys
        entryFileNames: '[name].js',
        banner: 'let process = { env: {} };',
      });
    })
    .catch((err) => {
      console.error(err);
    });
}

/**
 * Sets the rollup configuration based on various settings
 *
 * @param {object} [options] The build options.
 * @param {object} [options.inputs] Map input files
 * @returns {object} The Rollup config.
 */
function getRollupConfig({ inputs = {} } = {}) {
  const postCSSPlugins = [fixHostPseudo(), autoprefixer(), cssnano()];

  const licenseOptions = {
    whitelist: /^(carbon-components|@carbon*)$/i,
    async licenseSelf() {
      return readFile(path.resolve(__dirname, '../tools/license.js'), 'utf8');
    },
  };

  return {
    input: inputs,
    plugins: [
      alias({
        entries: [{ find: /^(.*)\.scss\?lit$/, replacement: '$1.scss' }],
      }),
      nodeResolve({
        browser: true,
        mainFields: ['jsnext', 'module', 'main'],
        dedupe: ['carbon-components'],
        extensions: ['.js', '.ts'],
      }),
      commonjs({
        include: [/node_modules/],
        sourceMap: true,
      }),
      carbonIcons(),
      typescript({
        noEmitOnError: true,
        declaration: false,
        compilerOptions: {
          rootDir: 'src',
          outDir: 'dist',
        },
      }),
      litSCSS({
        includePaths: [
          path.resolve(__dirname, '../node_modules'),
          path.resolve(__dirname, '../../../node_modules'),
        ],
        async preprocessor(contents, id) {
          return (await postcss(postCSSPlugins).process(contents, { from: id }))
            .css;
        },
      }),
      replace({
        'process.env.NODE_ENV': 'production',
        preventAssignment: true,
      }),
      terser(),
      license(licenseOptions),
    ],
  };
}

buildDist().catch((error) => {
  console.log(error);
  process.exit(1);
});
