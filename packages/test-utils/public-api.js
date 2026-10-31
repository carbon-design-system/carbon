/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const Arborist = require('@npmcli/arborist');
const fs = require('fs');
const packlist = require('npm-packlist');
const path = require('path');
const sass = require('sass');
const ts = require('typescript');

// Surfaces are flattened into ordered `path: value` lines rather than nested
// objects: Jest sorts object keys when serializing snapshots, which would hide
// changes to export or Sass map order.

/**
 * Returns every runtime export of a module as `path: value` lines. An object
 * reached again through another path (e.g. `themes.white` and `white`) is
 * printed once and referenced afterwards.
 */
function getJsSurface(moduleExports) {
  const lines = [];
  const firstPaths = new Map();

  function visit(value, keyPath) {
    if (typeof value === 'function') {
      lines.push(`${keyPath}: [Function]`);
      return;
    }
    if (value === null || typeof value !== 'object') {
      lines.push(`${keyPath}: ${JSON.stringify(value)}`);
      return;
    }
    if (firstPaths.has(value)) {
      lines.push(
        `${keyPath}: [Same as ${firstPaths.get(value) || '<module>'}]`
      );
      return;
    }
    firstPaths.set(value, keyPath);
    const keys = Object.keys(value);
    if (keys.length === 0) {
      lines.push(`${keyPath}: ${Array.isArray(value) ? '[]' : '{}'}`);
      return;
    }
    for (const key of keys) {
      visit(value[key], keyPath ? `${keyPath}.${key}` : key);
    }
  }

  visit(moduleExports, '');
  return lines;
}

/**
 * Returns the variables (with values), functions, and mixins of a Sass module
 * as lines. Maps are expanded in order; other values use `meta.inspect`.
 * `setup` is Sass that runs before the module is loaded, for modules that
 * must be configured first.
 */
function getSassSurface(url, { loadPaths, setup = '' }) {
  const lines = [];
  sass.compileString(
    `
    @use 'sass:list';
    @use 'sass:meta';
    ${setup}
    @use '${url}' as module;

    @function walk($path, $value) {
      @if meta.type-of($value) == 'map' and list.length($value) > 0 {
        @each $key, $item in $value {
          $_: walk('#{$path}.#{$key}', $item);
        }
      } @else {
        $_: capture('#{$path}: #{meta.inspect($value)}');
      }
      @return null;
    }

    @each $name, $value in meta.module-variables('module') {
      $_: walk('$#{$name}', $value);
    }
    @each $name, $function in meta.module-functions('module') {
      $_: capture('@function #{$name}');
    }
    @each $name, $mixin in meta.module-mixins('module') {
      $_: capture('@mixin #{$name}');
    }
    `,
    {
      loadPaths,
      quietDeps: true,
      functions: {
        'capture($line)': ([line]) => {
          lines.push(line.text);
          return sass.sassNull;
        },
      },
    }
  );
  return lines;
}

const TYPE_FORMAT_FLAGS =
  ts.TypeFormatFlags.NoTruncation |
  ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope;
const MAX_TYPE_DEPTH = 4;

/**
 * Returns the exported declarations of a `.d.ts` entry point as
 * `path: type` lines. Object types are expanded so that a removed or retyped
 * property shows up as its own line; a type reached again is referenced
 * instead of expanded. Unresolvable imports are reported as `error:` lines,
 * since they silently remove exports.
 */
function getTypeSurface(entry) {
  const root = path.dirname(entry);
  const program = ts.createProgram([entry], {
    module: ts.ModuleKind.NodeNext,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
    noEmit: true,
    skipLibCheck: true,
    strict: true,
    types: [],
  });
  const checker = program.getTypeChecker();
  const source = program.getSourceFile(entry);
  const lines = ts.getPreEmitDiagnostics(program, source).map((diagnostic) => {
    const message = ts.flattenDiagnosticMessageText(
      diagnostic.messageText,
      ' '
    );
    return `error: ${message}`;
  });

  const firstPaths = new Map();

  function describeType(type, keyPath, depth) {
    const isExpandable =
      depth < MAX_TYPE_DEPTH &&
      type.flags & ts.TypeFlags.Object &&
      !checker.isArrayType(type) &&
      !checker.isTupleType(type) &&
      type.getCallSignatures().length === 0 &&
      type.getConstructSignatures().length === 0 &&
      type.getProperties().length > 0;

    if (!isExpandable) {
      lines.push(
        `${keyPath}: ${checker.typeToString(type, undefined, TYPE_FORMAT_FLAGS)}`
      );
      return;
    }
    if (firstPaths.has(type)) {
      lines.push(`${keyPath}: [Same as ${firstPaths.get(type)}]`);
      return;
    }
    firstPaths.set(type, keyPath);
    for (const property of type.getProperties()) {
      describeType(
        checker.getTypeOfSymbolAtLocation(property, source),
        `${keyPath}.${property.name}`,
        depth + 1
      );
    }
  }

  const moduleSymbol = checker.getSymbolAtLocation(source);
  for (const exported of checker.getExportsOfModule(moduleSymbol)) {
    const symbol =
      exported.flags & ts.SymbolFlags.Alias
        ? checker.getAliasedSymbol(exported)
        : exported;
    if (symbol.flags & ts.SymbolFlags.Value) {
      describeType(
        checker.getTypeOfSymbolAtLocation(symbol, source),
        exported.name,
        0
      );
    } else {
      const type = checker.getDeclaredTypeOfSymbol(symbol);
      lines.push(
        `type ${exported.name} = ${checker.typeToString(type, undefined, TYPE_FORMAT_FLAGS)}`
      );
    }
  }

  // Keep snapshots machine-independent.
  return lines.map((line) => line.split(root).join('<package>'));
}

/**
 * Returns the files `npm publish` would include, using the same logic as the
 * release tooling.
 */
async function getPublishedFiles(packageDir) {
  const tree = await new Arborist({ path: packageDir }).loadActual();
  const files = await packlist(tree);
  return files.sort();
}

// Values a token pipeline produces when it serializes something it could not
// resolve, e.g. an unsupported `$ref` becoming `[object Object]`.
const SERIALIZATION_ARTIFACT =
  /\[object Object\]|\bNaN\b|[:=] undefined\b|['"]undefined['"]/;

/**
 * Returns `file:line: text` for every line in the given files or directories
 * that contains a serialization artifact. Paths are relative to `root`.
 */
function findSerializationArtifacts(paths, { root = process.cwd() } = {}) {
  const matches = [];
  for (const filepath of paths.flatMap(listFiles)) {
    const lines = fs.readFileSync(filepath, 'utf8').split('\n');
    lines.forEach((line, index) => {
      if (SERIALIZATION_ARTIFACT.test(line)) {
        const file = path.relative(root, filepath);
        matches.push(`${file}:${index + 1}: ${line.trim()}`);
      }
    });
  }
  return matches;
}

function listFiles(filepath) {
  if (!fs.statSync(filepath).isDirectory()) {
    return [filepath];
  }
  return fs
    .readdirSync(filepath)
    .flatMap((entry) => listFiles(path.join(filepath, entry)));
}

/**
 * Snapshots everything a package publishes: runtime exports, type
 * declarations, Sass modules, and the published file list. Requires the
 * package to be built.
 *
 * A source refactor (for example, restructuring design token files) must
 * leave these snapshots unchanged; any diff is a consumer-visible change.
 */
function describePublicApi({ packageDir, sassModules = [], generated = [] }) {
  const packageJson = require(path.join(packageDir, 'package.json'));
  const resolve = (filepath) => path.join(packageDir, filepath);

  describe(`${packageJson.name} public API`, () => {
    test('JavaScript exports', () => {
      const moduleExports = require(resolve(packageJson.main));
      expect(getJsSurface(moduleExports)).toMatchSnapshot();
    });

    test('type declarations', () => {
      expect(getTypeSurface(resolve(packageJson.types))).toMatchSnapshot();
    });

    // Each entry is a module URL, or `{ url, setup }` for a module that must
    // be configured before it can be loaded.
    const modules = sassModules.map((entry) => {
      return typeof entry === 'string' ? { url: entry } : entry;
    });
    test.each(modules)('Sass module $url', ({ url, setup }) => {
      const loadPaths = [packageDir, ...getNodeModulesFolders(packageDir)];
      expect(getSassSurface(url, { loadPaths, setup })).toMatchSnapshot();
    });

    test('published files', async () => {
      expect(await getPublishedFiles(packageDir)).toMatchSnapshot();
    });

    if (generated.length > 0) {
      test('generated files contain no serialization artifacts', () => {
        const paths = generated.map(resolve);
        expect(findSerializationArtifacts(paths, { root: packageDir })).toEqual(
          []
        );
      });
    }
  });
}

function getNodeModulesFolders(directory) {
  const folders = [];
  for (
    let dir = directory;
    dir !== path.dirname(dir);
    dir = path.dirname(dir)
  ) {
    const folder = path.join(dir, 'node_modules');
    if (fs.existsSync(folder)) {
      folders.push(folder);
    }
  }
  return folders;
}

module.exports = {
  describePublicApi,
  findSerializationArtifacts,
  getJsSurface,
  getPublishedFiles,
  getSassSurface,
  getTypeSurface,
};
