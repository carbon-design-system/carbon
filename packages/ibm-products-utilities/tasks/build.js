/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const path = require('path');
const ts = require('typescript');

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

  // Build @carbon/ibm-products-utilities outputs
  for (const format of formats) {
    await tsdown({
      banner,
      clean: false,
      dts: false,
      entry: ['./src/index.ts'],
      external: [],
      failOnWarn: false,
      format: format.type,
      logLevel: 'warn',
      outDir: path.join(packageRoot, format.directory),
      unbundle: true,
      outputOptions(options) {
        return {
          ...options,
          chunkFileNames: '[name].js',
          entryFileNames: '[name].js',
        };
      },
      platform: 'neutral',
      target: 'es2020',
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

    if (!entry.name.endsWith('.js')) {
      continue;
    }

    let content = await fs.readFile(fullPath, 'utf8');

    // Pattern: module.exports = SomeClass;
    // Replace with: module.exports = SomeClass; module.exports.default = SomeClass;
    const classExportPattern = /^(module\.exports = )([A-Z]\w+);$/gm;
    if (classExportPattern.test(content)) {
      content = content.replace(
        classExportPattern,
        '$1$2;\nmodule.exports.default = $2;'
      );
      await fs.writeFile(fullPath, content, 'utf8');
    }
  }
}

async function emitDeclarations(tsconfigPath, outDir) {
  const configFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
  const parsedConfig = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    path.dirname(tsconfigPath)
  );

  const program = ts.createProgram({
    rootNames: parsedConfig.fileNames,
    options: {
      ...parsedConfig.options,
      outDir,
      declaration: true,
      declarationMap: true,
      emitDeclarationOnly: true,
    },
  });

  const emitResult = program.emit();

  const allDiagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics);

  allDiagnostics.forEach((diagnostic) => {
    if (diagnostic.file) {
      const { line, character } = ts.getLineAndCharacterOfPosition(
        diagnostic.file,
        diagnostic.start
      );
      const message = ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        '\n'
      );
      console.log(
        `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`
      );
    } else {
      console.log(
        ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')
      );
    }
  });

  if (emitResult.emitSkipped) {
    throw new Error('Declaration generation failed');
  }
}

async function copyDeclarations(srcDir, destDir) {
  await fs.ensureDir(destDir);

  const entries = await fs.readdir(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      await copyDeclarations(srcPath, destPath);
    } else if (
      entry.name.endsWith('.d.ts') ||
      entry.name.endsWith('.d.ts.map')
    ) {
      await fs.copy(srcPath, destPath);
    }
  }
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
