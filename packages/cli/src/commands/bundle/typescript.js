/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import fs from 'fs-extra';
import path from 'path';
import { rollup } from 'rollup';
import { loadBaseTsCompilerOpts } from 'typescript-config-carbon';
import {
  formatGlobals,
  findPackageFolder,
  formatDependenciesIntoGlobals,
} from './utils.js';

export default async function bundle(entrypoint, options) {
  const globals = options.globals ? formatGlobals(options.globals) : {};
  const { name } = options;
  const packageFolder = await findPackageFolder(entrypoint);

  const outputFolders = [
    {
      format: 'esm',
      directory: path.join(packageFolder, 'es'),
    },
    {
      format: 'cjs',
      directory: path.join(packageFolder, 'lib'),
    },
    {
      format: 'umd',
      directory: path.join(packageFolder, 'umd'),
    },
  ];

  await Promise.all(outputFolders.map(({ directory }) => fs.remove(directory)));

  const jsEntryPoints = outputFolders.map(({ directory, format }) => ({
    outputDir: directory,
    file: path.join(directory, 'index.js'),
    format,
  }));

  const packageJsonPath = path.join(packageFolder, 'package.json');
  const packageJson = await fs.readJson(packageJsonPath);
  const { dependencies = {} } = packageJson;

  const baseTsCompilerOpts = loadBaseTsCompilerOpts();

  await Promise.all(
    jsEntryPoints.map(async ({ outputDir, file, format }) => {
      const bundle = await rollup({
        input: entrypoint,
        external: Object.keys(dependencies),
        plugins: [
          typescript({
            noEmitOnError: true,
            noForceEmit: true,
            outputToFilesystem: false,
            compilerOptions: {
              ...baseTsCompilerOpts,
              rootDir: 'src',
              outDir: outputDir,
            },
          }),
          babel({
            exclude: 'node_modules/**',
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                  targets: {
                    browsers: ['last 1 version', 'ie >= 11', 'Firefox ESR'],
                  },
                },
              ],
              '@babel/preset-typescript',
            ],
            babelHelpers: 'bundled',
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
          }),
          nodeResolve(),
          commonjs({
            include: [/node_modules/],
            extensions: ['.js'],
          }),
        ],
      });
      const outputOptions = {
        exports: 'auto',
        file,
        format,
      };

      if (format === 'umd') {
        outputOptions.name = name;
        outputOptions.globals = {
          ...formatDependenciesIntoGlobals(dependencies),
          ...globals,
        };
      }

      return bundle.write(outputOptions);
    })
  );
}
