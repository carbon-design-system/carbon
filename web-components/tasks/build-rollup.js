/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

// const { babel } = require('@rollup/plugin-babel');
import path from 'path';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { fileURLToPath } from 'url';
import postcss from 'postcss';
import alias from '@rollup/plugin-alias';
import { rollup } from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import summary from 'rollup-plugin-summary';
import typescript from '@rollup/plugin-typescript';
import esbuild from 'rollup-plugin-esbuild'
import litSCSS from '../tools/rollup-plugin-lit-scss.js';

import * as packageJson from '../package.json' assert { type: "json" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function build() {
  const entryPoint = {
    filepath: path.resolve(__dirname, '..', 'src', 'index.ts'),
    rootDir: 'src',
    outputDirectory: path.resolve(__dirname, '..'),
  };
  // const iconsEntrypoint = {
  //   filepath: path.resolve(__dirname, '..', 'icons', 'src', 'index.ts'),
  //   rootDir: path.join('icons', 'src'),
  //   outputDirectory: path.resolve(__dirname, '..', 'icons'),
  // };
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

  for (const format of formats) {
    const outputDirectory = path.join(
      entryPoint.outputDirectory,
      format.directory
    );

    const reactInputConfig = getRollupConfig(
      entryPoint.filepath,
      entryPoint.rootDir,
      outputDirectory
    );
    const reactBundle = await rollup(reactInputConfig);

    await reactBundle.write({
      dir: outputDirectory,
      format: format.type,
      preserveModules: true,
      preserveModulesRoot: path.dirname(entryPoint.filepath),
      banner,
      exports: 'named',
    });

    // const iconsInputConfig = getRollupConfig(
    //   iconsEntrypoint.filepath,
    //   iconsEntrypoint.rootDir,
    //   outputDirectory
    // );
    // const iconsBundle = await rollup(iconsInputConfig);

    // // Build @carbon/react icons
    // for (const format of formats) {
    //   await iconsBundle.write({
    //     file:
    //       format.type === 'commonjs' ? 'icons/index.js' : 'icons/index.esm.js',
    //     format: format.type,
    //     banner,
    //     exports: 'named',
    //   });
    // }
  }
}

const banner = `/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
`;

function getRollupConfig(input, rootDir, outDir) {
  console.log('input', input);
  return {
    input,
    output: {
      sourcemap: true,
    },
    // Mark dependencies listed in `package.json` as external so that they are
    // not included in the output bundle.
    external: [
      ...Object.keys(packageJson.default.dependencies),
      ...Object.keys(packageJson.default.devDependencies),
    ].map((name) => {
      // Transform the name of each dependency into a regex so that imports from
      // nested paths are correctly marked as external.
      //
      // Example:
      // import 'module-name';
      // import 'module-name/path/to/nested/module';
      return new RegExp(`^${name}(/.*)?`);
    }),
    plugins: [
      alias({
        entries: [{ find: /^(.*)\.scss\?lit$/, replacement: '$1.scss' }],
      }),
      nodeResolve({
        browser: true,
        mainFields: ['jsnext', 'module', 'main'],
        extensions: ['.js', '.ts'],
      }),
      commonjs({
        include: [/node_modules/],
        sourceMap: true,
      }),
      litSCSS({
        includePaths: [
          path.resolve(__dirname, '../node_modules')
        ],
        async preprocessor(contents, id) {
          return (await postcss([autoprefixer(), cssnano()]).process(contents, { from: id }))
            .css;
        },
      }),
      typescript({
        noEmitOnError: true,
        compilerOptions: {
          rootDir,
          outDir,
        },
        tsconfig: path.resolve(__dirname, '..', 'tsconfig.json'),
        exclude: ['tests','.storybook', '*.stories.ts'],
      }),
    ],
  };
}

build().catch((error) => {
  console.log(error);
  process.exit(1);
});
