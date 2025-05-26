/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import path from 'path';
import { createRequire } from 'node:module';
import { createFilter } from '@rollup/pluginutils';
import { fileURLToPath } from 'url';
import icon from './svg-result-carbon-icon.js';

/**
 * @param {object} [options] The options.
 * @param {RegExp} [options.include=/\.scss/] The files to include.
 * @param {RegExp} [options.exclude] The files to exclude.
 * @returns {object} The rollup plugin to transform an `.svg` file to a `lit-html` template.
 */
export default function rollupPluginDistIcons({
  include = /packages[\\/]icons[\\/]lib[\\/]/i,
  exclude,
} = {}) {
  const filter = createFilter(include, exclude);
  return {
    name: 'carbon-dist-icons',

    /**
     * Enqueues the module contents for loading.
     *
     * @param {string} id The module ID.
     */
    load(id) {
      if (filter(id)) {
        this.addWatchFile(path.resolve(id));
      }
      return null;
    },

    /**
     * Transforms the module contents.
     *
     * @param {string} contents The module contents.
     * @param {string} id The module ID.
     * @returns {object} The transformed module contents.
     */
    async transform(contents, id) {
      if (!filter(id)) {
        return null;
      }

      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const require = createRequire(import.meta.url);

      // TODO: `global-require` was deprecated. Should the alternative in
      // https://eslint.org/docs/latest/rules/global-require be used?
      // https://github.com/carbon-design-system/carbon/issues/18991
      const svg = require(id); /* // eslint-disable-line global-require */

      const code = [
        `import { svg } from 'lit'`,
        `import spread from '${path.resolve(
          __dirname,
          '../src/globals/directives/spread'
        )}';`,
        `const svgResultCarbonIcon = ${icon(svg)};`,
        `export default svgResultCarbonIcon;`,
      ].join(';');

      return {
        code,
        map: {
          mappings: '',
        },
      };
    },
  };
}
