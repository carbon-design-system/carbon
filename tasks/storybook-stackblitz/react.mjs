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

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseModule, statementText, ts } from './csf.mjs';
import {
  ProjectBuilder,
  STYLE_OR_ASSET,
  format,
  generateStoryProjects,
  importBindings,
  importClauseText,
  kebab,
  listFiles,
  mergeNamedImports,
  packageInfo,
  packageJson,
  resolveSource,
} from './project.mjs';

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
    if (!ts.isImportDeclaration(statement)) {
      continue;
    }
    const clause = statement.importClause;
    if (!clause || clause.isTypeOnly) {
      continue;
    }
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
        if (element.name.text !== local || element.isTypeOnly) {
          continue;
        }
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

// Map of a module's runtime exports: exported name -> `{ file, name }`.
function moduleExports(file) {
  if (exportsCache.has(file)) {
    return exportsCache.get(file);
  }
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
        if (!target) {
          continue;
        }
        for (const [name, origin] of moduleExports(target)) {
          if (name !== 'default' && !exports.has(name)) {
            exports.set(name, typeOnly ? { ...origin, type: true } : origin);
          }
        }
      } else if (ts.isNamespaceExport(clause)) {
        // export * as ns from './x'
        if (target) {
          exports.set(clause.name.text, { file: target, name: '*' });
        }
      } else {
        for (const element of clause.elements) {
          const local = (element.propertyName ?? element.name).text;
          const origin = specifier
            ? target
              ? moduleExports(target).get(local)
              : { file: specifier, name: local }
            : localOrigin(file, sourceFile, local);
          if (!origin) {
            continue;
          }
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
// origin key -> how to reach it from `@carbon/react`: `['Name']` or `['ns', 'Name']`.
function publicApi() {
  if (publicNames) {
    return publicNames;
  }
  publicNames = new Map();
  for (const [name, origin] of moduleExports(path.join(SRC, 'index.ts'))) {
    const key = originKey(origin);
    if (!publicNames.has(key)) {
      publicNames.set(key, [name]);
    }
  }
  // members of namespace exports (`export * as preview__Card from ...`)
  for (const [name, origin] of moduleExports(path.join(SRC, 'index.ts'))) {
    if (origin.name !== '*') {
      continue;
    }
    for (const [member, memberOrigin] of moduleExports(origin.file)) {
      const key = originKey(memberOrigin);
      if (!publicNames.has(key)) {
        publicNames.set(key, [name, member]);
      }
    }
  }
  return publicNames;
}

// ---------------------------------------------------------------------------
// Project
// ---------------------------------------------------------------------------

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
    if (
      !specifier.startsWith('.') ||
      !clause ||
      STYLE_OR_ASSET.test(specifier)
    ) {
      return undefined;
    }
    const target = resolveSource(file, specifier);
    if (!target) {
      return undefined;
    }
    // the package's icons entry point (`packages/react/icons`)
    if (target.startsWith(ICONS_DIR + path.sep)) {
      this.packages.add(PACKAGE_NAME);
      return `${statementText(sourceFile, declaration).replace(
        /(['"])[^'"]+\1;?$/,
        `'${PACKAGE_NAME}/icons';`
      )}`;
    }

    const bindings = importBindings(
      clause,
      (local) => !names || names.has(local)
    );
    if (!bindings.length) {
      return names ? null : '';
    }

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
      lines.push(`import ${importClauseText(copied)} from '${to}';`);
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

/**
 * Generate a StackBlitz project per story in `file`.
 * Returns `{ [storyName]: { title, description, template, openFile, files } }`,
 * the shape `StackBlitzSDK.openProject()` takes (plus `openFile`).
 *
 * `openFile` is the story module (`src/App.jsx`): its default export renders
 * the story as a React component, so other apps can import it as is.
 */
export function generateProjects(file) {
  const tsx = file.endsWith('.tsx');
  const entry = tsx ? 'src/main.tsx' : 'src/main.jsx';
  // the story itself; its default export is the story as a component
  const storyModule = tsx ? 'src/App.tsx' : 'src/App.jsx';
  return generateStoryProjects(file, {
    storyModule,
    keep: ['component'],
    newBuilder: () => new ReactProjectBuilder(),
    // a story without `render` renders `meta.component`
    metaRender: (meta) =>
      `${meta}.render ?? ((props) => <${meta}.component {...props} />)`,
    async project({ name, componentName, builder, imports, pick, story }) {
      const { body, argsName, renderFn } = story();
      const appName = pick('App');
      body.push(`export default function ${appName}() {
  return ${renderFn}(${argsName}, { args: ${argsName}, viewMode: 'story' });
}`);
      const app = await format(
        [
          ...mergeNamedImports(imports, PACKAGE_NAME),
          '',
          body.join('\n\n'),
          '',
        ].join('\n')
      );
      const main = await format(
        [
          `import './index.scss';`,
          `import { createRoot } from 'react-dom/client';`,
          `import App from './App';`,
          '',
          `createRoot(document.getElementById('root')${tsx ? '!' : ''}).render(<App />);`,
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
        [storyModule]: app,
        'src/index.scss': builder.publicNames.has('FlexGrid')
          ? FLEX_GRID_STYLES
          : STYLES,
        ...Object.fromEntries(builder.files),
      };
      if (builder.usesShim) {
        files[SHIM_FILE] = SHIM;
      }

      return {
        title: `Carbon React: ${componentName} (${name})`,
        description: `${componentName} "${name}" story from the Carbon React Storybook.`,
        template: 'node',
        openFile: storyModule,
        files,
      };
    },
  });
}

// Stories modules that get a StackBlitz action.
export function isStackBlitzStory(file) {
  return file.startsWith(SRC + path.sep) && /\.stories\.(js|tsx)$/.test(file);
}

export const listStoryFiles = () => listFiles(SRC, isStackBlitzStory);

// Everything the Vite plugin needs for React stories.
export const reactStackBlitz = {
  include: isStackBlitzStory,
  generateProjects,
  package: packageInfo(PACKAGE_ROOT),
};
