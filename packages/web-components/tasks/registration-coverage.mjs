/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Registration coverage audit.
 *
 * Starting with v3, importing a component's barrel registers everything
 * that component renders. Under v3's pure class exports nothing else will
 * register on its own — so the gap here is an element that silently
 * never upgrades.
 *
 * For each component this traverses the module graph reachable from its barrel,
 * collects the elements that graph registers, and compares that against the
 * `cds-*` tags the component's own templates render.
 *
 * Templates are read through the TypeScript AST rather than by matching text,
 * so comments, JSDoc samples, and ordinary strings are not mistaken for markup.
 * Coverage is measured on the resolved graph, so we don't care whether a
 * barrel reaches an element through a class module or another barrel.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const COMPONENTS = path.resolve(__dirname, '..', 'src', 'components');

const DECLARES = /@customElement\(\s*`\$\{prefix\}-([a-z0-9-]+)`/g;
const IMPORTS = /from\s*['"]([^'"]+)['"]|import\s*['"]([^'"]+)['"]/g;

const componentFiles = (dir) =>
  fs
    .readdirSync(dir)
    .filter((n) => n.endsWith('.ts') && !n.includes('.stories.'));

const read = (file) => fs.readFileSync(file, 'utf8');

const declaredIn = (text) =>
  [...text.matchAll(DECLARES)].map((m) => `cds-${m[1]}`);

/** Resolve a relative specifier the way the bundler will. */
function resolveImport(fromFile, specifier) {
  if (!specifier.startsWith('.')) return null;
  const base = path.resolve(path.dirname(fromFile), specifier);
  // TS ESM specifiers name the emitted `.js`; the source next to it is `.ts`.
  const stem = base.replace(/\.m?js$/, '');
  for (const candidate of [`${stem}.ts`, path.join(stem, 'index.ts')]) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

// every element registered by the module graph reachable from `entry`
function registeredFrom(entry) {
  const seen = new Set();
  const tags = new Set();
  const stack = [entry];
  while (stack.length) {
    const file = stack.pop();
    if (seen.has(file)) continue;
    seen.add(file);
    const text = read(file);
    for (const tag of declaredIn(text)) tags.add(tag);
    for (const m of text.matchAll(IMPORTS)) {
      const next = resolveImport(file, m[1] ?? m[2]);
      if (next) stack.push(next);
    }
  }
  return tags;
}

// every `cds-*` tag opened inside an `html` tagged template
function renderedIn(file) {
  const sourceFile = ts.createSourceFile(
    file,
    read(file),
    ts.ScriptTarget.Latest,
    true
  );
  const tags = new Set();
  const visit = (node) => {
    if (
      ts.isTaggedTemplateExpression(node) &&
      ts.isIdentifier(node.tag) &&
      node.tag.text === 'html'
    ) {
      for (const m of node.template.getText().matchAll(/<(cds-[a-z0-9-]+)/g)) {
        tags.add(m[1]);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  return tags;
}

const folders = fs
  .readdirSync(COMPONENTS)
  .filter((n) => fs.statSync(path.join(COMPONENTS, n)).isDirectory());

// tag, then the module that declares it for the suggested fix
const declaringModule = new Map();
for (const folder of folders) {
  const dir = path.join(COMPONENTS, folder);
  for (const name of componentFiles(dir)) {
    for (const tag of declaredIn(read(path.join(dir, name)))) {
      declaringModule.set(tag, `../${folder}/${name.replace(/\.ts$/, '')}`);
    }
  }
}

const failures = [];
for (const folder of folders) {
  const dir = path.join(COMPONENTS, folder);
  const barrel = path.join(dir, 'index.ts');

  const rendered = new Set();
  for (const name of componentFiles(dir)) {
    for (const tag of renderedIn(path.join(dir, name))) rendered.add(tag);
  }

  const registered = fs.existsSync(barrel) ? registeredFrom(barrel) : new Set();
  const missing = [...rendered].filter(
    (tag) => declaringModule.has(tag) && !registered.has(tag)
  );
  if (missing.length) {
    failures.push({ folder, missing, hasBarrel: fs.existsSync(barrel) });
  }
}

if (failures.length === 0) {
  process.stdout.write(
    `Registration coverage: ${folders.length} components, every rendered element is registered by its barrel.\n`
  );
  process.exit(0);
}

const total = failures.reduce((sum, f) => sum + f.missing.length, 0);
process.stderr.write(
  `Registration coverage: ${total} element${total === 1 ? '' : 's'} rendered but not registered, ` +
    `across ${failures.length} component${failures.length === 1 ? '' : 's'}.\n\n` +
    `Importing a component's barrel must register everything that component renders,\n` +
    `otherwise the element never upgrades for consumers who import it the documented way.\n\n`
);
for (const { folder, missing, hasBarrel } of failures) {
  process.stderr.write(`  ${folder}${hasBarrel ? '' : '  (no index.ts)'}\n`);
  for (const tag of missing) {
    process.stderr.write(
      `    ${tag.padEnd(30)} add "import '${declaringModule.get(tag)}';" to ${folder}/index.ts\n`
    );
  }
}
process.stderr.write('\n');
process.exit(1);
