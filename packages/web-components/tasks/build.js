/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import { fileURLToPath } from 'url';
import { globby } from 'globby';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import litSCSS from '../tools/lit-scss-plugin.js';
import path from 'path';
import postcss from 'postcss';
import fs from 'fs-extra';

import * as packageJson from '../package.json' with { type: 'json' };

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const banner = `/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
`;

async function build() {
  const { build: tsdown } = await import('tsdown');
  const packageRoot = path.resolve(__dirname, '..');
  const tsconfigPath = path.resolve(packageRoot, 'tsconfig.json');
  const external = getExternalPatterns();

  const esInputs = await globby([
    'src/**/*.ts',
    '!src/**/*.stories.ts',
    '!src/**/*.d.ts',
    '!src/globals/internal/storybook-cdn.ts',
    '!src/polyfills',
  ]);

  const libInputs = await globby([
    'src/components/**/defs.ts',
    'src/globals/**/*.ts',
    '!src/globals/decorators/**/*.ts',
    '!src/globals/directives/**/*.ts',
    '!src/globals/internal/**/*.ts',
    '!src/globals/mixins/**/*.ts',
  ]);

  const formats = [
    {
      type: 'esm',
      directory: 'es',
      inputs: esInputs,
    },
    {
      type: 'cjs',
      directory: 'lib',
      inputs: libInputs,
    },
  ];

  for (const format of formats) {
    await tsdown({
      banner,
      clean: false,
      dts: true,
      entry: format.inputs.map((input) => path.resolve(packageRoot, input)),
      external,
      failOnWarn: false,
      format: format.type,
      inputOptions: withInputCompatibilityAndPlugins,
      logLevel: 'warn',
      outDir: path.resolve(packageRoot, format.directory),
      outputOptions(options) {
        return {
          ...options,
          // Keep style module filenames aligned with historical rollup output.
          // Without this, tsdown emits collision suffixes like `*2.js` for
          // component files that also have a same-basename `.scss?lit` import.
          chunkFileNames(chunkInfo) {
            const id = chunkInfo.facadeModuleId ?? '';
            if (id.endsWith('.scss') || id.endsWith('.scss?lit')) {
              return '[name].scss.js';
            }
            return '[name].js';
          },
          entryFileNames(chunkInfo) {
            const id = chunkInfo.facadeModuleId ?? '';
            if (id.endsWith('.scss') || id.endsWith('.scss?lit')) {
              return '[name].scss.js';
            }
            return '[name].js';
          },
          exports: 'named',
          preserveModules: true,
          preserveModulesRoot: path.resolve(packageRoot, 'src'),
          sourcemap: true,
        };
      },
      platform: 'browser',
      report: false,
      target: 'es2022',
      tsconfig: tsconfigPath,
    });
  }

  await copyScssSources();
  await postBuild();
}

function withInputCompatibilityAndPlugins(inputOptions) {
  const options = { ...inputOptions };

  options.plugins = [
    ...(options.plugins || []),
    litSCSS({
      includePaths: [
        path.resolve(__dirname, '../node_modules'),
        path.resolve(__dirname, '../../../node_modules'),
      ],
      async preprocessor(contents, id) {
        return (
          await postcss([autoprefixer(), cssnano()]).process(contents, {
            from: id,
          })
        ).css;
      },
    }),
  ];

  return options;
}

function getExternalPatterns() {
  const deps = [
    ...Object.keys(packageJson.default.dependencies),
    ...Object.keys(packageJson.default.devDependencies),
  ];

  return deps.map((name) => {
    const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`^${escapedName}(/.*)?`);
  });
}

async function copyScssSources() {
  const files = await globby(['src/components/**/*.scss']);

  await Promise.all(
    files.map(async (file) => {
      const relative = path.relative('src/components', file);
      const destination = path.resolve(
        __dirname,
        '..',
        'scss',
        'components',
        relative
      );
      await fs.ensureDir(path.dirname(destination));
      await fs.copyFile(path.resolve(__dirname, '..', file), destination);
    })
  );
}

// TODO: remove and add scoped elements!
async function postBuild() {
  const sourceDir = path.resolve(__dirname, '../es');

  if (sourceDir) {
    const targetDir = path.resolve(__dirname, '../es-custom');

    // Copy `es` directory to `es-custom`
    await fs.copy(sourceDir, targetDir);

    // Find all files in the `es-custom` directory
    const files = await globby([`${targetDir}/**/*`], { onlyFiles: true });

    // Replace "cds" with "cds-custom" in all files
    await Promise.all(
      files.map(async (file) => {
        const content = await fs.promises.readFile(file, 'utf8');
        const updatedContent = content.replace(/(?<!--)cds/g, 'cds-custom');
        await fs.promises.writeFile(file, updatedContent);
      })
    );
  }
}

build().catch((error) => {
  console.log(error);
  process.exit(1);
});
