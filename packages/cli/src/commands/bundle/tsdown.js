/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'fs-extra';
import path from 'path';
import { build } from 'tsdown';
import {
  findPackageFolder,
  formatDependenciesIntoGlobals,
  formatGlobals,
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

  const packageJsonPath = path.join(packageFolder, 'package.json');
  const packageJson = await fs.readJson(packageJsonPath);
  const { dependencies = {} } = packageJson;
  const umdGlobals = {
    ...formatDependenciesIntoGlobals(dependencies),
    ...globals,
  };

  for (const { format, directory } of outputFolders) {
    await build({
      clean: false,
      dts: false,
      entry: [entrypoint],
      external: Object.keys(dependencies),
      failOnWarn: false,
      format,
      globalName: format === 'umd' ? name : undefined,
      outDir: directory,
      outputOptions(outputOptions) {
        const options = {
          ...outputOptions,
          entryFileNames: 'index.js',
        };

        if (format === 'umd') {
          return {
            ...options,
            globals: umdGlobals,
            name,
          };
        }

        return options;
      },
      platform: 'browser',
      report: false,
      target: 'es2022',
    });
  }
}
