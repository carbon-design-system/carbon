/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Generates a standalone StackBlitz project for each story in a
 * `@carbon/web-components` stories module
 *
 * Rewrite imports to use published package:
 * - relative import of a source file that `tasks/build.js` publishes becomes
 *   `@carbon/web-components/es/<path>.js`
 * - story-only files (assets, styles, templates, etc) are copied into the
 *    project under `src/story-files`
 * - Storybook runtime APIs (`storybook/actions`, etc) resolve to a small shim
 *
 * `findUnregisteredTags()` checks that stories import every element rendered
 */

import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import * as prettier from 'prettier';
import {
  analyzeCsf,
  extractStory,
  htmlTemplates,
  parseModule,
  statementText,
  ts,
} from './csf.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prettierConfig = createRequire(import.meta.url)('prettier-config-carbon');
export const PACKAGE_ROOT = path.resolve(
  __dirname,
  '..',
  '..',
  'packages',
  'web-components'
);
const SRC = path.join(PACKAGE_ROOT, 'src');
const PACKAGE_NAME = '@carbon/web-components';
const STORY_FILES_DIR = 'src/story-files';
const SHIM_FILE = 'src/storybook-shim.ts';

const STYLE_OR_ASSET = /\.(s?css|svg|png|jpe?g|gif|webp|mp4|json)$/;

// mirror `esInputs` globs in packages/web-components/tasks/build.js;
//  all `src/**\/*.ts` excluding stories, declarations, polyfills, and examples
function isPublished(file) {
  if (!file.startsWith(SRC + path.sep) || !file.endsWith('.ts')) return false;
  const rel = path.relative(SRC, file).split(path.sep).join('/');
  return !(
    rel.endsWith('.stories.ts') ||
    rel.endsWith('.d.ts') ||
    rel === 'globals/internal/storybook-cdn.ts' ||
    rel.startsWith('polyfills/') ||
    rel.startsWith('examples/')
  );
}

// published, but only exists to support stories; copy it instead
function isStoryOnly(file) {
  const rel = path.relative(SRC, file).split(path.sep).join('/');
  return /(^|\/)(_story-assets|stories|__stories__)\//.test(rel);
}

function resolveSource(fromFile, specifier) {
  const base = path.resolve(path.dirname(fromFile), specifier);
  // TS ESM specifiers name the emitted `.js`; the source next to it is `.ts`
  const stem = base.replace(/\.m?js$/, '');
  for (const candidate of [
    `${stem}.ts`,
    `${stem}.js`,
    base,
    path.join(base, 'index.ts'),
    path.join(base, 'index.js'),
  ]) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }
  return null;
}

function resolveStyle(fromFile, specifier) {
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
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }
  return null;
}

const packageNameOf = (specifier) =>
  specifier.startsWith('@')
    ? specifier.split('/').slice(0, 2).join('/')
    : specifier.split('/')[0];

const posix = (p) => p.split(path.sep).join('/');

// project path for a copied (vendored) file
const vendoredPath = (file) =>
  `${STORY_FILES_DIR}/${posix(path.relative(PACKAGE_ROOT, file))}`;

const relativeSpecifier = (fromProjectPath, toProjectPath) => {
  let rel = posix(
    path.posix.relative(path.posix.dirname(fromProjectPath), toProjectPath)
  );
  if (!rel.startsWith('.')) rel = `./${rel}`;
  return rel.replace(/\.ts$/, '');
};

// collect project files, copying story-only files as they're referenced and
// rewriting module specifiers
class ProjectBuilder {
  constructor() {
    this.files = new Map(); // project path -> contents
    this.packages = new Set([PACKAGE_NAME]);
    this.usesShim = false;
    this.usesLitCss = false;
  }

  // new specifier for `specifier`, imported from `fromFile`
  rewrite(specifier, fromFile, fromProjectPath) {
    const [bare, query = ''] = specifier.split('?');
    if (/^(storybook|@storybook)\//.test(bare)) {
      this.usesShim = true;
      return relativeSpecifier(fromProjectPath, SHIM_FILE);
    }
    if (!bare.startsWith('.')) {
      this.packages.add(packageNameOf(bare));
      return specifier;
    }
    if (query === 'lit') this.usesLitCss = true;
    if (STYLE_OR_ASSET.test(bare)) {
      const file = path.resolve(path.dirname(fromFile), bare);
      this.copy(file);
      const target = relativeSpecifier(fromProjectPath, vendoredPath(file));
      return query ? `${target}?${query}` : target;
    }
    const file = resolveSource(fromFile, bare);
    if (!file) return specifier;
    if (isPublished(file) && !isStoryOnly(file)) {
      const rel = posix(path.relative(SRC, file)).replace(/\.ts$/, '.js');
      return `${PACKAGE_NAME}/es/${rel}`;
    }
    this.copy(file);
    return relativeSpecifier(fromProjectPath, vendoredPath(file));
  }

  // copoy story-only file into project; rewrite what it imports
  copy(file) {
    const target = vendoredPath(file);
    if (this.files.has(target) || !fs.existsSync(file)) return;
    const text = fs.readFileSync(file, 'utf8');
    this.files.set(target, text); // placeholder, guards against cycles
    if (/\.s[ac]ss$/.test(file)) {
      this.files.set(target, this.rewriteStyle(text, file, target));
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
  importLine(sourceFile, { declaration, names }, file) {
    const specifier = this.rewrite(
      declaration.moduleSpecifier.text,
      file,
      'src/main.ts'
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

// global styles
const STYLES = `@use '@carbon/styles/scss/reset';
@use '@carbon/styles/scss/theme';
@use '@carbon/styles/scss/themes';
@use '@carbon/styles/scss/grid';
@use '@carbon/styles/scss/components/button/tokens' as button-tokens;
@use '@carbon/styles/scss/components/notification/tokens' as notification-tokens;
@use '@carbon/styles/scss/components/tag/tokens' as tag-tokens;
@use '@carbon/styles/scss/components/content-switcher/tokens' as content-switcher-tokens;

@include theme.add-component-tokens(button-tokens.$button-tokens);
@include theme.add-component-tokens(notification-tokens.$notification-tokens);
@include theme.add-component-tokens(tag-tokens.$tag-tokens);
@include theme.add-component-tokens(content-switcher-tokens.$content-switcher-tokens);
@include grid.css-grid();

:root {
  @include theme.theme(themes.$white);
  background-color: var(--cds-background);
  color: var(--cds-text-primary);
}
`;

const SHIM = `// Storybook-only APIs used by the story, reduced to something that runs here.
export const action =
  (name: string) =>
  (...args: unknown[]) =>
    console.log(name, ...args);
export const fn =
  () =>
  (...args: unknown[]) =>
    console.log(...args);
export const linkTo = () => () => {};

// Storybook's story hooks: state persists across renders, and updating it
// renders the story again.
let draw = () => {};
let storyArgs: Record<string, unknown> = {};
let states: unknown[] = [];
let index = 0;
let queued = false;
const rerender = () => {
  if (queued) return;
  queued = true;
  queueMicrotask(() => {
    queued = false;
    index = 0;
    draw();
  });
};

/** Render the story now and again whenever its hook state or args change. */
export function mountStory(args: Record<string, unknown>, render: () => void) {
  storyArgs = args;
  draw = render;
  index = 0;
  draw();
}

export function useState<T>(initial: T | (() => T)) {
  const i = index++;
  if (!(i in states)) {
    states[i] = typeof initial === 'function' ? (initial as () => T)() : initial;
  }
  const set = (next: T | ((previous: T) => T)) => {
    states[i] =
      typeof next === 'function'
        ? (next as (previous: T) => T)(states[i] as T)
        : next;
    rerender();
  };
  return [states[i] as T, set] as const;
}

export function useArgs() {
  const update = (patch: Record<string, unknown>) => {
    Object.assign(storyArgs, patch);
    rerender();
  };
  return [storyArgs, update] as const;
}

export function useEffect(effect: () => void | (() => void)) {
  queueMicrotask(() => effect());
}
`;

const TSCONFIG = `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "skipLibCheck": true
  },
  "include": ["src"]
}
`;

const VERSIONS = { lit: '^3.0.0' };

function packageJson(name, packages, { usesLitCss }) {
  const dependencies = { '@carbon/styles': 'latest' };
  for (const pkg of packages) dependencies[pkg] = VERSIONS[pkg] ?? 'latest';
  const devDependencies = { sass: 'latest', vite: 'latest' };
  if (usesLitCss) devDependencies['vite-plugin-lit-css'] = 'latest';
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

const viteConfig = ({ usesLitCss }) =>
  usesLitCss
    ? `import { defineConfig } from 'vite';
import litcss from 'vite-plugin-lit-css';

export default defineConfig({ plugins: [litcss()] });
`
    : `import { defineConfig } from 'vite';

export default defineConfig({});
`;

const indexHtml = (title) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <link rel="stylesheet" href="/src/styles.scss" />
    <script type="module" src="/src/main.ts"></script>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
`;

// a name not already bound at the top level of the generated module
function freeName(preferred, taken) {
  if (!taken.has(preferred)) return preferred;
  const prefixed = `story${preferred[0].toUpperCase()}${preferred.slice(1)}`;
  if (!taken.has(prefixed)) return prefixed;
  let i = 2;
  while (taken.has(`${preferred}${i}`)) i++;
  return `${preferred}${i}`;
}

const metaTitle = (sourceFile, meta) => {
  if (!meta || !ts.isObjectLiteralExpression(meta)) return null;
  const title = meta.properties.find(
    (p) => ts.isPropertyAssignment(p) && p.name.getText(sourceFile) === 'title'
  );
  return title && ts.isStringLiteralLike(title.initializer)
    ? title.initializer.text
    : null;
};

const kebab = (s) =>
  s
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();

/** Story export names (what the Vite plugin attaches the action to). */
export function storyNames(file) {
  return analyzeCsf(parseModule(file)).stories.map((s) => s.name);
}

/**
 * Generate a StackBlitz project per story in `file`.
 * Returns `{ [storyName]: { title, description, template, openFile, files } }`,
 * the shape `StackBlitzSDK.openProject()` takes (plus `openFile`).
 */
export async function generateProjects(file) {
  const sourceFile = parseModule(file);
  const csf = analyzeCsf(sourceFile);
  const title = metaTitle(sourceFile, csf.meta) ?? path.basename(file);
  const componentName = title.split('/').pop();
  const projects = {};

  for (const { name } of csf.stories) {
    const extracted = extractStory(sourceFile, csf, name);
    const builder = new ProjectBuilder();
    const imports = extracted.imports
      .map((entry) => builder.importLine(sourceFile, entry, file))
      .filter(Boolean);

    const taken = new Set(extracted.topLevelNames);
    taken.add(name);
    const renderName = freeName('render', taken);
    taken.add(renderName);
    const metaName = freeName('meta', taken);
    taken.add(metaName);
    const argsName = freeName('args', taken);

    const body = [];
    const declarations = extracted.declarations.map((s) =>
      statementText(sourceFile, s)
    );
    if (declarations.length) body.push(declarations.join('\n\n'));
    if (extracted.meta) body.push(`const ${metaName} = ${extracted.meta};`);
    body.push(`const ${name} = ${extracted.story};`);

    const argSources = [
      extracted.meta ? `...${metaName}.args` : null,
      `...${name}.args`,
    ].filter(Boolean);
    let run = `const ${argsName} = { ${argSources.join(', ')} };`;
    if (extracted.usesArgTypesMapping) {
      const lookup = [
        `(${name}.argTypes as any)?.[key]?.mapping`,
        extracted.meta ? `(${metaName}.argTypes as any)?.[key]?.mapping` : null,
      ]
        .filter(Boolean)
        .join(' ??\n    ');
      run += `

// Storybook maps some control values (e.g. an icon name) to the value the
// story renders with; apply the same mapping here.
for (const [key, value] of Object.entries(${argsName})) {
  const mapping =
    ${lookup};
  if (mapping && typeof value === 'string' && value in mapping) {
    (${argsName} as any)[key] = mapping[value];
  }
}`;
    }
    const renderFn = {
      story: `${name}.render`,
      meta: `${metaName}.render`,
      either: `(${name}.render ?? ${metaName}.render)`,
    }[extracted.renderFrom];
    const usesHooks = extracted.imports.some(
      ({ declaration }) =>
        declaration.moduleSpecifier.text === 'storybook/preview-api'
    );
    const draw = `${renderName}(${renderFn}(${argsName}), document.getElementById('app')!)`;
    run += usesHooks
      ? `\n\n// The story uses Storybook hooks; re-render it when they update.\nmountStory(${argsName}, () =>\n  ${draw}\n);`
      : `\n\n${draw};`;
    body.push(run);
    if (usesHooks) {
      // Merge into the story's own shim import when it has one.
      const shimIndex = imports.findIndex((line) =>
        /^import \{ .+ \} from '\.\/storybook-shim';$/.test(line)
      );
      if (shimIndex >= 0) {
        imports[shimIndex] = imports[shimIndex].replace(
          /\{ (.+) \}/,
          (_, names) => `{ ${names}, mountStory }`
        );
      } else {
        imports.push(`import { mountStory } from './storybook-shim';`);
        builder.usesShim = true;
      }
    }

    // Add lit's `render` to the story's own `lit` import when it has one.
    const renderBinding =
      renderName === 'render' ? 'render' : `render as ${renderName}`;
    const litIndex = imports.findIndex((line) =>
      /^import \{ .+ \} from 'lit';$/.test(line)
    );
    if (litIndex >= 0) {
      imports[litIndex] = imports[litIndex].replace(
        /\{ (.+) \}/,
        (_, names) => `{ ${names}, ${renderBinding} }`
      );
    } else {
      imports.unshift(`import { ${renderBinding} } from 'lit';`);
    }
    const main = await prettier.format(
      `${imports.join('\n')}\n\n${body.join('\n\n')}\n`,
      { ...prettierConfig, parser: 'typescript' }
    );

    builder.packages.add('lit');
    const files = {
      'index.html': indexHtml(`${componentName}: ${name}`),
      'package.json': packageJson(
        `carbon-web-components-${kebab(componentName)}-${kebab(name)}`,
        builder.packages,
        builder
      ),
      'tsconfig.json': TSCONFIG,
      'vite.config.js': viteConfig(builder),
      'src/main.ts': main,
      'src/styles.scss': STYLES,
      ...Object.fromEntries(builder.files),
    };
    if (builder.usesShim) files[SHIM_FILE] = SHIM;

    projects[name] = {
      title: `Carbon web components: ${componentName} (${name})`,
      description: `${componentName} "${name}" story from the Carbon web components Storybook.`,
      template: 'node',
      openFile: 'src/main.ts',
      files,
    };
  }

  return projects;
}

// ---------------------------------------------------------------------------
// Registration check
// ---------------------------------------------------------------------------

const SELF_ES = '@carbon/web-components/es/';
const DECLARES = /@customElement\(\s*`\$\{prefix\}-([a-z0-9-]+)`/g;
const IMPORTS = /from\s*['"]([^'"]+)['"]|import\s*['"]([^'"]+)['"]/g;

// imports that survive compilation; TS drops imports only used as types
function runtimeCode(file, text) {
  if (!file.endsWith('.ts')) return text;
  return ts.transpileModule(text, {
    fileName: file,
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ESNext,
      experimentalDecorators: true,
    },
  }).outputText;
}

let declaredTags;
/** Every `cds-*` tag a source module declares, keyed by tag. */
function allDeclaredTags() {
  if (declaredTags) return declaredTags;
  declaredTags = new Map();
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (isPublished(full)) {
        for (const m of fs.readFileSync(full, 'utf8').matchAll(DECLARES)) {
          declaredTags.set(`cds-${m[1]}`, posix(path.relative(SRC, full)));
        }
      }
    }
  };
  walk(SRC);
  return declaredTags;
}

/**
 * `cds-*` tags rendered by a stories module (and the story-only files it
 * imports) that its own import graph never registers.
 * Returns `[{ tag, module }]`, where `module` declares the tag.
 */
export function findUnregisteredTags(file) {
  const declared = allDeclaredTags();
  const registered = new Set();
  const rendered = new Set();
  const seen = new Set();
  const stack = [file];
  while (stack.length) {
    const current = stack.pop();
    if (seen.has(current)) continue;
    seen.add(current);
    const text = fs.readFileSync(current, 'utf8');
    for (const m of text.matchAll(DECLARES)) registered.add(`cds-${m[1]}`);
    if (current === file || !isPublished(current) || isStoryOnly(current)) {
      for (const template of htmlTemplates(parseModule(current, text))) {
        for (const m of template.matchAll(/<(cds-[a-z0-9-]+)/g)) {
          rendered.add(m[1]);
        }
      }
    }
    for (const m of runtimeCode(current, text).matchAll(IMPORTS)) {
      let specifier = m[1] ?? m[2];
      // the package's own published modules map back to their source
      if (specifier.startsWith(SELF_ES)) {
        specifier = path.join(SRC, specifier.slice(SELF_ES.length));
      }
      if (
        !(specifier.startsWith('.') || path.isAbsolute(specifier)) ||
        STYLE_OR_ASSET.test(specifier.split('?')[0])
      )
        continue;
      const next = resolveSource(current, specifier);
      if (next && /\.[jt]s$/.test(next)) stack.push(next);
    }
  }
  return [...rendered]
    .filter((tag) => declared.has(tag) && !registered.has(tag))
    .sort()
    .map((tag) => ({ tag, module: declared.get(tag) }));
}

/** Stories modules that get a StackBlitz action. */
export function isStackBlitzStory(file) {
  return file.startsWith(SRC + path.sep) && file.endsWith('.stories.ts');
}

export function listStoryFiles() {
  const out = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== 'node_modules') walk(full);
      } else if (isStackBlitzStory(full)) out.push(full);
    }
  };
  walk(SRC);
  return out.sort();
}

/** Everything the Vite plugin needs for web components stories. */
export const webComponentsStackBlitz = {
  include: isStackBlitzStory,
  storyNames,
  generateProjects,
};
