/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'fs-extra';
import path from 'path';
import { build } from 'tsdown';
import ts from 'typescript';
import {
  findPackageFolder,
  formatDependenciesIntoGlobals,
  formatGlobals,
} from './utils.js';

export default async function bundle(entrypoint, options) {
  const globals = options.globals ? formatGlobals(options.globals) : {};
  const { name, dts } = options;
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
      // Emit declarations in a separate pass so we can mirror the same `.d.ts`
      // tree to `es`, `lib`, and `umd`.
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

  if (dts) {
    await emitDeclarations(packageFolder);
    await copyDeclarations(
      path.join(packageFolder, 'es'),
      path.join(packageFolder, 'lib')
    );
    await copyDeclarations(
      path.join(packageFolder, 'es'),
      path.join(packageFolder, 'umd')
    );
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

    if (entry.name.endsWith('.d.ts')) {
      await fs.copy(fromPath, toPath);
    }
  }
}

async function emitDeclarations(packageFolder) {
  const tsconfigPath = ts.findConfigFile(
    packageFolder,
    ts.sys.fileExists,
    'tsconfig.json'
  );

  if (!tsconfigPath) {
    throw new Error(`Unable to find tsconfig.json in ${packageFolder}`);
  }

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
      emitDeclarationOnly: true,
      noEmit: false,
      outDir: path.join(packageFolder, 'es'),
      skipLibCheck: true,
      types: [],
    },
    tsconfigPath
  );

  const testsDirectoryPattern = `${path.sep}__tests__${path.sep}`;
  const rootNames = parsed.fileNames.filter((filename) => {
    return !filename.includes(testsDirectoryPattern);
  });

  const program = ts.createProgram({
    rootNames,
    options: parsed.options,
  });
  const emitResult = program.emit();
  const diagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics || []);

  if (diagnostics.length > 0) {
    throw new Error(formatDiagnostics(diagnostics));
  }
}

function formatDiagnostics(diagnostics) {
  return ts.formatDiagnosticsWithColorAndContext(diagnostics, {
    getCanonicalFileName: (filename) => filename,
    getCurrentDirectory: () => process.cwd(),
    getNewLine: () => ts.sys.newLine,
  });
}
