/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { babel } = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const path = require('path');
const { rollup } = require('rollup');
const stripBanner = require('rollup-plugin-strip-banner');
const packageJson = require('../package.json');

async function build() {
  const reactEntrypoint = {
    filepath: path.resolve(__dirname, '..', 'src', 'index.js'),
    outputDirectory: path.resolve(__dirname, '..'),
  };
  const iconsEntrypoint = {
    filepath: path.resolve(__dirname, '..', 'icons', 'src', 'index.js'),
    outputDirectory: path.resolve(__dirname, '..', 'icons'),
  };
  const formats = [
    {
      type: 'esm',
      directory: 'es',
    },
    {
      type: 'commonjs',
      directory: 'lib',
    },
  ];

  const reactInputConfig = getRollupConfig(reactEntrypoint.filepath);
  const reactBundle = await rollup(reactInputConfig);

  for (const format of formats) {
    await reactBundle.write({
      dir: path.join(reactEntrypoint.outputDirectory, format.directory),
      format: format.type,
      preserveModules: true,
      preserveModulesRoot: path.dirname(reactEntrypoint.filepath),
      banner,
      exports: 'named',
    });
  }

  const iconsInputConfig = getRollupConfig(iconsEntrypoint.filepath);
  const iconsBundle = await rollup(iconsInputConfig);
  for (const format of formats) {
    await iconsBundle.write({
      file:
        format.type === 'commonjs' ? 'icons/index.js' : 'icons/index.esm.js',
      format: format.type,
      banner,
      exports: 'named',
    });
  }
}

const banner = `/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
`;

function getRollupConfig(input) {
  return {
    input,
    external: [
      ...Object.keys(packageJson.peerDependencies),
      ...Object.keys(packageJson.dependencies),
      ...Object.keys(packageJson.devDependencies),
    ],
    plugins: [
      nodeResolve(),
      commonjs({
        include: /node_modules/,
      }),
      babel({
        babelrc: false,
        exclude: ['node_modules/**'],
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false,
              targets: {
                browsers: ['extends browserslist-config-carbon'],
              },
            },
          ],
          '@babel/preset-react',
        ],
        plugins: [
          'dev-expression',
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-proposal-export-namespace-from',
          '@babel/plugin-proposal-export-default-from',
          '@babel/plugin-transform-react-constant-elements',
        ],
        babelHelpers: 'bundled',
      }),
      stripBanner(),
      {
        transform(_code, id) {
          // Make sure to mark feature-flags.js as having side-effects to make
          // sure it gets included in the final bundle
          if (id === path.join(__dirname, '..', 'src', 'feature-flags.js')) {
            return {
              moduleSideEffects: true,
            };
          }
        },
      },
    ],
  };
}

build().catch((error) => {
  console.log(error);
  process.exit(1);
});
