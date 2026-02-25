/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const path = require('path');
const packageJson = require('../package.json');

const banner = `/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
`;

async function build() {
  const { build: tsdown } = await import('tsdown');

  const reactEntrypoint = path.resolve(__dirname, '..', 'src', 'index.ts');
  const iconsEntrypoint = path.resolve(
    __dirname,
    '..',
    'icons',
    'src',
    'index.ts'
  );
  const packageRoot = path.resolve(__dirname, '..');
  const tsconfigPath = path.resolve(__dirname, '..', 'tsconfig.json');
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
      dts: format.type === 'esm',
      entry: [reactEntrypoint],
      external,
      inlineOnly: false,
      failOnWarn: false,
      format: format.type,
      logLevel: 'warn',
      loader: {
        '.js': 'jsx',
      },
      outDir: path.join(packageRoot, format.directory),
      outputOptions(options) {
        return {
          ...options,
          chunkFileNames: '[name].js',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: path.resolve(__dirname, '..', 'src'),
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

  // Keep declaration parity for both `es` and `lib`.
  await copyDeclarations(
    path.join(packageRoot, 'es'),
    path.join(packageRoot, 'lib')
  );
  await patchCjsIndexDefaultInterop(path.join(packageRoot, 'lib', 'index.js'));

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

async function patchCjsIndexDefaultInterop(filepath) {
  const contents = await fs.readFile(filepath, 'utf8');
  // tsdown can emit `exports.X = require_X;` for some CJS re-exports, which
  // makes React components import as module objects in downstream CJS tests.
  // Normalize to `default || module` so consumers receive the component value.
  const updated = contents.replace(
    /^exports\.(\w+)\s*=\s*(require_\w+);$/gm,
    'exports.$1 = $2.default || $2;'
  );

  if (updated !== contents) {
    await fs.writeFile(filepath, updated);
  }
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
