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
import fs from 'fs-extra';
import litSCSS from '../tools/lit-scss-plugin.js';
import path from 'path';
import postcss from 'postcss';
import { scopedElementsDecoratorStripPlugin } from '../tools/scoped-elements-decorator-strip-plugin.js';
import ts from 'typescript';

import * as packageJson from '../package.json' with { type: 'json' };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, '..');

const banner = `/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
`;

async function build() {
  const { build: tsdown } = await import('tsdown');
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
      type: 'esm',
      directory: 'scoped-elements',
      inputs: esInputs,
      scopedElements: true,
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
      // use tsc for declaration emit instead of tsdown's dts plugin.
      // tsdown/rolldown-plugin-dts does not correctly handle mixin patterns
      // (e.g. HostListenerMixin) — it strips the generic base class type,
      // breaking downstream consumers
      dts: false,
      entry: format.inputs.map((input) => path.resolve(packageRoot, input)),
      external,
      failOnWarn: false,
      format: format.type,
      inputOptions: withInputCompatibilityAndPlugins({
        scopedElements: !!format.scopedElements,
      }),
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
  await generateDeclarations();
  await postBuild();
}

function withInputCompatibilityAndPlugins({ scopedElements }) {
  return (inputOptions) => {
    const options = { ...inputOptions };

    options.plugins = [
      ...(options.plugins || []),
      ...(scopedElements ? [scopedElementsDecoratorStripPlugin()] : []),
      litSCSS({
        includePaths: [
          path.resolve(packageRoot, './node_modules'),
          path.resolve(packageRoot, '../../node_modules'),
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
  };
}

function getExternalPatterns() {
  const deps = [
    ...Object.keys(packageJson.default.dependencies),
    ...Object.keys(packageJson.default.devDependencies),
  ];

  // Filter out flatpickr so it gets bundled with the patched version
  const filteredDeps = deps.filter((name) => name !== 'flatpickr');

  return filteredDeps.map((name) => {
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
        packageRoot,
        'scss',
        'components',
        relative
      );
      await fs.ensureDir(path.dirname(destination));
      await fs.copyFile(path.resolve(packageRoot, file), destination);
    })
  );
}

// TODO: remove and add scoped elements!
async function postBuild() {
  const sourceDir = path.resolve(packageRoot, 'es');

  if (sourceDir) {
    const targetDir = path.resolve(packageRoot, 'es-custom');

    // copy `es` directory to `es-custom`
    await fs.copy(sourceDir, targetDir);

    // find all files in the `es-custom` directory
    const files = await globby([`${targetDir}/**/*`], { onlyFiles: true });

    // replace "cds" with "cds-custom" in all files
    await Promise.all(
      files.map(async (file) => {
        const content = await fs.promises.readFile(file, 'utf8');
        const updatedContent = content.replace(/(?<!--)cds/g, 'cds-custom');
        await fs.promises.writeFile(file, updatedContent);
      })
    );
  }
}

async function generateDeclarations() {
  const declarationTsconfigPath = path.resolve(
    packageRoot,
    'tsconfig.declarations.json'
  );

  await emitDeclarations(declarationTsconfigPath, path.join(packageRoot, 'es'));

  await copyDeclarations(
    path.join(packageRoot, 'es'),
    path.join(packageRoot, 'lib')
  );
  await copyDeclarations(
    path.join(packageRoot, 'es'),
    path.join(packageRoot, 'scoped-elements')
  );
}

async function emitDeclarations(tsconfigPath, outDir) {
  const sourceRoot = path.resolve(packageRoot, 'src');
  const configFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile);

  if (configFile.error) {
    throw new Error(formatDiagnostics([configFile.error]));
  }

  const parsed = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    path.dirname(tsconfigPath),
    {
      declaration: true,
      declarationMap: true,
      emitDeclarationOnly: true,
      inlineSources: false,
      noEmit: false,
      noEmitOnError: false,
      outDir,
      rootDir: sourceRoot,
      sourceMap: false,
    },
    tsconfigPath
  );

  const rootNames = parsed.fileNames;
  const program = ts.createProgram({
    options: parsed.options,
    rootNames,
  });
  const emitResult = program.emit();
  const diagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics);

  if (emitResult.emitSkipped) {
    throw new Error(formatDiagnostics(diagnostics));
  }

  if (diagnostics.length > 0) {
    console.warn(formatDiagnostics(diagnostics));
  }
}

async function copyDeclarations(fromDir, toDir) {
  const entries = await fs.readdir(fromDir, { withFileTypes: true });

  for (const entry of entries) {
    const fromPath = path.join(fromDir, entry.name);
    const toPath = path.join(toDir, entry.name);

    if (entry.isDirectory()) {
      await fs.ensureDir(toPath);
      await copyDeclarations(fromPath, toPath);
      continue;
    }

    if (entry.name.endsWith('.d.ts') || entry.name.endsWith('.d.ts.map')) {
      await fs.copy(fromPath, toPath);
    }
  }
}

function formatDiagnostics(diagnostics) {
  return ts.formatDiagnosticsWithColorAndContext(diagnostics, {
    getCanonicalFileName(filepath) {
      return filepath;
    },
    getCurrentDirectory() {
      return process.cwd();
    },
    getNewLine() {
      return '\n';
    },
  });
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
