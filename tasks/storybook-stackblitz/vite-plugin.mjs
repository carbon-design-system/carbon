/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Vite plugin that gives every story in matching stories modules an
 * "Open in StackBlitz" button on its docs page, without MDX changes
 *
 * Each module gets a few lines appended that attach the action to its
 * story exports.
 *
 * Production builds also write each project to `stackblitz/<story id>.json`,
 * plus `stackblitz/index.json` (the package `{ name, version }` the projects
 * were built from, and each story's `{ id, title, name }`), so other sites can
 * use the published Storybook's projects.
 */

import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { storyNameFromExport, toId } from 'storybook/internal/csf';
import { analyzeCsf, parseModule, ts } from './csf.mjs';
import { metaTitle } from './project.mjs';

const RUNTIME = fileURLToPath(
  new URL('./open-in-stackblitz.js', import.meta.url)
);
const VIRTUAL_PREFIX = 'virtual:storybook-stackblitz:';
const RESOLVED_PREFIX = `\0${VIRTUAL_PREFIX}`;
const OUTPUT_DIR = 'stackblitz';

// display name a story sets for itself (`name: '...'`, or CSF2
// `Story.storyName = '...'`), if any
function ownName(sourceFile, csf, story) {
  const isString = (node) => node && ts.isStringLiteralLike(node);
  for (const statement of csf.assignments.get(story.name) ?? []) {
    const { left, right } = statement.expression;
    if (left.name.text === 'storyName' && isString(right)) return right.text;
  }
  if (!story.init || !ts.isObjectLiteralExpression(story.init)) return null;
  const name = story.init.properties.find(
    (p) => ts.isPropertyAssignment(p) && p.name.getText(sourceFile) === 'name'
  );
  return isString(name?.initializer) ? name.initializer.text : null;
}

/** `{ id, title, name }` for each story export of a stories module. */
export function storyEntries(file) {
  const sourceFile = parseModule(file);
  const csf = analyzeCsf(sourceFile);
  const title = metaTitle(sourceFile, csf.meta);
  if (!title) return new Map();
  return new Map(
    csf.stories.map((story) => {
      const { name } = story;
      const storyName = storyNameFromExport(name);
      return [
        name,
        {
          id: toId(title, storyName),
          title,
          name: ownName(sourceFile, csf, story) ?? storyName,
        },
      ];
    })
  );
}

export function storybookStackBlitz({
  include,
  storyNames,
  generateProjects,
  package: pkg,
}) {
  // virtual module ids are a hash of the stories file path; an id containing
  // `.stories.ts` would be picked up by Storybook's own CSF plugin
  const files = new Map();
  const virtualIdFor = (file) => {
    const key = createHash('sha1').update(file).digest('hex').slice(0, 16);
    files.set(key, file);
    return `${VIRTUAL_PREFIX}${key}`;
  };

  let isBuild = false;
  // stories file -> its generated projects, kept for `generateBundle`
  const built = new Map();

  return {
    name: 'carbon:storybook-stackblitz',
    enforce: 'post',

    configResolved(config) {
      isBuild = config.command === 'build';
    },

    resolveId(id) {
      return id.startsWith(VIRTUAL_PREFIX) ? `\0${id}` : null;
    },

    async load(id) {
      if (!id.startsWith(RESOLVED_PREFIX)) return null;
      const file = files.get(id.slice(RESOLVED_PREFIX.length));
      if (!file) return null;
      this.addWatchFile(file);
      const projects = await generateProjects(file);
      if (isBuild) built.set(file, projects);
      return `export default ${JSON.stringify(projects)};`;
    },

    transform(code, id) {
      const file = id.split('?')[0];
      if (!include(file)) return null;
      const names = storyNames(file);
      if (!names.length) return null;
      const virtualId = JSON.stringify(virtualIdFor(file));
      const lines = [
        `import { addStackBlitzAction as __addStackBlitzAction } from ${JSON.stringify(RUNTIME)};`,
        `const __loadStackBlitz = (name) => () => import(${virtualId}).then((m) => m.default[name]);`,
        ...names.map(
          (name) =>
            `__addStackBlitzAction(${name}, __loadStackBlitz(${JSON.stringify(name)}));`
        ),
      ];
      return { code: `${code}\n${lines.join('\n')}\n`, map: null };
    },

    generateBundle() {
      if (!built.size) return;
      const stories = [];
      for (const [file, projects] of built) {
        const entries = storyEntries(file);
        for (const [name, project] of Object.entries(projects)) {
          const entry = entries.get(name);
          if (!entry) continue;
          stories.push(entry);
          this.emitFile({
            type: 'asset',
            fileName: `${OUTPUT_DIR}/${entry.id}.json`,
            source: JSON.stringify(project),
          });
        }
      }
      stories.sort((a, b) => a.id.localeCompare(b.id));
      this.emitFile({
        type: 'asset',
        fileName: `${OUTPUT_DIR}/index.json`,
        source: `${JSON.stringify({ package: pkg, stories }, null, 2)}\n`,
      });
    },
  };
}
