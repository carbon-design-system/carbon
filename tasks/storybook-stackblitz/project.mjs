/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Framework-agnostic pieces of a generated StackBlitz project: resolving and
// copying the files a story uses, rewriting their imports, and small helpers.

import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import * as prettier from 'prettier';
import {
  analyzeCsf,
  extractStory,
  metaTitle,
  parseModule,
  statementText,
  ts,
} from './csf.mjs';

const prettierConfig = createRequire(import.meta.url)('prettier-config-carbon');

// a style or asset specifier, with an optional `?query` (e.g. `?lit`)
export const STYLE_OR_ASSET =
  /\.(s?css|svg|png|jpe?g|gif|webp|mp4|json)(\?.*)?$/;

export const posix = (p) => p.split(path.sep).join('/');

export const packageNameOf = (specifier) =>
  specifier.startsWith('@')
    ? specifier.split('/').slice(0, 2).join('/')
    : specifier.split('/')[0];

const isFile = (candidate) =>
  fs.existsSync(candidate) && fs.statSync(candidate).isFile();

// Source file a relative module specifier resolves to, or null.
export function resolveSource(fromFile, specifier) {
  const base = path.resolve(path.dirname(fromFile), specifier);
  // TS ESM specifiers name the emitted `.js`; the source next to it is `.ts`
  const stem = base.replace(/\.m?js$/, '');
  const extensions = ['.ts', '.tsx', '.js', '.jsx'];
  for (const candidate of [
    ...extensions.map((ext) => `${stem}${ext}`),
    base,
    ...extensions.map((ext) => path.join(base, `index${ext}`)),
  ]) {
    if (isFile(candidate)) {
      return candidate;
    }
  }
  return null;
}

// Sass partial a relative `@use`/`@import` resolves to, or null.
export function resolveStyle(fromFile, specifier) {
  const base = path.resolve(path.dirname(fromFile), specifier);
  const dir = path.dirname(base);
  const name = path.basename(base);
  for (const candidate of [
    base,
    `${base}.scss`,
    path.join(dir, `_${name}.scss`),
    path.join(dir, `_${name}`),
    path.join(base, '_index.scss'),
    path.join(base, 'index.scss'),
  ]) {
    if (isFile(candidate)) {
      return candidate;
    }
  }
  return null;
}

/**
 * Value bindings of an import clause, as `{ kind, imported, local }` with
 * `kind` 'default' | 'namespace' | 'named'. `keep(local)` filters them.
 */
export function importBindings(clause, keep = () => true) {
  if (!clause || clause.isTypeOnly) {
    return [];
  }
  const bindings = [];
  if (clause.name && keep(clause.name.text)) {
    const local = clause.name.text;
    bindings.push({ kind: 'default', imported: 'default', local });
  }
  const named = clause.namedBindings;
  if (named && ts.isNamespaceImport(named)) {
    if (keep(named.name.text)) {
      bindings.push({
        kind: 'namespace',
        imported: '*',
        local: named.name.text,
      });
    }
  } else if (named) {
    for (const element of named.elements) {
      if (element.isTypeOnly || !keep(element.name.text)) {
        continue;
      }
      bindings.push({
        kind: 'named',
        imported: (element.propertyName ?? element.name).text,
        local: element.name.text,
      });
    }
  }
  return bindings;
}

// `import` clause text for `bindings` (default, namespace, then named).
export function importClauseText(bindings) {
  const parts = [];
  const def = bindings.find((b) => b.kind === 'default');
  const ns = bindings.find((b) => b.kind === 'namespace');
  const named = bindings.filter((b) => b.kind === 'named');
  if (def) {
    parts.push(def.local);
  }
  if (ns) {
    parts.push(`* as ${ns.local}`);
  }
  if (named.length) {
    parts.push(
      `{ ${named
        .map((b) =>
          b.imported === b.local ? b.local : `${b.imported} as ${b.local}`
        )
        .join(', ')} }`
    );
  }
  return parts.join(', ');
}

/**
 * Collects project files, copying story-only files as they're referenced and
 * rewriting module specifiers.
 *
 * - `packageRoot`: copied files keep their path relative to it
 * - `publishedSpecifier(file)`: how the project imports a published source
 *   module, or null to copy the file instead
 * - `shimFile`: project path that Storybook APIs resolve to
 * - `stripExtension`: dropped from relative specifiers to copied files
 */
export class ProjectBuilder {
  constructor({
    packageRoot,
    publishedSpecifier,
    shimFile,
    packages = [],
    storyFilesDir = 'src/story-files',
    stripExtension = /\.ts$/,
  }) {
    this.packageRoot = packageRoot;
    this.publishedSpecifier = publishedSpecifier;
    this.shimFile = shimFile;
    this.storyFilesDir = storyFilesDir;
    this.stripExtension = stripExtension;
    this.files = new Map(); // project path -> contents
    this.packages = new Set(packages);
    this.usesShim = false;
    this.usesLitCss = false;
  }

  // project path of a copied file
  vendoredPath(file) {
    return `${this.storyFilesDir}/${posix(path.relative(this.packageRoot, file))}`;
  }

  relativeSpecifier(fromProjectPath, toProjectPath) {
    let rel = posix(
      path.posix.relative(path.posix.dirname(fromProjectPath), toProjectPath)
    );
    if (!rel.startsWith('.')) {
      rel = `./${rel}`;
    }
    return rel.replace(this.stripExtension, '');
  }

  // new specifier for `specifier`, imported from `fromFile`
  rewrite(specifier, fromFile, fromProjectPath) {
    const [bare, query = ''] = specifier.split('?');
    if (/^(storybook|@storybook)\//.test(bare)) {
      this.usesShim = true;
      return this.relativeSpecifier(fromProjectPath, this.shimFile);
    }
    if (!bare.startsWith('.')) {
      this.packages.add(packageNameOf(bare));
      return specifier;
    }
    if (query === 'lit') {
      this.usesLitCss = true;
    }
    if (STYLE_OR_ASSET.test(bare)) {
      const file = path.resolve(path.dirname(fromFile), bare);
      this.copy(file);
      const target = this.relativeSpecifier(
        fromProjectPath,
        this.vendoredPath(file)
      );
      return query ? `${target}?${query}` : target;
    }
    const file = resolveSource(fromFile, bare);
    if (!file) {
      return specifier;
    }
    const published = this.publishedSpecifier(file);
    if (published) {
      this.packages.add(packageNameOf(published));
      return published;
    }
    this.copy(file);
    return this.relativeSpecifier(fromProjectPath, this.vendoredPath(file));
  }

  // copy a story-only file into the project; rewrite what it imports
  copy(file) {
    const target = this.vendoredPath(file);
    if (this.files.has(target) || !fs.existsSync(file)) {
      return;
    }
    const text = fs.readFileSync(file, 'utf8');
    this.files.set(target, text); // placeholder, guards against cycles
    if (/\.s[ac]ss$/.test(file)) {
      this.files.set(target, this.rewriteStyle(text, file));
    } else if (/\.[jt]sx?$/.test(file)) {
      this.files.set(target, this.rewriteModule(text, file, target));
    }
  }

  rewriteStyle(text, file) {
    // relative partials
    for (const match of text.matchAll(
      /@(?:use|forward|import)\s+['"](\.[^'"]+)['"]/g
    )) {
      const partial = resolveStyle(file, match[1]);
      if (partial) {
        this.copy(partial);
      }
    }
    return text;
  }

  /**
   * Replacement for a whole import statement of a copied module, or undefined
   * to only rewrite its specifier. Frameworks override this.
   */
  importStatement() {
    return undefined;
  }

  rewriteModule(text, file, projectPath) {
    const sourceFile = parseModule(file, text);
    const edits = [];
    for (const statement of sourceFile.statements) {
      const isImport = ts.isImportDeclaration(statement);
      const isReExport =
        ts.isExportDeclaration(statement) && statement.moduleSpecifier;
      if (!isImport && !isReExport) {
        continue;
      }
      if (isImport && statement.importClause?.isTypeOnly) {
        edits.push([statement.getStart(sourceFile), statement.getEnd(), '']);
        continue;
      }
      const replacement = isImport
        ? this.importStatement(sourceFile, statement, null, file, projectPath)
        : undefined;
      if (replacement !== undefined) {
        edits.push([
          statement.getStart(sourceFile),
          statement.getEnd(),
          replacement ?? '',
        ]);
        continue;
      }
      const specifier = statement.moduleSpecifier;
      const next = this.rewrite(specifier.text, file, projectPath);
      if (next !== specifier.text) {
        edits.push([
          specifier.getStart(sourceFile) + 1,
          specifier.getEnd() - 1,
          next,
        ]);
      }
    }
    let out = text;
    for (const [start, end, replacement] of edits.sort((a, b) => b[0] - a[0])) {
      out = out.slice(0, start) + replacement + out.slice(end);
    }
    return out;
  }

  // `import` line for an extracted story import
  importLine(sourceFile, { declaration, names }, file, projectPath) {
    const replacement = this.importStatement(
      sourceFile,
      declaration,
      names,
      file,
      projectPath
    );
    if (replacement !== undefined) {
      return replacement;
    }
    const specifier = this.rewrite(
      declaration.moduleSpecifier.text,
      file,
      projectPath
    );
    const clause = declaration.importClause;
    if (!clause) {
      return `import '${specifier}';`;
    }
    const bindings = importBindings(clause, (local) => names.has(local));
    return bindings.length
      ? `import ${importClauseText(bindings)} from '${specifier}';`
      : null;
  }
}

// A name not already bound at the top level of the generated module.
export function freeName(preferred, taken) {
  if (!taken.has(preferred)) {
    return preferred;
  }
  const prefixed = `story${preferred[0].toUpperCase()}${preferred.slice(1)}`;
  if (!taken.has(prefixed)) {
    return prefixed;
  }
  let i = 2;
  while (taken.has(`${preferred}${i}`)) {
    i++;
  }
  return `${preferred}${i}`;
}

export const kebab = (s) =>
  s
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();

// `{ name, version }` of the package at `root`.
export function packageInfo(root) {
  const { name, version } = JSON.parse(
    fs.readFileSync(path.join(root, 'package.json'), 'utf8')
  );
  return { name, version };
}

export const format = (code, parser = 'typescript') =>
  prettier.format(code, { ...prettierConfig, parser });

export function packageJson(name, { dependencies, devDependencies }) {
  const sort = (o) => Object.fromEntries(Object.entries(o).sort());
  return `${JSON.stringify(
    {
      name,
      private: true,
      type: 'module',
      scripts: { dev: 'vite', build: 'vite build' },
      dependencies: sort(dependencies),
      devDependencies: sort(devDependencies),
    },
    null,
    2
  )}\n`;
}

// Files under `dir` (skipping `node_modules`) that match `predicate`.
export function listFiles(dir, predicate) {
  const out = [];
  const walk = (current) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== 'node_modules') {
          walk(full);
        }
      } else if (predicate(full)) {
        out.push(full);
      }
    }
  };
  walk(dir);
  return out.sort();
}

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const namedImport = (specifier, type = false) =>
  new RegExp(
    `^import ${type ? 'type ' : ''}\\{ (.+) \\} from '${escapeRegExp(specifier)}';$`
  );

/**
 * Add `binding` to the `import { ... } from specifier` line in `lines`, or
 * add that line (at the top with `prepend`).
 */
export function addNamedImport(lines, specifier, binding, { prepend } = {}) {
  const pattern = namedImport(specifier);
  const index = lines.findIndex((line) => pattern.test(line));
  if (index >= 0) {
    lines[index] = lines[index].replace(
      /\{ (.+) \}/,
      (_, names) => `{ ${names}, ${binding} }`
    );
  } else {
    const line = `import { ${binding} } from '${specifier}';`;
    if (prepend) {
      lines.unshift(line);
    } else {
      lines.push(line);
    }
  }
}

// Merge every `import { ... } from specifier` line (and every `import type`
// one) into one, at the first one's place: separate story imports can
// resolve to the same package names.
export function mergeNamedImports(imports, specifier) {
  const patterns = {
    value: namedImport(specifier),
    type: namedImport(specifier, true),
  };
  const merged = { value: new Set(), type: new Set() };
  const out = [];
  for (const line of imports.flatMap((entry) => entry.split('\n'))) {
    const kind = Object.keys(patterns).find((k) => patterns[k].test(line));
    if (!kind) {
      out.push(line);
      continue;
    }
    if (!merged[kind].size) {
      out.push(kind);
    } // placeholder for the merged line
    for (const name of line.match(patterns[kind])[1].split(/,\s*/)) {
      merged[kind].add(name);
    }
  }
  return out.map((line) =>
    line === 'value' || line === 'type'
      ? `import ${line === 'type' ? 'type ' : ''}{ ${[...merged[line]].join(', ')} } from '${specifier}';`
      : line
  );
}

// Wrap an expression in parens unless it's a plain (member) name.
const parenthesize = (expression) =>
  /^[\w$.]+$/.test(expression) ? expression : `(${expression})`;

/**
 * Generate a project per story in a stories module. The framework supplies:
 * - `storyModule`: project path of the story module
 * - `keep`: Storybook keys the framework renders with (see `extractStory`)
 * - `newBuilder()`: a `ProjectBuilder`
 * - `castAny`, `metaRender`: see `storyCode()`
 * - `project(context)`: the project for one story, from
 *   `{ name, componentName, extracted, builder, imports, pick, story }`.
 *   `pick(name)`
 *   reserves a free top-level name; `story()` returns `storyCode()`'s result
 *   (call it after picking any names that should win over `meta`/`args`)
 */
export async function generateStoryProjects(
  file,
  { storyModule, keep, newBuilder, castAny, metaRender, project }
) {
  const sourceFile = parseModule(file);
  const csf = analyzeCsf(sourceFile);
  const title = metaTitle(sourceFile, csf.meta) ?? path.basename(file);
  const componentName = title.split('/').pop();
  const projects = {};
  for (const { name } of csf.stories) {
    const extracted = extractStory(sourceFile, csf, name, { keep });
    const builder = newBuilder();
    const imports = extracted.imports
      .map((entry) => builder.importLine(sourceFile, entry, file, storyModule))
      .filter(Boolean);
    const taken = new Set(extracted.topLevelNames);
    taken.add(name);
    const pick = (preferred) => {
      const chosen = freeName(preferred, taken);
      taken.add(chosen);
      return chosen;
    };
    projects[name] = await project({
      name,
      componentName,
      extracted,
      builder,
      imports,
      pick,
      story: () =>
        storyCode(sourceFile, extracted, name, pick, { castAny, metaRender }),
    });
  }
  return projects;
}

/**
 * The story's code: referenced declarations, the meta and story objects, and
 * the args it renders with (Storybook's `argTypes.mapping` applied).
 * Returns `{ body, argsName, renderFn }`; `renderFn` is an expression for the
 * story's render function. `metaRender(metaName)` is how the meta renders;
 * `castAny` adds the TS casts the mapping loop needs.
 */
function storyCode(sourceFile, extracted, name, pick, { castAny, metaRender }) {
  const metaName = pick('meta');
  const argsName = pick('args');
  const body = [];
  const declarations = extracted.declarations.map((s) =>
    statementText(sourceFile, s)
  );
  if (declarations.length) {
    body.push(declarations.join('\n\n'));
  }
  if (extracted.meta) {
    body.push(`const ${metaName} = ${extracted.meta};`);
  }
  body.push(`const ${name} = ${extracted.story};`);

  const argSources = [
    extracted.meta ? `...${metaName}.args` : null,
    `...${name}.args`,
  ].filter(Boolean);
  let args = `const ${argsName} = { ${argSources.join(', ')} };`;
  if (extracted.usesArgTypesMapping) {
    const cast = (expression) =>
      castAny ? `(${expression} as any)` : expression;
    const lookup = [
      `${cast(`${name}.argTypes`)}?.[key]?.mapping`,
      extracted.meta ? `${cast(`${metaName}.argTypes`)}?.[key]?.mapping` : null,
    ]
      .filter(Boolean)
      .join(' ??\n    ');
    args += `

// Storybook maps some control values (e.g. an icon name) to the value the
// story renders with; apply the same mapping here.
for (const [key, value] of Object.entries(${argsName})) {
  const mapping =
    ${lookup};
  if (
    mapping &&
    (typeof value === 'string' || typeof value === 'number') &&
    value in mapping
  ) {
    ${cast(argsName)}[key] = mapping[value];
  }
}`;
  }
  body.push(args);

  const meta = extracted.meta ? metaRender(metaName) : null;
  const renderFn = {
    story: `${name}.render`,
    meta: meta && parenthesize(meta),
    either: `(${name}.render ?? ${meta})`,
  }[extracted.renderFrom];
  return { body, argsName, renderFn };
}
