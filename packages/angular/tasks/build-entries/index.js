#!/usr/bin/env node
/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  copyFileSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { join } from 'node:path';
import {
  ENTRIES_ROOT,
  PKG_ROOT,
  PREFIX,
  vendorPrefixedCopy,
  verifyVendorImports,
  WC_ROOT,
} from '../vendor.js';

/** Hand-written runtime shipped in the primary entry, e.g. `CdsValueAccessor`. */
const RUNTIME_FILES = ['value-accessor.ts'];

const header = `/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
`;

function writeJson(path, value) {
  writeFileSync(path, JSON.stringify(value, null, 2) + '\n');
}

function main() {
  // Ensure vendor is up to date
  vendorPrefixedCopy();

  // generate-wrappers writes each wrapper into its entry point folder
  // (`.entries/<entry>/<Wrapper>/`). Every folder other than the vendored copy
  // is an entry point.
  /** @type {Map<string, string[]>} entry name -> wrapper directory names */
  const groups = new Map();
  for (const dirent of readdirSync(ENTRIES_ROOT, { withFileTypes: true })) {
    if (
      !dirent.isDirectory() ||
      dirent.name === 'vendor' ||
      dirent.name.startsWith('.')
    ) {
      continue;
    }
    const wrappers = readdirSync(join(ENTRIES_ROOT, dirent.name), {
      withFileTypes: true,
    })
      .filter((wrapper) => wrapper.isDirectory())
      .map((wrapper) => wrapper.name)
      .sort();
    if (wrappers.length > 0) {
      groups.set(dirent.name, wrappers);
    }
  }
  if (groups.size === 0) {
    console.error(
      `Error: No wrappers in ${ENTRIES_ROOT}. Run generate:wrappers.`
    );
    process.exit(1);
  }

  for (const [entry, wrappers] of [...groups].sort()) {
    const entryDir = join(ENTRIES_ROOT, entry);
    writeFileSync(
      join(entryDir, 'index.ts'),
      `${header}\n${wrappers.map((w) => `export * from './${w}';`).join('\n')}\n`
    );
    writeJson(join(entryDir, 'ng-package.json'), {
      lib: { entryFile: 'index.ts' },
    });
  }

  const pkg = JSON.parse(readFileSync(join(PKG_ROOT, 'package.json'), 'utf8'));
  const wcPkg = JSON.parse(readFileSync(join(WC_ROOT, 'package.json'), 'utf8'));

  // The vendored runtime dependencies are `@carbon/angular`'s concern now.
  // `@carbon/layout` and `@carbon/motion` are devDependencies upstream but are
  // imported by `stack` and `side-panel`, so they must be declared here.
  const vendoredDependencies = {
    ...Object.fromEntries(
      Object.entries(wcPkg.dependencies).filter(
        ([name]) => name !== '@carbon/styles' && name !== '@ibm/telemetry-js'
      )
    ),
    '@carbon/layout': wcPkg.devDependencies['@carbon/layout'],
    '@carbon/motion': wcPkg.devDependencies['@carbon/motion'],
  };
  const dependencies = { ...pkg.dependencies, ...vendoredDependencies };

  const { peerDependencies } = pkg;

  const vendorFileCount = verifyVendorImports(
    new Set(Object.keys(dependencies))
  );

  // Primary entry: deliberately side-effect free (ADR 0020 constraint 4). It
  // only exports the shared runtime the wrappers import.
  for (const file of RUNTIME_FILES) {
    copyFileSync(join(PKG_ROOT, 'src/runtime', file), join(ENTRIES_ROOT, file));
  }
  writeFileSync(
    join(ENTRIES_ROOT, 'index.ts'),
    `${header}\n${RUNTIME_FILES.map((file) => `export * from './${file.replace(/\.ts$/, '')}';`).join('\n')}\n`
  );
  writeJson(join(ENTRIES_ROOT, 'ng-package.json'), {
    $schema: '../../../node_modules/ng-packagr/ng-package.schema.json',
    // Publish from `dist`, as `publishConfig.directory` in package.json says.
    dest: '../dist',
    lib: { entryFile: 'index.ts' },
    assets: [{ input: 'vendor', glob: '**/*.js', output: 'vendor' }],
    allowedNonPeerDependencies: Object.keys(vendoredDependencies),
  });

  writeJson(join(ENTRIES_ROOT, 'package.json'), {
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
    license: pkg.license,
    repository: pkg.repository,
    bugs: pkg.bugs,
    keywords: pkg.keywords,
    peerDependencies,
    dependencies,
    // ng-packagr writes `"sideEffects": false` otherwise, and a bundler then
    // drops the barrel import that registers the elements (ADR 0020
    // constraint 1).
    sideEffects: ['./vendor/**/*.js'],
    imports: { '#carbon-ng/*': './vendor/*' },
  });

  // ng-packagr needs a tsconfig next to the build root.
  writeJson(join(ENTRIES_ROOT, 'tsconfig.json'), {
    extends: '../tsconfig.json',
    compilerOptions: {
      rootDir: '.',
      outDir: 'out',
      baseUrl: '.',
      paths: { '#carbon-ng/*': ['./vendor/*'] },
    },
    include: ['**/*.ts'],
    exclude: ['node_modules', 'dist', 'vendor'],
  });

  const count = [...groups.values()].reduce((n, w) => n + w.length, 0);
  console.log(
    `Assembled ${groups.size} secondary entry points (${count} wrappers) and ` +
      `${vendorFileCount} vendored files (${PREFIX}) in .entries/`
  );
}

main();
