/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const path = require('path');
const ts = require('typescript');
const packageJson = require('../package.json');

const banner = `/**
 * Copyright IBM Corp. 2020, ${new Date().getFullYear()}
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
`;

async function build() {
  const { build: tsdown } = await import('tsdown');

  const packageRoot = path.resolve(__dirname, '..');
  const tsconfigPath = path.resolve(__dirname, '..', 'tsconfig.json');
  const declarationTsconfigPath = path.resolve(
    __dirname,
    '..',
    'tsconfig.declarations.json'
  );
  const external = getExternalPatterns();

  const formats = [
    {
      type: 'esm',
      directory: 'es',
    },
    {
      type: 'cjs',
      directory: 'lib',
    },
  ];

  // Build @carbon/ibm-products outputs
  for (const format of formats) {
    await tsdown({
      banner,
      clean: false,
      dts: false,
      entry: ['./src/index.ts'],
      external,
      failOnWarn: false,
      format: format.type,
      logLevel: 'warn',
      loader: {
        '.js': 'jsx',
      },
      outDir: path.join(packageRoot, format.directory),
      unbundle: true,
      outputOptions(options) {
        return {
          ...options,
          chunkFileNames: '[name].js',
          entryFileNames: '[name].js',
        };
      },
      platform: 'browser',
      target: 'es2022',
      tsconfig: tsconfigPath,
    });
  }

  // Patch CJS default exports to fix tsdown interop issue
  console.log('Patching CJS default exports...');
  await patchCjsDefaultInterop(path.join(packageRoot, 'lib'));

  // Generate declarations once to es/ directory
  console.log('Generating TypeScript declarations...');
  await emitDeclarations(declarationTsconfigPath, path.join(packageRoot, 'es'));

  // Copy declarations from es/ to lib/ for CJS parity
  console.log('Copying declarations to lib/...');
  await copyDeclarations(
    path.join(packageRoot, 'es'),
    path.join(packageRoot, 'lib')
  );

  console.log('✅ Build complete!');
}

async function patchCjsDefaultInterop(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await patchCjsDefaultInterop(fullPath);
      continue;
    }

    if (entry.name.endsWith('.js')) {
      let contents = await fs.readFile(fullPath, 'utf8');

      // Normalize to `default || module` so consumers receive the component value.
      // This fixes the issue where `export { default as name }` creates
      // `exports.name = require_module` which becomes `{ default: function }`
      // instead of the function itself when using namespace imports.
      const updated = contents.replace(
        /^(exports\.\w+ = )(require_[\w$]+);$/gm,
        '$1$2.default || $2;'
      );

      if (updated !== contents) {
        await fs.writeFile(fullPath, updated, 'utf8');
      }
    }
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

async function emitDeclarations(tsconfigPath, outDir) {
  const sourceRoot = path.resolve(__dirname, '..', 'src');
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

function getExternalPatterns() {
  const deps = [
    ...Object.keys(packageJson.peerDependencies || {}),
    ...Object.keys(packageJson.dependencies || {}),
  ];

  return deps.map((name) => {
    const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`^${escapedName}(/.*)?`);
  });
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
