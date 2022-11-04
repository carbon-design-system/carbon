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
const typescript = require('@rollup/plugin-typescript');
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

  // Build @carbon/react formats
  for (const format of formats) {
    const outputDirectory = path.join(
      reactEntrypoint.outputDirectory,
      format.directory
    );

    const reactInputConfig = getRollupConfig(
      reactEntrypoint.filepath,
      outputDirectory,
      true
    );
    const reactBundle = await rollup(reactInputConfig);

    await reactBundle.write({
      dir: outputDirectory,
      format: format.type,
      preserveModules: true,
      preserveModulesRoot: path.dirname(reactEntrypoint.filepath),
      banner,
      exports: 'named',
    });
  }

  const iconsInputConfig = getRollupConfig(iconsEntrypoint.filepath);
  const iconsBundle = await rollup(iconsInputConfig);

  // Build @carbon/react icons
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

// Base babel config for js and ts
const babelConfig = {
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
};

function getRollupConfig(input, outDir, useTS) {
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
      // Modify plugins for builds that require typescript
      ...(useTS ? getTSPlugins(outDir) : getPlugins()),
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

/**
 * Rollup plugins to support typescript compilation/transpilation
 * @param {*} outDir
 * @returns
 */
function getTSPlugins(outDir) {
  return [
    typescript({
      noEmitOnError: true,
      noForceEmit: true,
      outputToFilesystem: false,
      compilerOptions: {
        rootDir: 'src',
        emitDeclarationOnly: true,
        declarationDir: outDir,
      },
    }),
    babel({
      ...babelConfig,
      presets: [...babelConfig.presets, '@babel/preset-typescript'],
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    }),
  ];
}

/**
 * Rollup plugins to support pure JS compilation
 * @returns
 */
function getPlugins() {
  return [babel(babelConfig)];
}

build().catch((error) => {
  console.log(error);
  process.exit(1);
});
