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
 */

import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const RUNTIME = fileURLToPath(
  new URL('./open-in-stackblitz.js', import.meta.url)
);
const VIRTUAL_PREFIX = 'virtual:storybook-stackblitz:';
const RESOLVED_PREFIX = `\0${VIRTUAL_PREFIX}`;

export function storybookStackBlitz({ include, storyNames, generateProjects }) {
  // virtual module ids are a hash of the stories file path; an id containing
  // `.stories.ts` would be picked up by Storybook's own CSF plugin
  const files = new Map();
  const virtualIdFor = (file) => {
    const key = createHash('sha1').update(file).digest('hex').slice(0, 16);
    files.set(key, file);
    return `${VIRTUAL_PREFIX}${key}`;
  };

  return {
    name: 'carbon:storybook-stackblitz',
    enforce: 'post',

    resolveId(id) {
      return id.startsWith(VIRTUAL_PREFIX) ? `\0${id}` : null;
    },

    async load(id) {
      if (!id.startsWith(RESOLVED_PREFIX)) return null;
      const file = files.get(id.slice(RESOLVED_PREFIX.length));
      if (!file) return null;
      this.addWatchFile(file);
      return `export default ${JSON.stringify(await generateProjects(file))};`;
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
  };
}
