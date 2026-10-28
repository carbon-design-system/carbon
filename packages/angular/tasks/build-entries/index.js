#!/usr/bin/env node
/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { spawnSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Assembles the secondary-entry-point build root for `@carbon/angular`.
 *
 * ADR 0020 constraint 4: one entry point registers every component barrel it
 * imports, so a single entry point costs a Button-only app about 125 kB.
 * This task regroups the generated wrappers (`src/generated/<Name>/`) into one
 * secondary entry point per `@carbon/web-components` component folder, and
 * vendors the `cds-ng` prefixed copy of the web components they register
 * (ADR 0020 constraints 1 to 3):
 *
 *   .entries/
 *     package.json          derived from the real package.json
 *     ng-package.json       primary entry (side-effect free) + vendor assets
 *     index.ts
 *     vendor/               prefixed, filtered copy of @carbon/web-components
 *     button/               -> @carbon/angular/button
 *       ng-package.json
 *       index.ts
 *       Button/Button.component.ts   selector cds-ng-button
 *     modal/                -> @carbon/angular/modal
 *       ...
 *
 * The grouping key is read from the barrel import each generated wrapper
 * already carries (`@carbon/web-components/es/components/<dir>/...`). Nested
 * barrels (`page-header/page-header-tags-set`, `date-picker/next`) fold into
 * their top-level folder, which is also what the web components barrel does.
 *
 * The generator output in `src/generated/` is not changed: it keeps `cds-*`
 * selectors and the peer `@carbon/web-components` import, which is what the
 * Jest specs and Storybook run against. This task rewrites the copies it
 * places in `.entries/` with the same `cds` -> `cds-ng` rule that
 * `create-prefixed-build` applies to the web components.
 *
 * Requires `packages/web-components/es` to be built.
 *
 * Usage (after `yarn generate:wrappers`):
 *   node tasks/build-entries/index.js
 *   npx ng-packagr -p .entries/ng-package.json
 */

const __dirname = dirname(fileURLToPath(import.meta.url));
const PKG_ROOT = join(__dirname, '../..');
const WC_ROOT = join(PKG_ROOT, '../web-components');
const WC_ES = join(WC_ROOT, 'es');
const GENERATED = join(PKG_ROOT, 'src/generated');
const ENTRIES_ROOT = join(PKG_ROOT, '.entries');
const VENDOR = join(ENTRIES_ROOT, 'vendor');
const PREFIXED_TMP = join(ENTRIES_ROOT, '.prefixed');

const PREFIX = 'cds-ng';

const BARREL_IMPORT =
  /import '@carbon\/web-components\/es\/components\/([^/]+)\/[^']*';/;

/**
 * Directory names never shipped in the vendored copy.
 * - `node_modules`: only holds flatpickr, which only the classic Date Picker
 *   needs (ADR 0021).
 * - stories, tests and story assets: `stories/helpers.js` imports
 *   `storybook/actions` (ADR 0020 constraint 2).
 */
const VENDOR_EXCLUDED_DIRS = new Set([
  'node_modules',
  'stories',
  '__stories__',
  '__tests__',
  '_story-assets',
]);

/**
 * Files inside an excluded directory that non-story code imports at runtime.
 * `page-header/utils.js` imports its overflow handler from `_story-assets`.
 * Paths are relative to the vendor root.
 */
const VENDOR_KEPT_FILES = new Set([
  'components/page-header/_story-assets/overflowHandler.js',
]);

/**
 * Files at the vendor root that are not shipped. `index.js` is the
 * whole-library barrel: it registers every component, including the Date
 * Pickers ADR 0021 drops, and defeats the per-folder entry points.
 */
const VENDOR_EXCLUDED_ROOT_FILES = new Set(['index.js']);

/**
 * Component folders that are not wrapped (ADR 0021). They are the only ones
 * that reach flatpickr.
 */
const VENDOR_EXCLUDED_COMPONENTS = new Set([
  'date-picker',
  'fluid-date-picker',
]);

/**
 * Bare imports that are satisfied without being declared in `dependencies`.
 * Currently empty: all bare imports used by the vendored copy are declared.
 */
const TRANSITIVE_BARE_IMPORTS = new Set();

const header = `/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
`;

/**
 * Applies the same rule as `create-prefixed-build`: every `cds` that is not
 * part of a `--cds` custom property becomes the prefix. Also points the barrel
 * import at the vendored copy (`imports` alias `#carbon-ng/*`).
 */
function toPrefixed(source) {
  return source
    .replace(/@carbon\/web-components\/es\//g, '#carbon-ng/')
    .replace(/(?<!--)cds/g, PREFIX);
}

/** Recursively list files under a directory. */
function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(path));
    else files.push(path);
  }
  return files;
}

function writeJson(path, value) {
  writeFileSync(path, JSON.stringify(value, null, 2) + '\n');
}

/**
 * Builds `.entries/vendor`: a `cds-ng` prefixed copy of `web-components/es`
 * without anything the wrappers cannot use.
 */
function vendorPrefixedCopy() {
  if (!existsSync(join(WC_ES, 'components'))) {
    console.error(
      `Error: ${WC_ES} not found. Build @carbon/web-components first.`
    );
    process.exit(1);
  }

  const result = spawnSync(
    process.execPath,
    [
      join(WC_ROOT, 'bin/create-prefixed-build.js'),
      '--prefix',
      PREFIX,
      '--src',
      WC_ES,
      '--out',
      PREFIXED_TMP,
    ],
    { stdio: 'pipe', encoding: 'utf8' }
  );
  if (result.status !== 0) {
    console.error(result.stderr || result.stdout);
    process.exit(1);
  }

  cpSync(PREFIXED_TMP, VENDOR, {
    recursive: true,
    filter: (source) => {
      const rel = relative(PREFIXED_TMP, source);
      if (!rel) return true;
      if (VENDOR_KEPT_FILES.has(rel)) return true;
      // Keep the directories that lead to a kept file.
      if ([...VENDOR_KEPT_FILES].some((kept) => kept.startsWith(`${rel}/`))) {
        return true;
      }
      if (VENDOR_EXCLUDED_ROOT_FILES.has(rel)) return false;
      const segments = rel.split('/');
      if (segments.some((s) => VENDOR_EXCLUDED_DIRS.has(s))) return false;
      if (
        segments[0] === 'components' &&
        VENDOR_EXCLUDED_COMPONENTS.has(segments[1])
      ) {
        return false;
      }
      if (statSync(source).isDirectory()) return true;
      // Types and maps are not used: wrappers import the vendor tree for its
      // side effects only (ADR 0020 constraint 2 and "Not checked").
      return source.endsWith('.js') && !source.endsWith('.map');
    },
  });
  rmSync(PREFIXED_TMP, { recursive: true, force: true });
}

/**
 * Fails the build if the vendored copy has an import that will not resolve
 * once installed: a missing relative file, or a bare package that
 * `@carbon/angular` does not declare (ADR 0020 constraint 2).
 */
function verifyVendorImports(declaredDependencies) {
  const importPattern = /(?:from|import)\s*["']([^"']+)["']/g;
  const problems = [];
  const files = walk(VENDOR).filter((f) => f.endsWith('.js'));

  for (const file of files) {
    // Ignore imports shown in comments (e.g. JSDoc usage examples).
    const source = readFileSync(file, 'utf8')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/^\s*\/\/.*$/gm, '');
    for (const [, specifier] of source.matchAll(importPattern)) {
      if (specifier.startsWith('.')) {
        if (!existsSync(resolve(dirname(file), specifier))) {
          problems.push(`${relative(VENDOR, file)}: missing ${specifier}`);
        }
        continue;
      }
      const parts = specifier.split('/');
      const packageName = specifier.startsWith('@')
        ? parts.slice(0, 2).join('/')
        : parts[0];
      if (
        !declaredDependencies.has(packageName) &&
        !TRANSITIVE_BARE_IMPORTS.has(packageName)
      ) {
        problems.push(
          `${relative(VENDOR, file)}: undeclared package ${packageName}`
        );
      }
    }
  }

  if (problems.length) {
    console.error(
      `Vendored copy has unresolved imports:\n  ${problems.join('\n  ')}`
    );
    process.exit(1);
  }
  return files.length;
}

function main() {
  if (!existsSync(GENERATED)) {
    console.error(`Error: ${GENERATED} not found. Run generate:wrappers.`);
    process.exit(1);
  }

  rmSync(ENTRIES_ROOT, { recursive: true, force: true });
  mkdirSync(ENTRIES_ROOT, { recursive: true });

  /** @type {Map<string, string[]>} entry name -> wrapper directory names */
  const groups = new Map();

  for (const name of readdirSync(GENERATED, { withFileTypes: true })) {
    if (!name.isDirectory()) continue;
    const source = readFileSync(
      join(GENERATED, name.name, `${name.name}.component.ts`),
      'utf8'
    );
    const match = source.match(BARREL_IMPORT);
    if (!match) {
      throw new Error(`No web components barrel import in ${name.name}`);
    }
    const entry = match[1];
    if (!groups.has(entry)) groups.set(entry, []);
    groups.get(entry).push(name.name);
  }

  vendorPrefixedCopy();

  for (const [entry, wrappers] of [...groups].sort()) {
    const entryDir = join(ENTRIES_ROOT, entry);
    mkdirSync(entryDir, { recursive: true });
    for (const wrapper of wrappers.sort()) {
      const wrapperDir = join(entryDir, wrapper);
      cpSync(join(GENERATED, wrapper), wrapperDir, { recursive: true });
      const componentFile = join(wrapperDir, `${wrapper}.component.ts`);
      writeFileSync(
        componentFile,
        toPrefixed(readFileSync(componentFile, 'utf8'))
      );
    }
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

  // Primary entry: deliberately side-effect free (ADR 0020 constraint 4).
  writeFileSync(join(ENTRIES_ROOT, 'index.ts'), `${header}\nexport {};\n`);
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
