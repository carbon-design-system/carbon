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
import { fileURLToPath } from 'node:url';
import {
  analyzeCsf,
  extractStory,
  htmlTemplates,
  parseModule,
  statementText,
  ts,
} from './csf.mjs';
import {
  ProjectBuilder,
  STYLE_OR_ASSET,
  format,
  freeName,
  kebab,
  metaTitle,
  packageJson as projectPackageJson,
  posix,
  resolveSource,
  storyNames,
  packageInfo,
} from './project.mjs';

export { storyNames };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const PACKAGE_ROOT = path.resolve(
  __dirname,
  '..',
  '..',
  'packages',
  'web-components'
);
const SRC = path.join(PACKAGE_ROOT, 'src');
const PACKAGE_NAME = '@carbon/web-components';
const SHIM_FILE = 'src/storybook-shim.ts';

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

// how a project imports a source module the package publishes
const publishedSpecifier = (file) =>
  isPublished(file) && !isStoryOnly(file)
    ? `${PACKAGE_NAME}/es/${posix(path.relative(SRC, file)).replace(/\.ts$/, '.js')}`
    : null;

const newBuilder = () =>
  new ProjectBuilder({
    packageRoot: PACKAGE_ROOT,
    publishedSpecifier,
    shimFile: SHIM_FILE,
    packages: [PACKAGE_NAME],
  });

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
  return projectPackageJson(name, { dependencies, devDependencies });
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

const STORY_MODULE = 'src/story.ts';

const MAIN = `import mount from './story';

mount(document.getElementById('app')!);
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

/**
 * Generate a StackBlitz project per story in `file`.
 * Returns `{ [storyName]: { title, description, template, openFile, files } }`,
 * the shape `StackBlitzSDK.openProject()` takes (plus `openFile`).
 *
 * `openFile` is the story module (`src/story.ts`): its default export,
 * `mount(container)`, renders the story into an element, so other apps can
 * import it as is.
 */
export async function generateProjects(file) {
  const sourceFile = parseModule(file);
  const csf = analyzeCsf(sourceFile);
  const title = metaTitle(sourceFile, csf.meta) ?? path.basename(file);
  const componentName = title.split('/').pop();
  const projects = {};

  for (const { name } of csf.stories) {
    const extracted = extractStory(sourceFile, csf, name);
    const builder = newBuilder();
    const imports = extracted.imports
      .map((entry) => builder.importLine(sourceFile, entry, file, STORY_MODULE))
      .filter(Boolean);

    const taken = new Set(extracted.topLevelNames);
    taken.add(name);
    const renderName = freeName('render', taken);
    taken.add(renderName);
    const metaName = freeName('meta', taken);
    taken.add(metaName);
    const argsName = freeName('args', taken);
    taken.add(argsName);
    const mountName = freeName('mount', taken);
    taken.add(mountName);
    const containerName = freeName('container', taken);

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
  if (
    mapping &&
    (typeof value === 'string' || typeof value === 'number') &&
    value in mapping
  ) {
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
    const draw = `${renderName}(${renderFn}(${argsName}), ${containerName})`;
    const mountBody = usesHooks
      ? `// The story uses Storybook hooks; re-render it when they update.\n  mountStory(${argsName}, () =>\n    ${draw}\n  );`
      : `${draw};`;
    run += `\n\n/** Render the story into \`${containerName}\`. */\nexport default function ${mountName}(${containerName}: HTMLElement) {\n  ${mountBody}\n}`;
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
    const story = await format(
      `${imports.join('\n')}\n\n${body.join('\n\n')}\n`
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
      'src/main.ts': MAIN,
      [STORY_MODULE]: story,
      'src/styles.scss': STYLES,
      ...Object.fromEntries(builder.files),
    };
    if (builder.usesShim) files[SHIM_FILE] = SHIM;

    projects[name] = {
      title: `Carbon web components: ${componentName} (${name})`,
      description: `${componentName} "${name}" story from the Carbon web components Storybook.`,
      template: 'node',
      openFile: STORY_MODULE,
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
  package: packageInfo(PACKAGE_ROOT),
};
