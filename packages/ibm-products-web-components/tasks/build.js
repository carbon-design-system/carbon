/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fileURLToPath } from 'url';
import { globby } from 'globby';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import fs from 'fs-extra';
import path from 'path';
import postcss from 'postcss';
import ts from 'typescript';
import litSCSS from '../tools/lit-scss-plugin.js';
import * as packageJson from '../package.json' with { type: 'json' };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, '..');

const banner = `/**
 * Copyright IBM Corp. 2020, ${new Date().getFullYear()}
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
`;

// ============================================================================
// MAIN BUILD FUNCTION
// ============================================================================

async function build() {
  const { build: tsdown } = await import('tsdown');
  const tsconfigPath = path.resolve(packageRoot, 'tsconfig.json');
  const external = getExternalPatterns();

  const esInputs = await globby([
    'src/**/*.ts',
    '!src/**/*.stories.ts',
    '!src/**/*.test.ts',
    '!src/**/*.figma.ts',
    '!src/components/**/*-helpers.ts',
    '!src/**/_story-assets/**',
    '!src/**/*.d.ts',
    '!src/polyfills',
  ]);

  const libInputs = await globby([
    'src/components/**/defs.ts',
    'src/globals/**/*.ts',
    '!src/globals/decorators/**/*.ts',
    '!src/globals/directives/**/*.ts',
    '!src/globals/internal/**/*.ts',
    '!src/globals/mixins/**/*.ts',
    '!src/**/*.stories.ts',
    '!src/**/*.test.ts',
    '!src/components/**/*-helpers.ts',
    '!src/**/_story-assets/**',
  ]);

  const formats = [
    {
      type: 'esm',
      directory: 'es',
      inputs: esInputs,
      postBuildHook: true,
    },
    {
      type: 'cjs',
      directory: 'lib',
      inputs: libInputs,
      postBuildHook: false,
    },
  ];

  console.log('🚀 Starting build process...\n');

  for (const format of formats) {
    console.log(
      `📦 Building ${format.type.toUpperCase()} to ${format.directory}/...`
    );

    await tsdown({
      banner,
      clean: false,
      dts: false,
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

    console.log(`✅ ${format.type.toUpperCase()} build succeeded!`);

    if (format.postBuildHook) {
      await postBuild();
    }
  }

  console.log('\n📋 Copying SCSS sources...');
  await copyScssSources();

  console.log('\n� Generating TypeScript declarations...');
  await generateDeclarations();

  console.log('\n✅ Build completed successfully!');
}

// ============================================================================
// PLUGIN CONFIGURATION
// ============================================================================

function withInputCompatibilityAndPlugins(inputOptions) {
  const options = { ...inputOptions };

  options.plugins = [
    ...(options.plugins || []),
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
}

// ============================================================================
// EXTERNAL DEPENDENCIES
// ============================================================================

function getExternalPatterns() {
  const deps = [
    ...Object.keys(
      packageJson.default?.dependencies || packageJson.dependencies || {}
    ),
    ...Object.keys(
      packageJson.default?.devDependencies || packageJson.devDependencies || {}
    ),
  ];

  return deps.map((name) => {
    // Transform the name of each dependency into a regex so that imports from
    // nested paths are correctly marked as external.
    //
    // Example:
    // import 'module-name';
    // import 'module-name/path/to/nested/module';
    return new RegExp(`^${name}(/.*)?`);
  });
}

// ============================================================================
// POST-BUILD PROCESSING
// ============================================================================

async function postBuild() {
  console.log('🔄 Creating es-custom build...');
  const sourceDir = path.resolve(packageRoot, './es');

  if (sourceDir) {
    const targetDir = path.resolve(packageRoot, './es-custom');

    // Copy `es` directory to `es-custom`
    await fs.copy(sourceDir, targetDir);

    // Find all files in the `es-custom` directory
    const files = await globby([`${targetDir}/**/*`], { onlyFiles: true });

    // Replace "cds" with "cds-custom" in all files
    await Promise.all(
      files.map(async (file) => {
        let content = await fs.promises.readFile(file, 'utf8');
        content = content.replace(/cds/g, 'cds-custom');
        content = content.replace(
          /import\s+['"]@carbon\/web-components\/es\/components\/(.*?)['"]/g,
          "import '@carbon/web-components/es-custom/components/$1'"
        );
        await fs.promises.writeFile(file, content);
      })
    );
  }
}

async function copyScssSources() {
  const files = await globby([
    'src/components/**/*.scss',
    '!src/components/**/story-styles.scss',
    '!src/components/**/_story-assets/**',
  ]);

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

// ============================================================================
// TYPESCRIPT DECLARATION GENERATION
// ============================================================================

async function generateDeclarations() {
  const declarationTsconfigPath = path.resolve(
    packageRoot,
    'tsconfig.declarations.json'
  );

  // Generate declarations once to es/ directory
  await emitDeclarations(declarationTsconfigPath, path.join(packageRoot, 'es'));

  // Copy declarations from es/ to lib/ for CJS parity
  await copyDeclarations(
    path.join(packageRoot, 'es'),
    path.join(packageRoot, 'lib')
  );
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
      noEmit: false,
      noEmitOnError: true,
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
    // Surface diagnostics as warnings without failing the build
    console.warn(formatDiagnostics(diagnostics));
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

// ============================================================================
// RUN BUILD
// ============================================================================

build().catch((error) => {
  console.error('\n❌ Build failed:', error);
  process.exit(1);
});
