/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Generates a standalone StackBlitz project for each story in a
 * `@carbon/react` stories module
 *
 * - relative imports of anything `@carbon/react` exports become
 *   `import { Name } from '@carbon/react'`
 * - everything else the story uses (story helpers, styles, `.storybook`
 *   templates, unexported source) is copied into `src/story-files`
 * - Storybook APIs (`storybook/actions`, `@storybook/addon-links/react`)
 *   resolve to a small shim
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  analyzeCsf,
  extractStory,
  parseModule,
  statementText,
  ts,
} from './csf.mjs';
import {
  ProjectBuilder,
  format,
  freeName,
  kebab,
  metaTitle,
  packageJson,
  resolveSource,
  storyNames,
} from './project.mjs';

export { storyNames };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const PACKAGE_ROOT = path.resolve(
  __dirname,
  '..',
  '..',
  'packages',
  'react'
);
const SRC = path.join(PACKAGE_ROOT, 'src');
const PACKAGE_NAME = '@carbon/react';
const SHIM_FILE = 'src/storybook-shim.jsx';
const ICONS_DIR = path.join(PACKAGE_ROOT, 'icons');

// ---------------------------------------------------------------------------
// What `@carbon/react` exports, keyed by where each export is declared
// ---------------------------------------------------------------------------

const exportsCache = new Map();
const originKey = ({ file, name }) => `${file}#${name}`;

// local binding -> origin, following the module's own imports
function localOrigin(file, sourceFile, local) {
  for (const statement of sourceFile.statements) {
    if (!ts.isImportDeclaration(statement)) continue;
    const clause = statement.importClause;
    if (!clause || clause.isTypeOnly) continue;
    const specifier = statement.moduleSpecifier.text;
    const target = specifier.startsWith('.')
      ? resolveSource(file, specifier)
      : null;
    if (clause.name?.text === local) {
      return target
        ? (moduleExports(target).get('default') ?? null)
        : { file: specifier, name: 'default' };
    }
    const bindings = clause.namedBindings;
    if (bindings && ts.isNamespaceImport(bindings)) {
      if (bindings.name.text === local) {
        return { file: target ?? specifier, name: '*' };
      }
    } else if (bindings) {
      for (const element of bindings.elements) {
        if (element.name.text !== local || element.isTypeOnly) continue;
        const imported = (element.propertyName ?? element.name).text;
        return target
          ? (moduleExports(target).get(imported) ?? null)
          : { file: specifier, name: imported };
      }
    }
  }
  // a value declaration wins over a type of the same name
  // (`const X = ...; type X = ...; export { X }`)
  const declares = (s) =>
    ts.isVariableStatement(s)
      ? s.declarationList.declarations.some(
          (d) => ts.isIdentifier(d.name) && d.name.text === local
        )
      : s.name?.text === local;
  const isValue = sourceFile.statements.some(
    (s) =>
      (ts.isVariableStatement(s) ||
        ts.isFunctionDeclaration(s) ||
        ts.isClassDeclaration(s) ||
        ts.isEnumDeclaration(s)) &&
      declares(s)
  );
  const isType =
    !isValue &&
    sourceFile.statements.some(
      (s) =>
        (ts.isInterfaceDeclaration(s) || ts.isTypeAliasDeclaration(s)) &&
        declares(s)
    );
  return isType ? { file, name: local, type: true } : { file, name: local };
}

const hasModifier = (node, kind) =>
  node.modifiers?.some((m) => m.kind === kind);

/** Map of a module's runtime exports: exported name -> `{ file, name }`. */
function moduleExports(file) {
  if (exportsCache.has(file)) return exportsCache.get(file);
  const exports = new Map();
  exportsCache.set(file, exports); // guards against cycles
  const sourceFile = parseModule(file);
  for (const statement of sourceFile.statements) {
    if (ts.isExportDeclaration(statement)) {
      const typeOnly = statement.isTypeOnly;
      const specifier = statement.moduleSpecifier?.text;
      const target =
        specifier?.startsWith('.') && resolveSource(file, specifier);
      const clause = statement.exportClause;
      if (!clause) {
        // export * from './x'
        if (!target) continue;
        for (const [name, origin] of moduleExports(target)) {
          if (name !== 'default' && !exports.has(name)) {
            exports.set(name, typeOnly ? { ...origin, type: true } : origin);
          }
        }
      } else if (ts.isNamespaceExport(clause)) {
        // export * as ns from './x'
        if (target) exports.set(clause.name.text, { file: target, name: '*' });
      } else {
        for (const element of clause.elements) {
          const local = (element.propertyName ?? element.name).text;
          const origin = specifier
            ? target
              ? moduleExports(target).get(local)
              : { file: specifier, name: local }
            : localOrigin(file, sourceFile, local);
          if (!origin) continue;
          exports.set(
            element.name.text,
            typeOnly || element.isTypeOnly ? { ...origin, type: true } : origin
          );
        }
      }
    } else if (ts.isExportAssignment(statement)) {
      exports.set(
        'default',
        ts.isIdentifier(statement.expression)
          ? localOrigin(file, sourceFile, statement.expression.text)
          : { file, name: 'default' }
      );
    } else if (hasModifier(statement, ts.SyntaxKind.ExportKeyword)) {
      if (
        ts.isInterfaceDeclaration(statement) ||
        ts.isTypeAliasDeclaration(statement)
      ) {
        const name = statement.name.text;
        exports.set(name, { file, name, type: true });
        continue;
      }
      const isDefault = hasModifier(statement, ts.SyntaxKind.DefaultKeyword);
      if (ts.isVariableStatement(statement)) {
        for (const declaration of statement.declarationList.declarations) {
          if (ts.isIdentifier(declaration.name)) {
            const name = declaration.name.text;
            exports.set(name, { file, name });
          }
        }
      } else if (statement.name) {
        const name = statement.name.text;
        exports.set(isDefault ? 'default' : name, { file, name });
      } else if (isDefault) {
        exports.set('default', { file, name: 'default' });
      }
    }
  }
  return exports;
}

let publicNames;
/** origin key -> how to reach it from `@carbon/react`: `['Name']` or `['ns', 'Name']`. */
function publicApi() {
  if (publicNames) return publicNames;
  publicNames = new Map();
  for (const [name, origin] of moduleExports(path.join(SRC, 'index.ts'))) {
    const key = originKey(origin);
    if (!publicNames.has(key)) publicNames.set(key, [name]);
  }
  // members of namespace exports (`export * as preview__Card from ...`)
  for (const [name, origin] of moduleExports(path.join(SRC, 'index.ts'))) {
    if (origin.name !== '*') continue;
    for (const [member, memberOrigin] of moduleExports(origin.file)) {
      const key = originKey(memberOrigin);
      if (!publicNames.has(key)) publicNames.set(key, [name, member]);
    }
  }
  return publicNames;
}

// ---------------------------------------------------------------------------
// Project
// ---------------------------------------------------------------------------

const STYLE_OR_ASSET = /\.(s?css|svg|png|jpe?g|gif|webp|mp4|json)(\?.*)?$/;

class ReactProjectBuilder extends ProjectBuilder {
  constructor() {
    super({
      packageRoot: PACKAGE_ROOT,
      publishedSpecifier: () => null,
      shimFile: SHIM_FILE,
      packages: [PACKAGE_NAME, 'react', 'react-dom'],
      stripExtension: /\.[jt]sx?$/,
    });
    this.publicNames = new Set(); // `@carbon/react` names the project uses
  }

  // copied `.js` modules contain JSX, which Vite only parses in `.jsx`
  vendoredPath(file) {
    return super.vendoredPath(file).replace(/\.js$/, '.jsx');
  }

  // Imports of the public API become `@carbon/react` imports; anything else
  // imported from source is copied
  importStatement(sourceFile, declaration, names, file, projectPath) {
    const specifier = declaration.moduleSpecifier.text;
    const clause = declaration.importClause;
    if (!specifier.startsWith('.') || !clause || STYLE_OR_ASSET.test(specifier))
      return undefined;
    const target = resolveSource(file, specifier);
    if (!target) return undefined;
    // the package's icons entry point (`packages/react/icons`)
    if (target.startsWith(ICONS_DIR + path.sep)) {
      this.packages.add(PACKAGE_NAME);
      return `${statementText(sourceFile, declaration).replace(
        /(['"])[^'"]+\1;?$/,
        `'${PACKAGE_NAME}/icons';`
      )}`;
    }

    const keep = (local) => !names || names.has(local);
    const bindings = []; // { imported, local }
    if (clause.name && keep(clause.name.text)) {
      bindings.push({ imported: 'default', local: clause.name.text });
    }
    const named = clause.namedBindings;
    if (named && ts.isNamespaceImport(named)) {
      if (keep(named.name.text)) {
        bindings.push({ imported: '*', local: named.name.text });
      }
    } else if (named) {
      for (const element of named.elements) {
        if (element.isTypeOnly || !keep(element.name.text)) continue;
        bindings.push({
          imported: (element.propertyName ?? element.name).text,
          local: element.name.text,
        });
      }
    }
    if (!bindings.length) return names ? null : '';

    const api = publicApi();
    const exports = moduleExports(target);
    const fromPackage = [];
    const typesFromPackage = [];
    const namespaceMembers = [];
    const copied = [];
    for (const binding of bindings) {
      const origin =
        binding.imported === '*'
          ? { file: target, name: '*' }
          : exports.get(binding.imported);
      const publicPath = origin && api.get(originKey(origin));
      if (origin?.type) {
        // types don't exist at runtime: import public ones, drop the rest
        if (publicPath?.length === 1) {
          typesFromPackage.push(
            publicPath[0] === binding.local
              ? binding.local
              : `${publicPath[0]} as ${binding.local}`
          );
        }
      } else if (!publicPath) {
        copied.push(binding);
      } else if (publicPath.length === 1) {
        this.publicNames.add(publicPath[0]);
        fromPackage.push(
          publicPath[0] === binding.local
            ? binding.local
            : `${publicPath[0]} as ${binding.local}`
        );
      } else {
        this.publicNames.add(publicPath[0]);
        fromPackage.push(publicPath[0]);
        namespaceMembers.push(
          `const ${binding.local} = ${publicPath[0]}.${publicPath[1]};`
        );
      }
    }

    const lines = [];
    if (fromPackage.length) {
      lines.push(
        `import { ${[...new Set(fromPackage)].join(', ')} } from '${PACKAGE_NAME}';`
      );
    }
    if (typesFromPackage.length && /\.tsx?$/.test(projectPath)) {
      lines.push(
        `import type { ${typesFromPackage.join(', ')} } from '${PACKAGE_NAME}';`
      );
    }
    lines.push(...namespaceMembers);
    if (copied.length) {
      this.copy(target);
      const to = this.relativeSpecifier(projectPath, this.vendoredPath(target));
      const parts = [];
      const def = copied.find((b) => b.imported === 'default');
      const ns = copied.find((b) => b.imported === '*');
      const rest = copied.filter((b) => b.imported !== 'default' && b !== ns);
      if (def) parts.push(def.local);
      if (ns) parts.push(`* as ${ns.local}`);
      if (rest.length) {
        parts.push(
          `{ ${rest
            .map((b) =>
              b.imported === b.local ? b.local : `${b.imported} as ${b.local}`
            )
            .join(', ')} }`
        );
      }
      lines.push(`import ${parts.join(', ')} from '${to}';`);
    }
    return lines.join('\n');
  }
}

const SHIM = `// Storybook-only APIs used by the story, reduced to something that runs here.
export const action =
  (name) =>
  (...args) =>
    console.log(name, ...args);

export default function LinkTo({ children, kind, story, ...rest }) {
  return <a {...rest}>{children}</a>;
}
`;

const STYLES = `@use '@carbon/react' with (
  $font-path: '@ibm/plex'
);
`;

const FLEX_GRID_STYLES = `@use '@carbon/react' with (
  $font-path: '@ibm/plex',
  $use-flexbox-grid: true
);
`;

const VITE_CONFIG = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
`;

const indexHtml = (title, entry) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/${entry}"></script>
  </body>
</html>
`;

// One `import { ... } from '@carbon/react'` (and one `import type`) for the
// whole module: separate story imports can resolve to the same public name.
function mergePackageImports(imports) {
  const lines = imports.flatMap((entry) => entry.split('\n'));
  const merged = { value: new Set(), type: new Set() };
  const out = [];
  for (const line of lines) {
    const match = line.match(
      new RegExp(`^import (type )?\\{ (.+) \\} from '${PACKAGE_NAME}';$`)
    );
    if (!match) {
      out.push(line);
      continue;
    }
    const kind = match[1] ? 'type' : 'value';
    if (!merged[kind].size) out.push(kind); // placeholder for the merged line
    for (const name of match[2].split(/,\s*/)) merged[kind].add(name);
  }
  return out.map((line) =>
    line === 'value' || line === 'type'
      ? `import ${line === 'type' ? 'type ' : ''}{ ${[...merged[line]].join(', ')} } from '${PACKAGE_NAME}';`
      : line
  );
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
  const entry = file.endsWith('.tsx') ? 'src/main.tsx' : 'src/main.jsx';
  const projects = {};

  for (const { name } of csf.stories) {
    const extracted = extractStory(sourceFile, csf, name, {
      keep: ['component'],
    });
    const builder = new ReactProjectBuilder();
    const imports = extracted.imports
      .map((entryImport) =>
        builder.importLine(sourceFile, entryImport, file, entry)
      )
      .filter(Boolean);

    const taken = new Set(extracted.topLevelNames);
    taken.add(name);
    const pick = (preferred) => {
      const chosen = freeName(preferred, taken);
      taken.add(chosen);
      return chosen;
    };
    const metaName = pick('meta');
    const argsName = pick('args');
    const appName = pick('App');
    const rootName = pick('createRoot');

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
        `${name}.argTypes?.[key]?.mapping`,
        extracted.meta ? `${metaName}.argTypes?.[key]?.mapping` : null,
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
    ${argsName}[key] = mapping[value];
  }
}`;
    }
    const metaRender = extracted.meta
      ? `${metaName}.render ?? ((props) => <${metaName}.component {...props} />)`
      : null;
    const renderFn = {
      story: `${name}.render`,
      meta: `(${metaRender})`,
      either: `(${name}.render ?? ${metaRender})`,
    }[extracted.renderFrom];
    run += `

function ${appName}() {
  return ${renderFn}(${argsName}, { args: ${argsName}, viewMode: 'story' });
}

${rootName}(document.getElementById('root')).render(<${appName} />);`;
    body.push(run);

    const usesFlexGrid = builder.publicNames.has('FlexGrid');
    const main = await format(
      [
        `import './index.scss';`,
        rootName === 'createRoot'
          ? `import { createRoot } from 'react-dom/client';`
          : `import { createRoot as ${rootName} } from 'react-dom/client';`,
        ...mergePackageImports(imports),
        '',
        body.join('\n\n'),
        '',
      ].join('\n')
    );

    const dependencies = {};
    for (const pkg of builder.packages) {
      dependencies[pkg] = 'latest';
    }
    const files = {
      'index.html': indexHtml(`${componentName}: ${name}`, entry),
      'package.json': packageJson(
        `carbon-react-${kebab(componentName)}-${kebab(name)}`,
        {
          dependencies,
          devDependencies: {
            '@vitejs/plugin-react': 'latest',
            sass: 'latest',
            vite: 'latest',
          },
        }
      ),
      'vite.config.js': VITE_CONFIG,
      [entry]: main,
      'src/index.scss': usesFlexGrid ? FLEX_GRID_STYLES : STYLES,
      ...Object.fromEntries(builder.files),
    };
    if (builder.usesShim) files[SHIM_FILE] = SHIM;

    projects[name] = {
      title: `Carbon React: ${componentName} (${name})`,
      description: `${componentName} "${name}" story from the Carbon React Storybook.`,
      template: 'node',
      openFile: entry,
      files,
    };
  }

  return projects;
}

/** Stories modules that get a StackBlitz action. */
export function isStackBlitzStory(file) {
  return file.startsWith(SRC + path.sep) && /\.stories\.(js|tsx)$/.test(file);
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

/** Everything the Vite plugin needs for React stories. */
export const reactStackBlitz = {
  include: isStackBlitzStory,
  storyNames,
  generateProjects,
};
