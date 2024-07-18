/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import path from 'path';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { fileURLToPath } from 'url';
import postcss from 'postcss';
import alias from '@rollup/plugin-alias';
import { rollup } from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import litSCSS from '../tools/rollup-plugin-lit-scss.js';
import { globby } from 'globby';
import carbonIcons from '../tools/rollup-plugin-icons.js';

import * as packageJson from '../package.json' assert { type: "json" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function build() {

  const inputs = await globby([ 'src/**/*.ts', '!src/**/*.stories.ts', '!src/**/*.d.ts', '!src/globals/internal/storybook-cdn.ts']);

  const iconInput = await globby(['node_modules/@carbon/icons/lib/**/*.js', '!**/index.js']);

  const entryPoint = {
    filepath: inputs,
    rootDir: 'src',
    outputDirectory: path.resolve(__dirname, '..'),
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

   for (const format of formats) {
    const outputDirectory = path.join(
      entryPoint.outputDirectory,
      format.directory
    );

    const cwcInputConfig = getRollupConfig(
      inputs,
      entryPoint.rootDir,
      outputDirectory,
      iconInput
    );

    const cwcBundle = await rollup(cwcInputConfig);

    await cwcBundle.write({
      dir: outputDirectory,
      format: format.type,
      preserveModules: true,
      preserveModulesRoot: 'src',
      banner,
      exports: 'named',
      sourcemap: true
    });
   }
  }



const banner = `/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
`;

function getRollupConfig(input, rootDir, outDir, iconInput) {

  const dependencies = [
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
    },
  );
  return {
    input,
    // Mark dependencies listed in `package.json` as external so that they are
    // not included in the output bundle.
    external: [ ...dependencies, fileURLToPath(
			new URL(
				'../es/icons',
				import.meta.url
			)
		),],
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
      carbonIcons(iconInput),
      typescript({
        noEmitOnError: true,
        compilerOptions: {
          rootDir,
          outDir,
        },
      }),
      {
        name: 'transform-icon-paths',
        generateBundle(options, bundle) {
          for (const [fileName, fileData] of Object.entries(bundle)) {
            if (fileData.type === 'chunk') {
              fileData.code = transformIconPaths(fileName, fileData.code);
            }
          }
        },
      },
    ],
  };
}

function transformIconPaths(filePath, content) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const iconPathRegex = /@carbon\/icons\/lib/g;
  const filenameES = filePath.replace(/[/\\]src[/\\]/, '/es/');
  const iconsDir = path.relative(path.dirname(filenameES), path.resolve(__dirname, '../icons'));
  return content.replace(iconPathRegex,iconsDir);
}

build().catch((error) => {
  console.log(error);
  process.exit(1);
});
