/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Framework-agnostic pieces of a generated StackBlitz project: resolving and
 * copying the files a story uses, rewriting their imports, and small helpers.
 */

import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import * as prettier from 'prettier';
import { analyzeCsf, parseModule, ts } from './csf.mjs';

const prettierConfig = createRequire(import.meta.url)('prettier-config-carbon');

export const STYLE_OR_ASSET = /\.(s?css|svg|png|jpe?g|gif|webp|mp4|json)$/;

export const posix = (p) => p.split(path.sep).join('/');

export const packageNameOf = (specifier) =>
  specifier.startsWith('@')
    ? specifier.split('/').slice(0, 2).join('/')
    : specifier.split('/')[0];

const isFile = (candidate) =>
  fs.existsSync(candidate) && fs.statSync(candidate).isFile();

/** Source file a relative module specifier resolves to, or null. */
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
    if (isFile(candidate)) return candidate;
  }
  return null;
}

/** Sass partial a relative `@use`/`@import` resolves to, or null. */
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
    if (isFile(candidate)) return candidate;
  }
  return null;
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
    if (!rel.startsWith('.')) rel = `./${rel}`;
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
    if (query === 'lit') this.usesLitCss = true;
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
    if (!file) return specifier;
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
    if (this.files.has(target) || !fs.existsSync(file)) return;
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
      if (partial) this.copy(partial);
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
      if (!isImport && !isReExport) continue;
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
    if (replacement !== undefined) return replacement;
    const specifier = this.rewrite(
      declaration.moduleSpecifier.text,
      file,
      projectPath
    );
    const clause = declaration.importClause;
    if (!clause) return `import '${specifier}';`;
    const parts = [];
    if (clause.name && names.has(clause.name.text))
      parts.push(clause.name.text);
    const bindings = clause.namedBindings;
    if (
      bindings &&
      ts.isNamespaceImport(bindings) &&
      names.has(bindings.name.text)
    ) {
      parts.push(`* as ${bindings.name.text}`);
    }
    if (bindings && ts.isNamedImports(bindings)) {
      const named = bindings.elements
        .filter((e) => !e.isTypeOnly && names.has(e.name.text))
        .map((e) => e.getText(sourceFile));
      if (named.length) parts.push(`{ ${named.join(', ')} }`);
    }
    return parts.length
      ? `import ${parts.join(', ')} from '${specifier}';`
      : null;
  }
}

/** A name not already bound at the top level of the generated module. */
export function freeName(preferred, taken) {
  if (!taken.has(preferred)) return preferred;
  const prefixed = `story${preferred[0].toUpperCase()}${preferred.slice(1)}`;
  if (!taken.has(prefixed)) return prefixed;
  let i = 2;
  while (taken.has(`${preferred}${i}`)) i++;
  return `${preferred}${i}`;
}

export const metaTitle = (sourceFile, meta) => {
  if (!meta || !ts.isObjectLiteralExpression(meta)) return null;
  const title = meta.properties.find(
    (p) => ts.isPropertyAssignment(p) && p.name.getText(sourceFile) === 'title'
  );
  return title && ts.isStringLiteralLike(title.initializer)
    ? title.initializer.text
    : null;
};

export const kebab = (s) =>
  s
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();

/** Story export names (what the Vite plugin attaches the action to). */
export function storyNames(file) {
  return analyzeCsf(parseModule(file)).stories.map((s) => s.name);
}

/** `{ name, version }` of the package at `root`. */
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
