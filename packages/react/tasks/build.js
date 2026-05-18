/**
 * Copyright IBM Corp. 2016, 2023
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
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
`;

async function build() {
  const { build: tsdown } = await import('tsdown');

  const reactEntrypoint = path.resolve(__dirname, '..', 'src', 'index.ts');
  // These are not top-level package entrypoints, but they need to stay as
  // concrete files in the published module graph:
  //
  // - `components/ContainedList/index.js` has runtime side effects that set up
  //   the deprecated `ContainedListItem` property.
  // - `internal/deprecateFieldOnObject.js` is imported by that facade and was
  //   also being dropped when tsdown only started from `src/index.ts`.
  //
  // Keeping them in the explicit entry list preserves Rollup-era file parity
  // without turning off tree-shaking for the whole build.
  const reactCompatEntrypoints = [
    path.resolve(
      __dirname,
      '..',
      'src',
      'components',
      'ContainedList',
      'index.ts'
    ),
    path.resolve(
      __dirname,
      '..',
      'src',
      'internal',
      'deprecateFieldOnObject.ts'
    ),
  ];
  const iconsEntrypoint = path.resolve(
    __dirname,
    '..',
    'icons',
    'src',
    'index.ts'
  );
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

  // Build @carbon/react outputs.
  for (const format of formats) {
    await tsdown({
      banner,
      clean: false,
      // `tsdown`/`rolldown-plugin-dts` bundles declarations. `@carbon/react`
      // intentionally publishes a wide `es/` + `lib/` file tree, and consumers
      // deep-import those paths. If we let tsdown own declaration generation we
      // lose many per-file `.d.ts` files. Emit declarations separately below
      // using `tsc`-style APIs so every published JS file can keep a matching
      // type file.
      dts: false,
      entry: [reactEntrypoint, ...reactCompatEntrypoints],
      external,
      inlineOnly: false,
      failOnWarn: false,
      format: format.type,
      logLevel: 'warn',
      loader: {
        '.js': 'jsx',
      },
      outDir: path.join(packageRoot, format.directory),
      // `unbundle` is the tsdown-supported equivalent of the old Rollup
      // `preserveModules` output. It keeps the source module graph so subpath
      // imports like `@carbon/react/es/internal/useEvent` keep working.
      unbundle: true,
      outputOptions(options) {
        return {
          ...options,
          chunkFileNames: '[name].js',
          entryFileNames: '[name].js',
        };
      },
      platform: 'browser',
      report: false,
      // Keep ES2020 for Jest/SSR compatibility; ES2022 can emit static class
      // block syntax that our current Babel/Jest path does not transform.
      target: 'es2020',
      tsconfig: tsconfigPath,
    });
  }

  // Generate the `es/**/*.d.ts` tree from source, then mirror it into `lib/`.
  // This keeps type parity for both ESM and CJS outputs without running two
  // separate declaration emits.
  await emitReactDeclarations(
    declarationTsconfigPath,
    path.join(packageRoot, 'es')
  );

  // Keep declaration parity for both `es` and `lib`.
  await copyDeclarations(
    path.join(packageRoot, 'es'),
    path.join(packageRoot, 'lib')
  );
  await patchCjsDefaultInterop(path.join(packageRoot, 'lib'));

  // Build @carbon/react icons CJS + d.ts.
  await tsdown({
    banner,
    clean: false,
    dts: true,
    entry: [iconsEntrypoint],
    external,
    inlineOnly: false,
    failOnWarn: false,
    format: 'cjs',
    logLevel: 'warn',
    loader: {
      '.js': 'jsx',
    },
    outDir: path.resolve(__dirname, '..', 'icons'),
    outputOptions(options) {
      return {
        ...options,
        chunkFileNames: '[name].js',
        entryFileNames: 'index.js',
      };
    },
    platform: 'browser',
    report: false,
    target: 'es2022',
    tsconfig: tsconfigPath,
  });

  // Build @carbon/react icons ESM.
  await tsdown({
    banner,
    clean: false,
    dts: false,
    entry: [iconsEntrypoint],
    external,
    inlineOnly: false,
    failOnWarn: false,
    format: 'esm',
    logLevel: 'warn',
    loader: {
      '.js': 'jsx',
    },
    outDir: path.resolve(__dirname, '..', 'icons'),
    outputOptions(options) {
      return {
        ...options,
        chunkFileNames: '[name].js',
        entryFileNames: 'index.esm.js',
      };
    },
    platform: 'browser',
    report: false,
    target: 'es2022',
    tsconfig: tsconfigPath,
  });

  await ensureIconsTypes(path.resolve(__dirname, '..', 'icons', 'index.d.ts'));
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

async function ensureIconsTypes(filepath) {
  await fs.ensureFile(filepath);
  await fs.writeFile(
    filepath,
    `${banner}\nexport * from '@carbon/icons-react';\n`
  );
}

async function emitReactDeclarations(tsconfigPath, outDir) {
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
      declarationMap: false,
      emitDeclarationOnly: true,
      noEmit: false,
      noEmitOnError: false,
      outDir,
      // Restrict declaration output to `src/` so imports from Storybook
      // templates do not produce `.d.ts` files under `.storybook/`.
      rootDir: sourceRoot,
      sourceMap: false,
    },
    tsconfigPath
  );
  // The declaration-specific tsconfig owns the publishable input set. Keeping
  // those include/exclude rules in config is easier to maintain than re-
  // implementing TypeScript file selection logic in this build script.
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
    // Some source files currently report type issues during declaration emit,
    // but TypeScript can still write the declaration files we need. Surface the
    // diagnostics so they are visible during builds without making this package
    // fail to publish.
    console.warn(formatDiagnostics(diagnostics));
  }
}

async function patchCjsDefaultInterop(filepath) {
  const stats = await fs.stat(filepath);

  if (stats.isDirectory()) {
    // Walk the entire CJS tree. tsdown can emit the same problematic re-export
    // pattern in nested facades, not just in `lib/index.js`.
    const entries = await fs.readdir(filepath);
    await Promise.all(
      entries.map((entry) => patchCjsDefaultInterop(path.join(filepath, entry)))
    );
    return;
  }

  if (!filepath.endsWith('.js')) {
    return;
  }

  const contents = await fs.readFile(filepath, 'utf8');
  // tsdown can emit `exports.X = require_X;` for some CJS re-exports, which
  // makes React components import as module objects in downstream CJS tests.
  // Normalize to `default || module` so consumers receive the component value.
  const updated = contents.replace(
    /^exports\.(\w+)\s*=\s*(require_[\w$]+);$/gm,
    'exports.$1 = $2.default || $2;'
  );

  if (updated !== contents) {
    await fs.writeFile(filepath, updated);
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
  // In rare cases, dependencies need to be included in the output bundle.
  // This increases bundle size and should be avoided.
  const internals = ['es-toolkit'];
  const deps = [
    ...Object.keys(packageJson.peerDependencies),
    ...Object.keys(packageJson.dependencies).filter(
      (dep) => !internals.includes(dep)
    ),
    ...Object.keys(packageJson.devDependencies),
  ];

  return deps.map((name) => {
    const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`^${escapedName}(/.*)?`);
  });
}

build().catch((error) => {
  console.log(error);
  process.exit(1);
});
